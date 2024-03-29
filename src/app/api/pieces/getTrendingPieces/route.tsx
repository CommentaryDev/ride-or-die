import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const pieces= await prisma.products.findMany({
            where: {
                trending: true,
              type: {
                name: "pieces",
              }
            }
          })
          return Response.json(pieces)
    }catch(error){
        return new Response ("error")
    }

  
}