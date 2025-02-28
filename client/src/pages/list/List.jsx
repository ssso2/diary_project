import axios from "axios";
import { useEffect, useState } from "react";
import LoginHeader from "../../components/common/LoginHeader";
import SideNav from "../../components/common/SideNav";

export default function MovieList() {
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
            <h1>List</h1>
            <main></main>
            {contents.map(movie => (
                <div key={movie.id}>
                    <p>{movie.title}</p>
                    <p>{movie.release_date}</p>
                    <div>
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>
                </div>
            ))}
        </>
    );
}
