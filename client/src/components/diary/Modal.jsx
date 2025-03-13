import "../../scss/components/Modal.scss";
import styles from "../../scss/components/ListForm.module.scss";
import { genreName } from "../../utils/Validation";
import ModalMain from "./ModalMain";
import ModalSearch from "./ModalSearch";

export default function Modal({ setModal, selectMovie }) {
    return (
        <dialog className="modalContainer" open>
            <header className="modalHeader">
                <h2>영화 불러오기</h2>
                <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="closeBtn"
                >
                    <img src="/icon/close.svg" alt="닫기 아이콘" />
                </button>
            </header>
            <ModalMain selectMovie={selectMovie} />
            {/* <ModalSearch /> */}
        </dialog>
    );
}
