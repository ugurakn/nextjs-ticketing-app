import Ticket from "@/app/models/Ticket";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

type Params = {
    params: {
        id: string;
    }
}

export async function GET(req: NextRequest, {params: {id}}: Params) {
    try {
        const foundTicket = await Ticket.findOne({_id: id});

        return NextResponse.json({foundTicket}, {status: 200});
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({"message": "Error", error}, {status: 500});
    }
}

export async function PUT(req: NextRequest, {params: {id}}: Params) {
    try {
        const body = await req.json();
        const ticketData: Ticket = body.formData;
        await Ticket.findByIdAndUpdate(id, ticketData);
        return NextResponse.json({"message": "Ticket updated."}, {status: 200});
    } catch (error) {
        return NextResponse.json({"message": "Error", error}, {status: 500});
    }
}

export async function DELETE(req: NextRequest, {params: {id}}: Params) {
    try {
        await Ticket.findByIdAndDelete(id);
        return NextResponse.json({"message": "Ticket Deleted"}, {status: 200});

    } catch (error: any) {
        return NextResponse.json({"message": "Error", error}, {status: 500});
    }
}