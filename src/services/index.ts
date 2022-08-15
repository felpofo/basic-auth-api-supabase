export type JsonResponse = {
  message?: string;
  error?: unknown;
} & Record<string, unknown>;

export interface Service {
  execute(...args: any): Promise<JsonResponse>;
}

export * from "./LoginService";
export * from "./UserContentService";
export * from "./AdminContentService";
export * from "./SignUpService";
