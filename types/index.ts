import type { User as AltogicUser } from "altogic";

export interface User extends AltogicUser {
  credits: number;
}
