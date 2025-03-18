import axios from "axios";
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

// 이미지 base64 문자열을 Blob 객체로 변환
export function dataURLtoBlob(dataUrl) {
    // data:image/jpeg;base64,data:image/jpeg;base64,/9j/4AA.. 오류
    // 정규식 치환
    dataUrl = dataUrl.replace(/^(data:image\/[^;]+;base64,)+/, "$1");
    const BASE64_MARKER = ";base64,";
    const parts = dataUrl.split(BASE64_MARKER);

    if (parts.length !== 2) {
        throw new Error("올바르지 않은 base64 형식입니다.");
    }

    const mime = parts[0].split(":")[1]; // ex) image/jpeg
    const bstr = atob(parts[1]); // 순수 base64 부분만 디코딩

    // 4. binary string의 길이만큼 빈 Uint8Array 배열 생성
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // 5. binary string을 1글자씩 읽어와 Uint8Array에 넣음
    for (let i = 0; i < n; i++) {
        u8arr[i] = bstr.charCodeAt(i);
    }

    // 6. Uint8Array 데이터를 이용해 Blob 객체 생성 (type: 이미지 MIME)
    return new Blob([u8arr], { type: mime });
}

// 서버응답 다이어리 문자열전환
export function extractSummary(content, limit = 50) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    let plainText = tempDiv.textContent || tempDiv.innerText || "";
    plainText = plainText.replace(/\s+/g, " ").trim();

    return plainText.length > limit
        ? plainText.slice(0, limit) + "..."
        : plainText;
}

// 에디터 이미지업로드 API
export const uploadImgs = async (editorRef, setContent) => {
    const URL = process.env.REACT_APP_BACK_URL;
    const content = editorRef.current.getContent();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    const images = tempDiv.querySelectorAll("img[src^='data:image']");

    //이미지없을때 내용업데이트
    if (images.length === 0) {
        console.log("tempDiv.innerHTML", tempDiv.innerHTML);
        return tempDiv.innerHTML;
    }
    if (images.length > 5) {
        alert("이미지는 최대 5개까지만 등록할 수 있습니다.");
        // throw new Error("이미지 5개 초과");
        return;
    }

    const formData = new FormData();
    images.forEach((img, i) => {
        const base64String = img.src;
        const blob = dataURLtoBlob(base64String);
        const file = new File([blob], `image${i}.jpg`, { type: blob.type }); // 파일명 주입. 확장자 빠짐해결
        formData.append("file", file); //file 서버 키 통일 (upload.array("file"))
        console.log("여기까지", blob);
    });

    const res = await axios.post(`${URL}/img/editor`, formData);
    const uploadedUrls = res.data.urls;

    images.forEach((img, i) => {
        img.src = uploadedUrls[i];
    });

    const finalContent = tempDiv.innerHTML;

    return finalContent;
};
