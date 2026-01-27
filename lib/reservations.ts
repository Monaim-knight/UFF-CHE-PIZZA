import { prisma } from "@/lib/prisma";

export async function createReservation(data: {
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  startTime: Date;
  partySize: number;
  specialNotes?: string;
}) {
  // Find or create customer
  let customer = await prisma.customer.findUnique({
    where: { email: data.email }
  });

  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        email: data.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName
      }
    });
  } else {
    // Update customer info if provided
    customer = await prisma.customer.update({
      where: { id: customer.id },
      data: {
        phone: data.phone || customer.phone,
        firstName: data.firstName,
        lastName: data.lastName
      }
    });
  }

  // Create reservation
  const reservation = await prisma.reservation.create({
    data: {
      customerId: customer.id,
      startTime: data.startTime,
      partySize: data.partySize,
      specialNotes: data.specialNotes,
      status: "PENDING"
    },
    include: {
      customer: true
    }
  });

  return reservation;
}

export async function getReservations(filters?: {
  customerId?: number;
  startDate?: Date;
  endDate?: Date;
  status?: string;
}) {
  return prisma.reservation.findMany({
    where: {
      customerId: filters?.customerId,
      startTime: {
        gte: filters?.startDate,
        lte: filters?.endDate
      },
      status: filters?.status as any
    },
    include: {
      customer: true
    },
    orderBy: {
      startTime: "asc"
    }
  });
}

export async function getReservationById(id: number) {
  return prisma.reservation.findUnique({
    where: { id },
    include: {
      customer: true
    }
  });
}
