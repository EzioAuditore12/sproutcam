import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { user, type User } from '@/db/schemas/auth.schema';

export class UserService {
  private readonly database = db;
  private readonly table = user;

  public async get(id: string): Promise<User | null> {
    return await this.database
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .then((res) => res[0] ?? null);
  }
}

export const userService = new UserService();
