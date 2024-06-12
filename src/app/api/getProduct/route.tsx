import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
        const body = await req.json();
        console.log(body);  
        try{
            const product= await prisma.products.findMany({
                where: {
                    id_product: body,
                }
              })
              
        return NextResponse.json(product);
    } catch (err) {
        console.error(err);
        return NextResponse.error();
      }
  
}