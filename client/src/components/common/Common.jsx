import "../../scss/common.scss";

export function ErrorMessage({ message }) {
    if (!message) return null;
    return <p className="error-msg">{message}</p>;
}
