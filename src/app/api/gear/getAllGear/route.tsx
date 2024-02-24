import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const gear= await prisma.products.findMany({
            where: {
              type: {
                name: "gear",
              }
            }
          })
          return Response.json(gear)
    }catch(error){
        return new Response ("error")
    } 
}