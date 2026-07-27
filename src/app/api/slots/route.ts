import { NextResponse } from "next/server";
import { getBookedSlots } from "@/lib/db";
import { allSlots, isBookableDate } from "@/lib/slots";
import { booking as bookingConfig } from "@/config/site";

export const dynamic = "force-dynamic";

/**
 * GET /api/slots?datum=YYYY-MM-DD
 * Liefert alle Zeitfenster eines Tages inklusive Verfügbarkeit.
 */
export async function GET(request: Request) {
  const datum = new URL(request.url).searchParams.get("datum") ?? "";

  if (!isBookableDate(datum)) {
    return NextResponse.json(
      { error: "Für dieses Datum sind keine Termine verfügbar (Mo–Sa).", slots: [] },
      { status: 400 },
    );
  }

  const booked = await getBookedSlots(datum);
  const slots = allSlots().map((time) => ({
    time,
    available: booked.filter((slot) => slot === time).length < bookingConfig.capacityPerSlot,
  }));

  return NextResponse.json({ datum, slots });
}
