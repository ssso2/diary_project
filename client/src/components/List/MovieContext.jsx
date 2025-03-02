import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const MovieContext = createContext([]);

export default function MovieProvider({ children }) {
    const URL = process.env.REACT_APP_BACK_URL;
    const [contents, setcontents] = useState([]);

    useEffect(() => {
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
    }, [contents.length]);

    return (
        <MovieContext.Provider value={contents}>
            {children}
        </MovieContext.Provider>
    );
}
