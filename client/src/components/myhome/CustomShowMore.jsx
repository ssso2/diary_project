import { useNavigate } from "react-router-dom";
export default function CustomShowMore({ events }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/home/diary");
    };

    return (
        <button onClick={handleClick} className="event-more" title="더보기">
            +{events.length - 2} more
        </button>
    );
}
