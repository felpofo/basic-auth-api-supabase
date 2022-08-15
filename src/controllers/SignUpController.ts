import { Request, Response } from "express";
import { SignUpService } from "../services";
import { Controller } from ".";

export class SignUpController implements Controller {
  public async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const { message, error, status, user, session } = await new SignUpService().execute({ email, password });

    if (error) return response.status(status).json({ error });
    return response.status(201).json({ message, user, session });
  }
}
