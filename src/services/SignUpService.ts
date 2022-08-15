import { supabase } from "../supabase";
import { Service } from "services";

interface SignUpCredentials {
  email: string;
  password: string;
}

export class SignUpService implements Service {
  public async execute({ email, password }: SignUpCredentials) {
    const { user, session, error } = await supabase.auth.signUp({ email, password });

    if (!error) return {
      message: "Successfully Signed Up",
      user, session,
    };

    return {
      error: error.message,
      status: error.status,
    };
  }
}
