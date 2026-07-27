import { NextResponse } from "next/server";
import { createBooking, isSlotAvailable } from "@/lib/db";
import { validateBooking } from "@/lib/validation";
import { sendCompanyNotification, sendCustomerConfirmation } from "@/lib/mailer";
import { booking as bookingConfig } from "@/config/site";

export const dynamic = "force-dynamic";

/** POST /api/bookings – Neue Buchungsanfrage entgegennehmen. */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const result = validateBooking(payload);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Bitte prüfen Sie Ihre Angaben.", errors: result.errors },
      { status: 400 },
    );
  }

  const data = result.data;

  // Serverseitige Doppelbuchungs-Prüfung (der Slot kann zwischenzeitlich belegt worden sein).
  const available = await isSlotAvailable(data.datum, data.uhrzeit, bookingConfig.capacityPerSlot);
  if (!available) {
    return NextResponse.json(
      {
        error: "Dieses Zeitfenster wurde soeben vergeben. Bitte wählen Sie einen anderen Termin.",
        errors: { uhrzeit: "Zeitfenster bereits belegt." },
      },
      { status: 409 },
    );
  }

  try {
    const booking = await createBooking(data);

    // E-Mail-Versand ist optional und darf die Buchung nicht blockieren.
    // TODO: SMTP-Zugangsdaten in den Umgebungsvariablen hinterlegen (siehe src/lib/mailer.ts).
    await Promise.allSettled([sendCustomerConfirmation(booking), sendCompanyNotification(booking)]);

    return NextResponse.json({ ok: true, booking }, { status: 201 });
  } catch (error) {
    console.error("[api/bookings] Speichern fehlgeschlagen:", error);
    return NextResponse.json(
      { error: "Die Buchung konnte nicht gespeichert werden. Bitte versuchen Sie es erneut." },
      { status: 500 },
    );
  }
}
