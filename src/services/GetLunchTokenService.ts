import { v4 as uuid } from "uuid";
import { supabase } from "../supabase";
import { Service } from ".";

interface GetLunchTokenCredentials {
  user_id: string;
}

export class GetLunchTokenService implements Service {
  public async execute({ user_id }: GetLunchTokenCredentials) {
    const token = await supabase.from("lunch_tokens")
      .select("user_id")
      .eq("user_id", uuid())
      .maybeSingle();

    if (token.error) throw { error: token.error.message, status: token.status };

    return await supabase.from("lunch_tokens")
      .insert({ user_id })
      .single()
      .then(({ error, data, status }) => {
        if (error) {
          if (status == 409) throw { error: "Lunch Token Already Exists", status };

          throw { error: "Error", status };
        }

        return {
          message: "Lunch Token Created",
          data, status
        };
      });
  }
}
