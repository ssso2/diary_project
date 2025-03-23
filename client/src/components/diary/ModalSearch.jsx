import "../../scss/components/Modal.scss";
import { genreName } from "../../utils/Validation";

export default function ModalSearch({ results, selectMovie }) {
    return (
        <div className="content">
            <section className="dataContainer">
                {results.map(movie => (
                    <article key={movie.id} className="dataWrapper">
                        <figure className="posterWrap">
                            <img
                                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                alt={`${movie.title} 포스터`}
                            />
                        </figure>
                        <div className="info">
                            <h3 className="title">{movie.title}</h3>
                            <div className="txtwrap">
                                <p className="txt">
                                    장르 {genreName(movie.genre_ids[0])}
                                </p>
                                <p className="txt">개봉 {movie.release_date}</p>
                            </div>
                        </div>
                        <div className="reviewrap">
                            <img src="/icon/orangestar.svg" alt="평점 아이콘" />
                            <p className="txt">
                                {Math.round(movie.vote_average * 10) / 10}
                            </p>
                        </div>
                        <button
                            type="button"
                            className="searchBtn"
                            onClick={() => selectMovie(movie)}
                            title="포스터선택"
                        >
                            불러오기
                        </button>
                    </article>
                ))}
            </section>
        </div>
    );
}
