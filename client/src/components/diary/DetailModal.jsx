import "../../scss/components/Modal.scss";
import { Link, useParams } from "react-router-dom";

export default function DetailModal({ modal, setModal, targetref }) {
    const { id } = useParams();
    const deleteGo = () => {
        setModal(false);
        const Confirmed = window.confirm("정말 삭제하시겠습니까?");
        if (Confirmed) {
            console.log("삭제 실행"); //삭제 API 호출
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
                </ul>
            </div>
        </div>
    );
}
