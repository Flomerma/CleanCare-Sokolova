import { NextResponse } from "next/server";
import { admin } from "@/config/site";
import { checkPassword, createSessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** POST /api/admin/login – Anmeldung im Admin-Bereich. */
export async function POST(request: Request) {
  let payload: { password?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (!checkPassword(payload.password)) {
    return NextResponse.json({ error: "Falsches Passwort." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: admin.cookieName,
    value: createSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: admin.sessionMaxAge,
  });
  return response;
}

/** DELETE /api/admin/login – Abmeldung. */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({ name: admin.cookieName, value: "", path: "/", maxAge: 0 });
  return response;
}
