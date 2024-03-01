import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  let totalAmountBike = 0;
  let totalQtyBike = 0;

  let totalAmountGear = 0;
  let totalQtyGear = 0;

  let totalAmountPiece = 0;
  let totalQtyPiece = 0;
  //stats bike
  try {
    const bikes = await prisma.products.findMany({
      where: {
        type: {
          name: 'bikes',
        },
      },
    });

    for (const element of bikes) {
      const linesorder = await prisma.orderLine.findMany({
        where: {
          stripe_id: element.price_id,
        },
      });
      for (const element of linesorder) {
        totalAmountBike += element.lineTotal;
        totalQtyBike += element.quantity;
      }
    }
  } catch (error) {
    return new Response('error');
  }
  //stats gear
  try {
    const gear = await prisma.products.findMany({
      where: {
        type: {
          name: 'gear',
        },
      },
    });
    for (const element of gear) {
      const linesorder = await prisma.orderLine.findMany({
        where: {
          stripe_id: element.price_id,
        },
      });
      for (const element of linesorder) {
        totalAmountGear += element.lineTotal;
        totalQtyGear += element.quantity;
      }
    }
  } catch (error) {
    return new Response('error');
  }
  //stats piece
  try {
    const pieces = await prisma.products.findMany({
      where: {
        type: {
          name: 'pieces',
        },
      },
    });
    for (const element of pieces) {
      const linesorder = await prisma.orderLine.findMany({
        where: {
          stripe_id: element.price_id,
        },
      });
      for (const element of linesorder) {
        totalAmountPiece += element.lineTotal;
        totalQtyPiece += element.quantity;
      }
    }
  } catch (error) {
    return new Response('error');
  }
  const Stats = [
    {
      type: 'bike',
      totalAmount: totalAmountBike,
      totalQty: totalQtyBike,
    },
    {
      type: 'gear',
      totalAmount: totalAmountGear,
      totalQty: totalQtyGear,
    },
    {
      type: 'pieces',
      totalAmount: totalAmountPiece,
      totalQty: totalQtyPiece,
    },
  ];
  return Response.json(Stats);
}
