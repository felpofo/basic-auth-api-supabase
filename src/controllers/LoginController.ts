import { Request, Response } from "express";
import { LoginService } from "../services";
import type { Controller } from ".";

export class LoginController implements Controller {
  public async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    // @ts-expect-error i will fix it later
    const { message, error, status, user, session } = await new LoginService().execute({ email, password });

    if (error) return response.status(status).json({ error });
    return response.status(200).json({ message, user, session });
  }
}
