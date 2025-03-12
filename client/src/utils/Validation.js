import { genres } from "../components/list/genres";

// 한글이름 유효성검사
export const validateName = name => {
    return /^[가-힣]{2,10}$/.test(name);
};

// 이메일 유효성검사
export const validateEmail = email => {
    return /\S+@\S+\.\S+/.test(email);
};

// 비밀번호 유효성검사 (영문, 숫자, 특수문자 조합 & 8~16자)
export const validatePassword = password => {
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(
        password
    );
};
// 영화 장르 이름 변환
export const genreName = genreId => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : "기타";
};

//데이트피커 객체 날짜 변환
export const formatNewDate = day => {
    return new Date(day.getTime() + 9 * 60 * 60 * 1000) //Mon Mar 31 2025 00:00:00 GMT+0900
        .toISOString()
        .split("T")[0];
};

//문자열 날짜 변환
export const formatDate = day => {
    const newdate = new Date(day); // date가 "2025-03-30T15:00:00.000Z"
    const kodate = new Date(newdate.getTime() + 9 * 60 * 60 * 1000);
    return kodate.toISOString().split("T")[0];
};
