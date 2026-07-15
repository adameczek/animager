"use server";

import { unstable_rethrow } from "next/navigation";
import { AuthError } from "next-auth";
import * as z from "zod";
import { signIn } from "@/auth";

const schema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type LoginState = { error?: string };

export async function login(
  credentials: z.infer<typeof schema>,
): Promise<LoginState> {
  const parsed = schema.safeParse(credentials);
  if (!parsed.success) {
    return { error: "Your email or password is incorrect." };
  }

  try {
    await signIn("credentials", {
      ...parsed.data,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return { error: "Your email or password is incorrect." };
    }
    throw error;
  }

  return {};
}
