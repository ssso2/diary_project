import "../../scss/components/Modal.scss";
import { genreName } from "../../utils/Validation";

export default function ModalMain() {
    return (
        <div
            className="searchContainer"
            style={{
                backgroundImage: "url('/sub/modalbg.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <section className="infoTxt">
                <p>Tip</p>
                <h1>
                    영화제목을 검색하실 때 띄어쓰기를 하시면 더욱 정확한
                    검색결과가 검색됩니다.2글자
                </h1>
            </section>
            <section className="infoSearch">
                <div className="searchBox">
                    <img src="/icon/searchGray.svg" alt="검색 아이콘" />
                    <input type="text" placeholder="영화제목을 입력해주세요." />
                </div>
                <p>{`ex) 검은 수녀들, 검은사제`}</p>
            </section>
        </div>
    );
}
