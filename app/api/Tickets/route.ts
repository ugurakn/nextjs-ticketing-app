import Ticket from "@/app/models/Ticket";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const ticketData: Ticket = body.formData;
        await Ticket.create(ticketData);
        return NextResponse.json({"message": "Ticket created."}, {status: 201});
    } catch (error: any) {
        return NextResponse.json({"message": "Error" + error}, {status: 500});
    }
}

export async function GET() {
    try {
        const tickets: Ticket[] = await Ticket.find();
        return NextResponse.json({tickets}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({"message": "Error" + error}, {status: 500});
    }
}