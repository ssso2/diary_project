import "../../scss/components/Modal.scss";
import { genreName } from "../../utils/Validation";

export default function ModalSearch({ setModal }) {
    const pageMovies = [
        {
            id: 1,
            title: "인셉션",
            poster_path: "/sub/poster.png",
            genre_ids: [28, 878], // 액션, SF
            release_date: "2010-07-16",
            vote_average: 8.8,
        },
        {
            id: 2,
            title: "인터스텔라",
            poster_path: "/sub/poster.png",
            genre_ids: [12, 18, 878], // 모험, 드라마, SF
            release_date: "2014-11-07",
            vote_average: 8.6,
        },
        {
            id: 3,
            title: "기생충",
            poster_path: "/sub/poster.png",
            genre_ids: [35, 18, 53],
            release_date: "2019-05-30",
            vote_average: 8.5,
        },
    ];
    return (
        <div className="content">
            <section>
                <div className="searchBox">
                    <img src="/icon/searchGray.svg" alt="검색 아이콘" />
                    <input type="text" placeholder="영화제목을 입력해주세요." />
                </div>
            </section>
            <section className="dataContainer">
                {pageMovies.map(movie => (
                    <article key={movie.id} className="dataWrapper">
                        <figure className="posterWrap">
                            <img
                                src={movie.poster_path}
                                alt={`${movie.title} 포스터`}
                            />
                        </figure>
                        <div className="info">
                            <h3 className="title">{movie.title}</h3>
                            <div className="txtwrap">
                                <p>장르 {genreName(movie.genre_ids[0])}</p>
                                <p>개봉 {movie.release_date}</p>
                            </div>
                        </div>
                        <div className="reviewrap">
                            <img src="/icon/orangestar.svg" alt="평점 아이콘" />
                            <p className="txt">
                                {Math.round(movie.vote_average * 10) / 10}
                            </p>
                        </div>
                        <button className="searchBtn">불러오기</button>
                    </article>
                ))}
            </section>
        </div>
    );
}
