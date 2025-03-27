import axios from "axios";
import "../../scss/components/Modal.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import useDiaryStore from "../../store/useDiaryStore";
import { useAuth } from "../login/AuthContext";

export default function DetailModal({ setOpen }) {
    const URL = process.env.REACT_APP_BACK_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchDiaryData } = useDiaryStore();
    const { user } = useAuth();

    const deleteGo = async () => {
        setOpen(false);
        const Confirmed = window.confirm("정말 삭제하시겠습니까?");
        if (Confirmed) {
            try {
                const res = await axios.delete(`${URL}/diary/delete/${id}`);
                fetchDiaryData(user.id); // 삭제데이터 제외하고 새 배열 호출
                alert(res.data);
                navigate(`/home/diary`);
            } catch (error) {
                console.error(error);
            }
        } else {
            // console.log("삭제 취소");
        }
    };

    return (
        <div className="moreContainer">
            <ul className="modalWrap">
                <li className="list">
                    <Link to={`/home/detail/${id}/edit`} className="edit">
                        수정
                    </Link>
                </li>
                <li className="list">
                    <button
                        type="button"
                        onClick={deleteGo}
                        className="delete"
                        title="삭제"
                    >
                        삭제
                    </button>
                </li>
            </ul>
        </div>
        // </div>
    );
}
