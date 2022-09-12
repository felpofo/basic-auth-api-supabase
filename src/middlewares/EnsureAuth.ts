import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import type { Middleware } from ".";

export class EnsureAuth implements Middleware {
  public intercept(request: Request, response: Response, next: NextFunction) {

    const { authorization } = request.headers;
    if (!authorization) return response.status(401).json({ error: "Missing Authorization Token" });

    const [, token] = authorization.split(" ");

    try {
      const { sub } = verify(token, process.env.SUPABASE_JWT_SECRET as string) as { sub: string };

      request.user_id = sub;

      return next();
    } catch {
      return response.status(401).json({ error: "Invalid Token" });
    }
  }
}
