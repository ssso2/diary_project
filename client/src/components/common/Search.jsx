export default function Search() {
    const searchGo = e => {
        console.log("입력값", e.target);
        alert("클릭");
    };
    return (
        <form className="searchWrap" onSubmit={searchGo}>
            <input
                className="bar"
                type="text"
                name="keyword" // 폼데이터키역할
                // value={Ntext} // 폼데이터값
                placeholder="제목을 입력해주세요."
                // onChange={e => setNtext(e.target.value)}
            />
            <button type="submit" className="searchbtn">
                <img src="/icon/search.svg" alt="" />
            </button>
            {/* <Noticebtn handleSearch={handleSearch} /> */}
        </form>
    );
}
