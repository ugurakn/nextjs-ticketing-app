type Ticket = {
    _id: string;
    title: string;
    description: string;
    category: string;
    priority: number;
    progress: number;
    status: string;
    active?: boolean;
    createdAt?: string;
}