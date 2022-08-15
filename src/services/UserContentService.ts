import type { Service } from "services";

export class UserContentService implements Service {
  public async execute() {
    return { message: "Viewing User Content" };
  }
}
