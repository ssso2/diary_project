import { LinkBtn } from "../../components/common/Button";
import DetailHeader from "../../components/diary/DetailHeader";
import DetailEmotion from "../../components/diary/DetailEmotion";
import DetailNav from "../../components/diary/DetailNav";
import styles from "../../scss/components/Detail.module.scss";
import { useParams } from "react-router-dom";
import useDiaryStore from "../../store/useDiaryStore";
import { useEffect } from "react";
import { useAuth } from "../../components/login/AuthContext";
import NotDiary from "../../components/NotDiary";

export default function Detail() {
    const { id } = useParams();
    console.log(id, "파람오나");
    const { diaryData, fetchDiaryData } = useDiaryStore();
    const { user } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!diaryData || diaryData.length === 0) {
            //undefined일때 데이터없을때
            console.log("데이터초기호출");
            fetchDiaryData(user.id);
        }
    }, [id, diaryData, fetchDiaryData]);
    const diary = diaryData.find(item => item.id === Number(id)); // param문자열을 숫자타입으로

    if (!diary) {
        return <NotDiary />;
    }

    return (
        <article className="deatailContainer">
            <DetailHeader diary={diary} />
            <section className={styles.detailContent}>
                <div dangerouslySetInnerHTML={{ __html: diary.content }} />
            </section>
            <DetailEmotion diary={diary} />
            <DetailNav diaryData={diaryData} diary={diary} />
            <footer className="detailFooter">
                <LinkBtn to="/home/diary" className="btnWhite" title="목록" />
            </footer>
        </article>
    );
}
