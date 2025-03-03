import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export const MovieContext = createContext([]);

export default function MovieProvider({ children }) {
    const URL = process.env.REACT_APP_BACK_URL;
    const location = useLocation();
    const [type, settype] = useState("korean");
    const [contents, setcontents] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const PerPage = 10;

    useEffect(() => {
        settype(location.pathname === "/home/list" ? "korean" : "foreign");
        console.log("타입", type, location.pathname);
        const moviedata = async () => {
            try {
                if (contents.length === 0) {
                    const res = await axios.get(`${URL}/list/movie`);
                    console.log("데이터확인", res.data);
                    setcontents(res.data.results);
                }
            } catch (error) {
                console.log(error);
            }
        };
        moviedata();
    }, [type, contents.length, location.pathname]);

    const filtermovies = useMemo(() => {
        const filtered = contents.filter(content =>
            type === "korean"
                ? content.original_language === "ko"
                : content.original_language !== "ko"
        );

        const firstIndex = (currentPage - 1) * PerPage;
        const pageMovies = filtered.slice(firstIndex, firstIndex + PerPage); //0-9 10개씩 출력
        const totalMovies = filtered.length;
        const totalPage = Math.ceil(filtered.length / PerPage);

        return { pageMovies, totalMovies, totalPage };
    }, [contents, type, currentPage]);

    return (
        <MovieContext.Provider
            value={{
                contents,
                // setcontents,

                PerPage,
                type,
                settype,
                currentPage,
                setcurrentPage,
                ...filtermovies,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
}
