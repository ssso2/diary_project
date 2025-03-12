import Calendar from "../../components/myhome/Calendar";
import Recent from "../../components/myhome/Recent";

export default function Myhome() {
    return (
        <main className="homeContainer">
            <Calendar />
            <Recent />
        </main>
    );
}
