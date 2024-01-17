"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type Props = {
    ticket?: Partial<Ticket>;
}

export default function TicketForm({ticket}: Props) {
    const EDIT_MODE = ticket ? true : false;

    const defaultTicketData: Partial<Ticket> = {
        title: ticket ? ticket.title : "",
        description: ticket ? ticket.description : "",
        priority: ticket ? ticket.priority : 1,
        progress: ticket ? ticket.progress : 0,
        status: ticket ? ticket.status : "not started",
        category: ticket ? ticket.category : "Hardware Problem"
    }

    console.log(defaultTicketData);

    const [formData, setFormData] = useState(defaultTicketData);
    const router = useRouter();

    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (EDIT_MODE) {
            // update ticket
            const res = await fetch(`/api/Tickets/${ticket!._id}`, {
                method: "PUT",
                body: JSON.stringify({formData}),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) throw new Error("Failed to update Ticket.");
        } else {
            // create ticket
            const res = await fetch("/api/Tickets", {
                method: "POST",
                body: JSON.stringify({formData}),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) throw new Error("Failed to create Ticket.");
        }

        router.refresh();
        router.push("/");
    }

    return (
        <div className="flex justify-center">
            <form className="flex flex-col gap-3 w-1/2" method="post" onSubmit={handleSubmit}>
                <h3>{EDIT_MODE ? "Update Your Ticket" : "Create Your Ticket"}</h3>
                <label>Title</label>
                <input id="title" name="title" type="text" required value={formData.title} onChange={handleChange} />
                <label>Description</label>
                <textarea id="description" name="description" required value={formData.description} onChange={handleChange} rows={5}/>
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="Hardware Problem">Hardware Problem</option>
                    <option value="Software Problem">Software Problem</option>
                    <option value="Project">Project</option>
                </select>
                <label>Priority</label>
                <div>
                    <input type="radio" id="priority-1" name="priority" value={1} checked={formData.priority == 1} onChange={handleChange} />
                    <label>1</label>
                    <input type="radio" id="priority-2" name="priority" value={2} checked={formData.priority == 2} onChange={handleChange} />
                    <label>2</label>
                    <input type="radio" id="priority-3" name="priority" value={3} checked={formData.priority == 3} onChange={handleChange} />
                    <label>3</label>
                    <input type="radio" id="priority-4" name="priority" value={4} checked={formData.priority == 4} onChange={handleChange} />
                    <label>4</label>
                    <input type="radio" id="priority-5" name="priority" value={5} checked={formData.priority == 5} onChange={handleChange} />
                    <label>5</label>
                </div>
                <label>Progress</label>
                <input type="range" name="progress" id="progress" value={formData.progress} min={0} max={100} onChange={handleChange} />
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="not started">Not Started</option>
                    <option value="started">Started</option>
                    <option value="done">done</option>
                </select>
                <input type="submit" className="btn text-default-text" value={EDIT_MODE ? "Update Ticket" : "Create Ticket"} />
            </form>
        </div>
    )
}
