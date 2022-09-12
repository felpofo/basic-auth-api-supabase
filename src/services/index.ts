export interface Service {
  execute(...args: any): Promise<any>;
}

export * from "./LoginService";
export * from "./SignUpService";
export * from "./GetLunchTokenService";
