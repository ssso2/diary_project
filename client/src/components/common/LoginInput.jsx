import "../../scss/common.scss";

export function LoginInput({
    name,
    id,
    type,
    value,
    placeholder,
    onChange,
    readOnly,
}) {
    return (
        <div className="inputContainer">
            <label htmlFor={id} className="label">
                {name}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="input"
                required
                readOnly={readOnly}
            />
        </div>
    );
}
