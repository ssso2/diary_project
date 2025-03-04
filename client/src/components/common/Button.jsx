// import styles from "../../scss/components/.module.scss";
import { Link } from "react-router-dom";
import "../../scss/common.scss";

export default function Button() {
    return (
        <Link to="register" className="btnOrange">
            + 등록
        </Link>
    );
}
