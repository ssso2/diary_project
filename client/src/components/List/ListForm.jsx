import { useContext, useEffect } from "react";
import styles from "../../scss/components/ListForm.module.scss";
import { MovieContext } from "./MovieContext";
import { genres } from "./genres";
import Pagenation from "../common/Pagenation";

export default function ListForm() {
    const context = useContext(MovieContext);
    const {
        contents,

        PerPage,
        currentPage,
        setcurrentPage,
        pageMovies,
        totalMovies,
        totalPage,
    } = context;

    const genreName = genreId => {
        const genre = genres.find(g => g.id === genreId);
        return genre ? genre.name : "기타";
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    return (
        <div className={styles.constainer}>
            <p>{totalMovies}개</p>
            <div className={styles.listconstainer}>
                {pageMovies.map(movie => (
                    <div key={movie.id} className={styles.listwrapper}>
                        <div className={styles.poster}>
                            <img
                                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                alt="영화포스터"
                            />
                        </div>
                        <div className={styles.info}>
                            <h1 className={styles.title}>{movie.title}</h1>
                            <div className={styles.txtwrap}>
                                <p>장르 {genreName(movie.genre_ids[0])}</p>
                                <p>개봉 {movie.release_date}</p>
                            </div>
                        </div>
                        <div className={styles.reviewrap}>
                            <img src="/icon/orangestar.svg" alt="별점" />
                            <p className={styles.txt}>{movie.vote_average}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.paginationConstainer}>
                <Pagenation
                    // totalItems={contents.length}
                    // PerPage={PerPage}
                    allmovies={contents}
                    // setcontents,
                    PerPage={PerPage}
                    currentPage={currentPage}
                    totalPage={totalPage}
                    pageChange={setcurrentPage}
                />
            </div>
        </div>
    );
}
