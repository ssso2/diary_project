import { useEffect, useState } from "react";
import styles from "../../scss/components/ListForm.module.scss";
import axios from "axios";

export default function ListForm() {
    const URL = process.env.REACT_APP_BACK_URL;
    const [contents, setcontents] = useState([]);
    useEffect(() => {
        const reqdata = async () => {
            try {
                const res = await axios.get(`${URL}/list/movie`);
                console.log("데이터확인", res.data);
                setcontents(res.data.results);
            } catch (error) {
                console.log(error);
            }
        };
        reqdata();
    }, []);
    return (
        <>
            {contents.map(movie => (
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
                            <p>장르 {movie.genre_ids[0]}</p>
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
