import { db } from "@/drizzle/db"
import { UserTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { revalidateUserCache } from "./dbCache"

export async function upsertUser(user: typeof UserTable.$inferInsert) {
  console.info("[DB] upsertUser:start", { id: user.id, email: user.email })
  try {
    await db
      .insert(UserTable)
      .values(user)
      .onConflictDoUpdate({
        target: [UserTable.id],
        set: user,
      })

    console.info("[DB] upsertUser:success", { id: user.id })
  } catch (err) {
    console.error("[DB] upsertUser:error", { id: user.id, error: (err as Error)?.message || err })
    throw err
  } finally {
    // Revalidate cache regardless so UI reflects most recent state
    revalidateUserCache(user.id)
  }
}

export async function deleteUser(id: string) {
  await db.delete(UserTable).where(eq(UserTable.id, id))

  revalidateUserCache(id)
}
