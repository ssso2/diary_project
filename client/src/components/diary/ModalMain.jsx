import { useEffect, useState } from "react";
import "../../scss/components/Modal.scss";
import { genreName } from "../../utils/Validation";
import axios from "axios";
import ModalSearch from "./ModalSearch";

export default function ModalMain({ selectMovie }) {
    const URL = process.env.REACT_APP_BACK_URL;
    const [txt, setTxt] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    let message;
    if (loading) {
        message = <p className="loading">검색중..</p>;
    } else if (!loading && txt.length >= 2 && results.length === 0) {
        message = <p className="comment">검색결과가 없습니다.</p>;
    } else if (txt.length < 2) {
        message = <p>{`ex) 검은 수녀들, 검은사제`}</p>;
    }

    useEffect(() => {
        if (txt.length < 2) {
            setResults([]);
            return;
        }
        // console.log(txt);
        setLoading(true);

        const movieList = async () => {
            setTimeout(async () => {
                try {
                    const res = await axios.get(`${URL}/list/Allmovie`, {
                        params: { search: txt },
                    });
                    // console.log("데이터확인", res.data);
                    setResults(res.data);
                } catch (error) {
                    console.error("검색 오류:", error);
                } finally {
                    setLoading(false);
                }
            }, 600);
        };
        movieList();
    }, [txt]);

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
                <h1>제목을 검색할 때 띄어쓰기를 포함하면</h1>
                <h1>
                    더욱 정확한 결과를 얻을 수 있습니다. 최소 2글자 이상
                    입력해주세요.
                </h1>
            </section>
            <section className="infoSearch">
                <div className="searchBox">
                    <img src="/icon/searchGray.svg" alt="검색 아이콘" />
                    <input
                        type="text"
                        placeholder="영화제목을 입력해주세요."
                        onChange={e => setTxt(e.target.value)}
                    />
                </div>
                {message}
                {!loading && results.length > 0 && (
                    <ModalSearch
                        results={results}
                        setResults={setResults}
                        selectMovie={selectMovie}
                    />
                )}
            </section>
        </div>
    );
}
