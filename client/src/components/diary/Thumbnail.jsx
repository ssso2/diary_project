import { useState } from "react";
import "../../scss/common.scss";
import Modal from "./Modal";

export default function Thumbnail({
    selectedOption,
    setPreview,
    setFile,
    setPosterThumbnail,
}) {
    const [modal, setModal] = useState(false);

    const changeImg = e => {
        const seleted = e.target.files[0]; //객체
        // console.log("seleted객체", seleted);
        setPreview(URL.createObjectURL(seleted));
        setFile(seleted);
    };
    const selectMovie = movie => {
        const imgUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
        setFile(null);
        setPosterThumbnail(imgUrl);
        setPreview(imgUrl);
        setModal(false);
    };

    // console.log("모달 상태 변경 전:", modal);
    return (
        <div>
            <div className="posterInputWrap">
                {selectedOption === "poster" ? (
                    <>
                        <input
                            type="text"
                            placeholder="포스터를 검색하세요."
                            className="imgInput"
                            // value={path}
                            readOnly
                        />
                        <button
                            type="button"
                            className="searchBtn"
                            onClick={e => {
                                e.stopPropagation();
                                setModal(true);
                            }}
                            title="검색"
                        >
                            검색하기
                        </button>
                    </>
                ) : (
                    <input
                        type="file"
                        accept="image/*"
                        className="imgInputWrap"
                        onChange={changeImg}
                    />
                )}
            </div>
            {modal && <Modal setModal={setModal} selectMovie={selectMovie} />}
        </div>
    );
}
