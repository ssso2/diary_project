import { LinkBtn } from "../../components/common/Button";
import DetailHeader from "../../components/diary/DetailHeader";
import DetailEmotion from "../../components/diary/DetailEmotion";
import DetailNav from "../../components/diary/DetailNav";
import styles from "../../scss/components/Detail.module.scss";
import { useParams } from "react-router-dom";
import useDiaryStore from "../../store/useDiaryStore";
import { useEffect } from "react";

export default function Detail() {
    const { id } = useParams();
    console.log(id, "파람오나");
    const { diaryData, fetchDiaryData } = useDiaryStore();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!diaryData || diaryData.length === 0) {
            //undefined일때 데이터없을때
            console.log("데이터초기호출");
            fetchDiaryData(9);
        }
    }, [id, diaryData, fetchDiaryData]);
    const diary = diaryData.find(item => item.id === Number(id)); // param문자열을 숫자타입으로

    if (!diary) {
        return;
    }

    return (
        <article className="deatailContainer">
            <DetailHeader diary={diary} />
            <section>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veniam dolor ratione deleniti nobis numquam dolorem iste
                    optio illo sapiente! Alias facilis nemo officia tempore
                    exercitationem sit eos tempora, enim labore.
                </p>
                <figure>
                    <img src="/sub/poster.png" alt="관련 이미지" />
                </figure>
            </section>
            <DetailEmotion diary={diary} />
            <DetailNav diaryData={diaryData} diary={diary} />
            <footer className="detailFooter">
                <LinkBtn to="/home/diary" className="btnWhite" title="목록" />
            </footer>
        </article>
    );
}
