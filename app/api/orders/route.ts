import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Items are required" },
        { status: 400 }
      );
    }

    // Calculate total
    const totalCents = items.reduce(
      (sum: number, item: { quantity: number; unitPriceCents: number }) =>
        sum + item.quantity * item.unitPriceCents,
      0
    );

    // Create order with items
    const order = await prisma.order.create({
      data: {
        status: "PENDING",
        totalCents,
        items: {
          create: items.map((item: any) => ({
            quantity: item.quantity,
            unitPriceCents: item.unitPriceCents,
            nameSnapshot: item.nameSnapshot,
            menuItemId: item.menuItemId
          }))
        }
      },
      include: {
        items: true
      }
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");

    const orders = await prisma.order.findMany({
      where: customerId ? { customerId: parseInt(customerId) } : undefined,
      include: {
        items: true,
        customer: true,
        reservation: true
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 50
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
