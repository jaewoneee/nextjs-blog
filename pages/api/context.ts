import { DB, db } from "./db";

export interface Context {
  db: DB;
}

export const context = { db };
