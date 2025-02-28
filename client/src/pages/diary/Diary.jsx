import Tab from "../../components/common/Tab";

export default function Diary() {
    return (
        <>
            <p className="title">다이어리</p>
            <input type="text" placeholder="제목을 입력해주세요." />
            <Tab />
            <main>
                <DiaryListForm />
            </main>
            <footer>페이지네이션</footer>
        </>
    );
}
