import { Request, Response } from "express";
import { SignUpService } from "../services";
import { Controller } from ".";

export class SignUpController implements Controller {
  public async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    return await new SignUpService().execute({ email, password })
      .then((json) => response.status(201).json(json))
      .catch(({ error, status }) => response.status(status).json({ error }));
  }
}
