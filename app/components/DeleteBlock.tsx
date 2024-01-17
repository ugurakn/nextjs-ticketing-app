"use client";

import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

type Props = {
    id: string;
}

export default function DeleteBlock({id}: Props) {
    const router = useRouter();

    async function deleteTicket() {
        const res = await fetch(`/api/Tickets/${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            router.refresh();
        }
    }

    return (
        <IoClose
            className="text-red-400 hover:cursor-pointer hover:text-red-200 text-2xl"
            onClick={deleteTicket}
        />
    )
}
