import { useState } from "react";
import "../../scss/common.scss";
import Modal from "./Modal";

export default function Thumbnail({ selectedOption, changeValue, setPreview }) {
    const changeImg = e => {
        const seleted = e.target.files[0]; //객체
        setPreview(URL.createObjectURL(seleted));
        changeValue({ target: { name: "thumbnail", value: seleted.name } }); // 객체로 전달
    };
    const [modal, setModal] = useState(false);
    console.log("모달 상태 변경 전:", modal);
    return (
        <div>
            <div className="posterInputWrap">
                {selectedOption === "poster" ? (
                    <>
                        <input
                            type="text"
                            placeholder="포스터를 검색하세요."
                            className="imgInput"
                            readOnly
                        />
                        <button
                            type="button"
                            className="searchBtn"
                            onClick={e => {
                                e.stopPropagation();
                                setModal(true);
                                console.log("모달 상태 변경 후", modal);
                            }}
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
            {modal && <Modal setModal={setModal} />}
        </div>
    );
}
