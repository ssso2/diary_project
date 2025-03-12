import { useState } from "react";
import "../../scss/components/Select.scss";

export default function Select({ name, options, value, onChange }) {
    // const [selected, setSelected] = useState("");
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="filter"
            required
        >
            <option value="" disabled>
                장르를 선택하세요.
            </option>
            {options.map(option => (
                <option key={option.id} value={option.name}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}
