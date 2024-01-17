import TicketCard from "./components/TicketCard";

async function getTickets() {
    try {
        const res = await fetch(`${process.env.HOST}/api/Tickets`, {
            cache: "no-store"
        });
        return res.json();
    } catch (error) {
        console.error("Failed to get tickets", error);
    }
}

export default async function Home() {
    const {tickets} = await getTickets();

    const uniqueCategories = [
        ...new Set(tickets?.map(({category}: Ticket) => category))
    ]

    return (
        <main className="p-5">
            <div>
                {tickets &&
                    uniqueCategories.map((uniqueCategory, categoryIndex) => (
                        <div key={categoryIndex} className="mb-4">
                            <h2>{uniqueCategory as string}</h2>
                            <section className="lg:grid grid-cols-2 xl:grid-cols-4">
                                {tickets.filter((ticket: Ticket) => ticket.category === uniqueCategory).map((filteredTicket: Ticket, _index: number) =>(
                                    <TicketCard id={_index} key={_index} ticket={filteredTicket} />
                                ))}
                            </section>
                        </div>
                    ))
                }
            </div>

        </main>
    )
}
