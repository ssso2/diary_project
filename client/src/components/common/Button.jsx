// import styles from "../../scss/components/.module.scss";
import { Link } from "react-router-dom";
import "../../scss/common.scss";

//링크
export const LinkBtn = ({ to, className, title }) => {
    return (
        <Link to={to} className={`btn ${className}`}>
            {/* <img src="/icon/next.svg" /> */}
            {title}
        </Link>
    );
};

//버튼
export const Btn = ({ type, className, title }) => {
    return (
        <button type={type} className={`btn ${className}`}>
            {title}
        </button>
    );
};
