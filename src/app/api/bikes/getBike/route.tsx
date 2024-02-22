import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
        const body = await req.json();
        console.log(body);  
        try{
            const bikes= await prisma.products.findMany({
                where: {
                    id_product: body,
                  type: {
                    name: "bikes",
                  }
                }
              })
              
        return NextResponse.json(bikes);
    } catch (err) {
        console.error(err);
        return NextResponse.error();
      }
  
}