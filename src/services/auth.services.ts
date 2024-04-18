import { hash, compare } from 'bcrypt';

/* eslint-disable @typescript-eslint/no-extraneous-class */
export class Auth {
  static async hash(value: string) {
    return hash(value, 10);
  }

  static async compare(value: string, hash: string) {
    return compare(value, hash);
  }
}
