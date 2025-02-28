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
