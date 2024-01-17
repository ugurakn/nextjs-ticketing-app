import TicketForm from "@/app/components/TicketForm";

type Props = {
    params: {
        ticketId: string;
    }
}

async function getTicketById(id: string) {
    const res = await fetch(`${process.env.HOST}/api/Tickets/${id}`, {
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error("Failed to get ticket");
    }

    return res.json();
}

export default async function TicketPage({ params: {ticketId} }: Props) {
    const EDIT_MODE = ticketId === "new" ? false : true; // check whether this instance is edit page or create page
    let updateTicketData: Partial<Ticket> | undefined = undefined;

    if (EDIT_MODE) {
        const resData = await getTicketById(ticketId);
        updateTicketData = resData.foundTicket;
    }

    return <TicketForm ticket={updateTicketData} />;
}
