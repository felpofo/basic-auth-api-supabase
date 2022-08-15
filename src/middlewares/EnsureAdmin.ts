import { Request, Response, NextFunction } from "express";
import type { Middleware } from ".";

export class EnsureAdmin implements Middleware {
  public intercept(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.headers as { userId: string };

    //gambiarra pra checkagem de admin porque fodase
    if (userId == "5c0de874-e680-4802-9e41-a9b052ca56d4") return next();

    return response.status(401).json({ error: "Unauthorized" });
  }
}
