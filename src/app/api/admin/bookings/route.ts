import { NextResponse } from "next/server";
import { listBookings, updateBookingStatus } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { BOOKING_STATUSES, type BookingStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

/** GET /api/admin/bookings – alle Buchungen (nur mit Admin-Session). */
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }
  return NextResponse.json({ bookings: await listBookings() });
}

/** PATCH /api/admin/bookings – Status einer Buchung ändern. */
export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  let payload: { id?: string; status?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { id, status } = payload;
  if (!id || !status || !BOOKING_STATUSES.includes(status as BookingStatus)) {
    return NextResponse.json({ error: "Ungültige Angaben." }, { status: 400 });
  }

  const booking = await updateBookingStatus(id, status as BookingStatus);
  if (!booking) {
    return NextResponse.json({ error: "Buchung nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, booking });
}
