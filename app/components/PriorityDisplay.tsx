import { FaFire } from "react-icons/fa6";

type Props = {
    priority: number;
}

export default function PriorityDisplay({priority}: Props) {
    let priorityIcons: JSX.Element[] = [];
    for (let i = 0; i < priority; i++) {
        const icon = <FaFire key={i} className="text-red-400" />;
        priorityIcons.push(icon);
    }

    return (
        <div className="flex justify-start align-baseline">
            {priorityIcons}
        </div>
    )
}
