import DiaryListForm from "../diary/DiaryListForm";
import "../../scss/DiaryListForm.scss";
import { Link } from "react-router-dom";
export default function Recent() {
    return (
        <div className="recentWrapper">
            <div className="headerWrap">
                <h1>최근 기록한 다이어리</h1>
                <Link to="diary">MORE</Link>
            </div>

            <DiaryListForm limit={3} />
        </div>
    );
}
