import type { Service } from "services";
import type { ApiError } from "@supabase/supabase-js";
import { supabase } from "../supabase";

export interface User {
  id: string;
  email: string;
  phone: string;
}

export interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: User;
  created_at: string;
  updated_at: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export type LoginResponse = { message: string; user: User; session: Session }
export type LoginErrorResponse = { error: string; status: number }

export class LoginService implements Service {
  public async execute({ email, password }: LoginCredentials): Promise<LoginResponse | LoginErrorResponse> {
    const { user, session, error } = await supabase.auth.signIn({ email, password });

    if (error) return {
      error: error.message,
      status: error.status
    };

    return {
      message: "Successfully Logged In",
      // @ts-expect-error ts annoying
      user, session
    };
    
  }
}
