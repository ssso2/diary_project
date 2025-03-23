import "../../scss/components/Modal.scss";
import styles from "../../scss/components/ListForm.module.scss";
import { genreName } from "../../utils/Validation";
import ModalMain from "./ModalMain";
import ModalSearch from "./ModalSearch";
import { useEffect } from "react";

export default function Modal({ setModal, selectMovie }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);
    return (
        <div className="modalOverlay">
            <dialog
                className="modalContainer"
                open
                onClick={e => e.stopPropagation()}
            >
                <header className="modalHeader">
                    <h2>영화 불러오기</h2>
                    <button
                        type="button"
                        onClick={() => setModal(false)}
                        className="closeBtn"
                    >
                        <img
                            src="/icon/close.svg"
                            alt="닫기 아이콘"
                            title="닫기"
                        />
                    </button>
                </header>
                <ModalMain selectMovie={selectMovie} />
                {/* <ModalSearch /> */}
            </dialog>
        </div>
    );
}
