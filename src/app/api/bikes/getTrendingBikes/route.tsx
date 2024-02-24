import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const bikes= await prisma.products.findMany({
            where: {
                trending: true,
              type: {
                name: "bikes",
              }
            }
          })
          return Response.json(bikes)
    }catch(error){
        return new Response ("error")
    }

  
}