import User from "../user";

export interface SocialNetworkInterface {
  signup(username: string, password: string): User;
}