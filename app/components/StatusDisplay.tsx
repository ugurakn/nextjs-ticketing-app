type Props = {
    status: string;
}

export default function StatusDisplay({status}: Props) {
    function getBgColor(status: string) {
        let color: string = "white";

        switch(status.toLowerCase()) {
            case "done":
                color = "bg-green-200";
                return color;
            case "started":
                color = "bg-yellow-200";
                return color;
            case "not started":
                color = "bg-red-200";
                return color;
            default:
                return color;
        }
    }

    return (
        <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getBgColor(status)}`}>
            {status}
        </span>
    )
}
