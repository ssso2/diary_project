import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiError } from "../../utils/Validation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const URL = process.env.REACT_APP_BACK_URL;
    const navigate = useNavigate();
    // const [email, setEmail] = useState("");

    //회원가입 이메일 인증
    const [emailValid, setemailValid] = useState(false);
    const [code, setcode] = useState("");
    const [codesend, setcodesend] = useState(false);
    const [codeValid, setcodeValid] = useState(false);
    const [codeInput, setcodeInput] = useState("");

    //회원가입 폼, 로그인폼, 비밀번호찾기폼
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [codeVerify, setcodeVerify] = useState(false);
    const [pw, setpw] = useState("");
    const [pwchk, setpwchk] = useState("");

    //회원가입 성공
    const [joinSuccess, setjoinSuccess] = useState(false);
    //비밀번호찾기
    const [step, setStep] = useState(1);
    const [pwCheckSuccess, setPwCheckSuccess] = useState(false);
    //마이페이지
    const [mystep, setMystep] = useState(1);
    //회원정보, 토큰
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return JSON.parse(storedUser);
    }); // 문자열가져와서 다시객체화
    const [token, setToken] = useState(localStorage.getItem("token"));

    //회원가입
    const joinGo = async (email, pw, name) => {
        try {
            await axios.post(`${URL}/join/member`, {
                email,
                pw,
                name,
            });
            console.log("회원가입성공");
            setjoinSuccess(true);
            resetForm();
        } catch (error) {
            console.error("회원가입 실패:", error);
            ApiError(error);
        }
    };

    //회원가입 - 이메일 인증 요청
    const joinRequestcode = async email => {
        try {
            const res = await axios.post(`${URL}/join`, {
                email,
            });
            setcodesend(true);
            setcode(res.data.code);
            setcodeValid(true);
            alert(res.data.message);
        } catch (error) {
            console.error("이메일인증 요청 실패:", error);
            ApiError(error);
        }
    };

    //회원가입 - 인증 코드 확인
    const joinVerifycode = async (email, codeInput) => {
        try {
            const coderes = await axios.post(`${URL}/join/codecheck`, {
                email,
                codeInput,
            });
            setcodeVerify(true);
            alert(coderes.data.message);
        } catch (error) {
            console.error("회원가입인증 요청 실패:", error);
            ApiError(error);
        }
    };

    //로그인
    const loginGo = async (email, pw) => {
        try {
            const res = await axios.post(`${URL}/login`, { email, pw });
            const { user, token } = res.data;
            // console.log("서버응답유저토큰", user, token);
            setUser(user); //회원상태업데이트
            setToken(token); //토큰상태업데이트
            localStorage.setItem("user", JSON.stringify(user)); //객체를 문자열로 저장
            localStorage.setItem("token", token); //로컬스토리지저장
            alert(`${user.name}님 로그인되었습니다.`);
            navigate("/home");
        } catch (error) {
            console.error("로그인 요청 실패:", error);
            ApiError(error);
        }
    };

    // 로그아웃
    const logout = () => {
        setUser(null); //회원상태초기화
        setToken(null); //토큰초기화
        localStorage.removeItem("user"); // 로컬스토리지제거
        localStorage.removeItem("token"); // 로컬스토리지제거
    };

    //비밀번호찾기 - 이메일 인증 요청
    const requestcode = async email => {
        try {
            const res = await axios.post(`${URL}/find`, {
                email,
            });
            setcodesend(true);
            setcode(res.data.code);
            setcodeValid(true);

            alert(`${res.data.message}`);
        } catch (error) {
            console.error("비밀번호찾기 이메일인증요청 실패:", error);
            ApiError(error);
        }
    };

    //비밀번호찾기 - 인증 코드 확인
    const verifycode = async (email, codeInput) => {
        try {
            const coderes = await axios.post(`${URL}/find/codecheck`, {
                email,
                codeInput,
            });
            setcodeVerify(true);
            setPwCheckSuccess(true);
            setStep(2);
            alert(coderes.data.message);
        } catch (error) {
            const message =
                error.response.data?.error || "인증에 실패했습니다.";
            alert(message);
        }
    };

    //비밀번호찾기
    const findGo = async (email, pw) => {
        try {
            const res = await axios.post(`${URL}/find/member`, { email, pw });
            // console.log("응답받나", res.data);
            setStep(3);
        } catch (error) {
            console.error("비밀번호찾기 실패:", error);
        }
    };

    //마이페이지 본인인증
    const PwchkGo = async (id, pw) => {
        // console.log("본인인증정보", id, pw);
        // alert("본인인증클릭", id, pw);
        try {
            const res = await axios.post(`${URL}/mypage`, { id, pw });
            // console.log("본인인증응답받나", res.data);
            alert(res.data.message);
            setMystep(2);
        } catch (error) {
            console.error("본인인증 요청 실패:", error);
            ApiError(error);
        }
    };

    //마이페이지 비밀번호 변경
    const PwUpdateGo = async (id, pw) => {
        try {
            const res = await axios.post(`${URL}/mypage/modify`, { id, pw });
            // console.log("비밀번호변경응답받나", res.data);
            alert(res.data.message);
            navigate("/home");
        } catch (error) {
            console.error("본인인증 요청 실패:", error);
            ApiError(error);
        }
    };

    const resetForm = () => {
        setname("");
        setemail("");
        setpw("");
        setpwchk("");
        setemailValid(false);
        setcodesend(false);
        setcodeValid(false);
        setcodeInput("");
        setcodeVerify(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                name,
                setname,
                email,
                setemail,
                pw,
                setpw,
                pwchk,
                setpwchk,
                emailValid,
                setemailValid,
                joinGo,
                joinRequestcode,
                joinVerifycode,
                joinSuccess,
                setjoinSuccess,
                loginGo,
                logout,
                step,
                setStep,
                requestcode,
                verifycode,
                findGo,
                pwCheckSuccess,
                setPwCheckSuccess,
                codesend,
                setcodesend,
                setcodeValid,
                codeInput,
                setcodeInput,
                codeVerify,
                setcodeVerify,
                codeValid,
                resetForm,
                PwchkGo,
                mystep,
                setMystep,
                PwUpdateGo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); //커스텀훅
