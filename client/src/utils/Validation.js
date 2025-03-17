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
    const newdate = new Date(day); // day가 "2025-03-30T15:00:00.000Z"
    const kodate = new Date(newdate.getTime() + 9 * 60 * 60 * 1000);
    return kodate.toISOString().split("T")[0];
};

//API요청 catch 블록
export const ApiError = error => {
    // 서버에서 응답을 준 경우 (404, 500..)
    if (error.response) {
        const message =
            error.response?.data?.error || "요청을 처리할 수 없습니다.";
        alert(message);
    }
    // 요청이 전송되었지만 응답이 없을 때
    else if (error.request) {
        alert("서버 응답이 없습니다. 잠시 후 다시 시도해주세요.");
    }
    // 요청 자체가 실패했을 때
    else {
        alert("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
    }
};
