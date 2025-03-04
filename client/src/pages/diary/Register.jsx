import Tab from "../../components/common/Tab";
import DiaryRegister from "../../components/diary/DiaryRegister";
import styles from "../../scss/components/DiaryDetail.module.scss";
export default function Register() {
    return (
        <>
            <div className="titlewrap">
                <p className="title">다이어리 등록</p>
            </div>
            <main className="diaryContainer">
                <DiaryRegister />
            </main>
            <footer>페이지네이션</footer>
        </>
    );
}
