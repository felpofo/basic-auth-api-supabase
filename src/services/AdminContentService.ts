import type { Service } from "services";

export class AdminContentService implements Service {
  public async execute() {
    return { message: "Viewing Admin Content" };
  }
}
