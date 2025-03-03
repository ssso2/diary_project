import { useContext, useEffect, useMemo, useRef, useState } from "react";
import styles from "../../scss/components/ListForm.module.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MovieContext } from "./MovieContext";
import { genres } from "./genres";

export default function ListForm({ type }) {
    const URL = process.env.REACT_APP_BACK_URL;
    const contents = useContext(MovieContext);
    const filtermovies = useMemo(() => {
        if (type === "korean") {
            return contents.filter(
                content => content.original_language == "ko"
            );
        } else {
            return contents.filter(
                content => content.original_language !== "ko"
            );
        }
    }, [contents, type]);

    const genreName = genreId => {
        const genre = genres.find(g => g.id === genreId);
        return genre ? genre.name : "기타";
    };

    return (
        <>
            {filtermovies.map(movie => (
                <div key={movie.id} className={styles.listwrapper}>
                    <div className={styles.poster}>
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt=""
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
                        <img src="/icon/orangestar.svg" alt="" />
                        <p className={styles.txt}>{movie.vote_average}</p>
                    </div>
                </div>
            ))}
        </>
    );
}
