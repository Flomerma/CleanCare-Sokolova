import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";
import { sendContactMessage } from "@/lib/mailer";

export const dynamic = "force-dynamic";

/** POST /api/contact – Nachricht aus dem Kontaktformular. */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const result = validateContact(payload);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Bitte prüfen Sie Ihre Angaben.", errors: result.errors },
      { status: 400 },
    );
  }

  // TODO: Ohne konfiguriertes SMTP wird die Nachricht nur in die Server-Logs geschrieben.
  await sendContactMessage(result.data);

  return NextResponse.json({ ok: true });
}
