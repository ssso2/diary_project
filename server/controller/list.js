const express = require("express");
const router = express.Router();
const axios = require("axios");
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

router.get("/movie", async (req, res) => {
    console.log("목록접근");
    try {
        const firstpage = await axios.get(`${BASE_URL}/movie/now_playing`, {
            params: {
                api_key: API_KEY,
                language: "ko-KR",
                region: "KR",
                page: 1,
            },
        });
        const totalpage = firstpage.data.total_pages;
        const data = [];
        for (let page = 2; page <= totalpage; page++) {
            data.push(
                axios.get(`${BASE_URL}/movie/now_playing`, {
                    params: {
                        api_key: API_KEY,
                        language: "ko-KR",
                        region: "KR",
                        page: page,
                    },
                })
            );
        }

        const alldata = [firstpage, ...(await Promise.all(data))]; //data 동시요청후 완료되면 배열반환
        const allresults = alldata.flatMap(item => item.data.results);
        const result = {
            ...totalpage.data,
            results: allresults,
            total_results: allresults.length,
        };

        res.status(200).json(result);
    } catch (error) {
        console.error("데이터불러오기 오류:", error);
        res.status(500).json({ message: "데이터 요청에 실패했습니다." });
    }
});
module.exports = router;
