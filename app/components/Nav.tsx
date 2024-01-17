// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FaHome } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import Link from "next/link";

export default function Nav() {
    return (
        <nav className="flex justify-between bg-nav p-4">
            <section className="flex items-center space-x-4">
                <Link href="/">
                    <FaHome color="white" fontSize="1.5rem" />
                    {/* <FontAwesomeIcon icon={faHome} className="icon" height="20" /> */}
                </Link>
                <Link href="/ticket/new">
                    <FaTicket color="white" fontSize="1.5rem" />
                    {/* <FontAwesomeIcon icon={faTicket} className="icon" height="20" /> */}
                </Link>
            </section>
            <section>
                <p>YourMail@mail.com</p>
            </section>
        </nav>
    )
}
