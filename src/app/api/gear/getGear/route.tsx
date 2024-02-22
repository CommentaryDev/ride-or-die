import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
        const body = await req.json();
        try{
            const gear= await prisma.products.findMany({
                where: {
                    id_product: body,
                  type: {
                    name: "gear",
                  }
                }
              })
              
        return NextResponse.json(gear);
    } catch (err) {
        console.error(err);
        return NextResponse.error();
      }
  
}