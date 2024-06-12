import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
        const body = await req.json();
        console.log(body);  
        try{
            const orderLines= await prisma.orderLine.findMany({
                where: {
                    id_order: body as string,
                }
              })
             console.log(orderLines) 
        return NextResponse.json(orderLines);
    } catch (err) {
        console.error(err);
        return NextResponse.error();
      }
  
}