import axios from "axios";
import "../../scss/components/Modal.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import useDiaryStore from "../../store/useDiaryStore";
import { useAuth } from "../login/AuthContext";

export default function DetailModal({ modal, setModal, targetref }) {
    const URL = process.env.REACT_APP_BACK_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchDiaryData } = useDiaryStore();
    const { user } = useAuth();
    const deleteGo = async () => {
        setModal(false);
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
            console.log("삭제 취소");
        }
    };

    return (
        <div
            className="modalOverlay"
            ref={targetref}
            onClick={() => setModal(false)}
        >
            <div className="moreContainer" onClick={e => e.stopPropagation()}>
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
                        >
                            삭제
                        </button>
                    </li>
                </ul>

                {/* <ul className="modalWrap">
                    <li className="list">
                        수정
                        <Link to={`/home/detail/${id}/edit`} className="edit">
                            <img src="/icon/edit.svg" alt="수정" />
                        </Link>
                    </li>
                    <li className="list">
                        삭제
                        <button
                            type="btton"
                            onClick={deleteGo}
                            className="delete"
                        >
                            <img src="/icon/delete.svg" alt="삭제" />
                        </button>
                    </li>
                </ul> */}
            </div>
        </div>
    );
}
