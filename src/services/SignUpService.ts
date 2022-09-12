import { Service } from ".";
import type { LoginResponse } from "../types";
import { supabase } from "../supabase";

interface SignUpCredentials {
  email: string;
  password: string;
}

export class SignUpService implements Service {
  public async execute({ email, password }: SignUpCredentials): Promise<LoginResponse> {
    const { user, session, error } = await supabase.auth.signUp({ email, password });

    if (error) return Promise.reject({
      error: error.message,
      status: error.status
    });

    // @ts-expect-error supabase wtf
    return { message: "Successfully Signed Up", user, session };
  }
}
