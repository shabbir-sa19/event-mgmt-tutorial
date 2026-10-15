import { auth, authDatabase, isAdminEmail } from "@/lib/auth";
import { loginSchema } from "@/lib/zod";
import { randomUUID } from "node:crypto";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ message: "Enter a valid user ID, email, or mobile number and password." }, { status: 400 });
  }

  const identifier = parsed.data.identifier.trim();
  const user = await authDatabase.collection("user").findOne<{
    email: string;
    userID?: string;
    role?: string;
  }>(
    {
      $or: [
        { email: identifier.toLowerCase() },
        { userID: identifier.toLowerCase() },
        { phone: identifier },
      ],
    },
    { projection: { email: 1 } },
  );

  const authHeaders = new Headers(request.headers);
  authHeaders.set("content-type", "application/json");
  authHeaders.delete("content-length");

  const authResponse = await auth.handler(
    new Request(new URL("/api/auth/sign-in/email", request.url), {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        email: user?.email ?? `unknown-${randomUUID()}@invalid.local`,
        password: parsed.data.password,
        rememberMe: parsed.data.rememberMe,
      }),
    }),
  );

  if (user && authResponse.ok && (!user.userID || !user.role)) {
    await authDatabase.collection("user").updateOne(
      { email: user.email },
      {
        $set: {
          userID: user.userID || `usr_${randomUUID()}`,
          role: user.role || (isAdminEmail(user.email) ? "admin" : "employee"),
        },
      },
    );
  }

  return authResponse;
}
