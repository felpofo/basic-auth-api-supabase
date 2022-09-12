import type { Service } from ".";
import type { LoginResponse } from "../types";
import { supabase } from "../supabase";

interface LoginCredentials {
  email: string;
  password: string;
}

export class LoginService implements Service {
  public async execute({ email, password }: LoginCredentials): Promise<LoginResponse> {
    const { user, session, error } = await supabase.auth.signIn({ email, password });

    if (error) return Promise.reject({
      error: error.message,
      status: error.status
    });

    // @ts-expect-error supabase wtf
    return { message: "Successfully Logged In", user, session };
  }
}
