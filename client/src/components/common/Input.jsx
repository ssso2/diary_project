import "../../scss/common.scss";

export default function Input({ placeholder, name, value, onChange }) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className="input"
            required
        ></input>
    );
}
