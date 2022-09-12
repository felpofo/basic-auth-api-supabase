import { Request, Response } from "express";
import { LoginService } from "../services";
import type { Controller } from ".";

export class LoginController implements Controller {
  public async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    return await new LoginService().execute({ email, password })
      .then((json) => response.status(200).json(json))
      .catch(({ error, status }) => response.status(status).json({ error }));
  }
}
