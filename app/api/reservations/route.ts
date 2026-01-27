import { NextRequest, NextResponse } from "next/server";
import { createReservation, getReservations } from "@/lib/reservations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      phone,
      firstName,
      lastName,
      startTime,
      partySize,
      specialNotes
    } = body;

    // Validation
    if (!email || !firstName || !lastName || !startTime || !partySize) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (partySize < 1 || partySize > 20) {
      return NextResponse.json(
        { error: "Party size must be between 1 and 20" },
        { status: 400 }
      );
    }

    const reservationDate = new Date(startTime);
    if (isNaN(reservationDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    // Check if reservation is in the past
    if (reservationDate < new Date()) {
      return NextResponse.json(
        { error: "Reservation cannot be in the past" },
        { status: 400 }
      );
    }

    const reservation = await createReservation({
      email,
      phone,
      firstName,
      lastName,
      startTime: reservationDate,
      partySize: parseInt(partySize),
      specialNotes
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const status = searchParams.get("status");

    const reservations = await getReservations({
      customerId: customerId ? parseInt(customerId) : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      status: status || undefined
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}
