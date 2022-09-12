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

export type LoginResponse = {
  message: string;
  user: User;
  session: Session;
}
