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

      /**
       *! ==================== WARNING ====================
       *? this approach causes an security breach modifying
       *? userid on the ensureAdmin is possible with proxy
       *? if this app lists publicaly all users from the db
       *! =================================================
       */

      request.headers.userId = sub;

      return next();
    } catch {
      return response.status(401).json({ error: "Invalid Token" });
    }
  }
}
