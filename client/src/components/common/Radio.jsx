import { useEffect, useState } from "react";
import "../../scss/components/Radio.scss";

export default function Radio({ name, options, selected, setSelectedOption }) {
    return (
        <div className="radioGroup">
            {options.map(option => (
                <div key={option.id} className="radioWrapper">
                    <input
                        type="radio"
                        id={option.id}
                        name={name}
                        value={option.id}
                        checked={selected === option.id}
                        onChange={() => setSelectedOption(option.id)}
                    />
                    <label htmlFor={option.id}>{option.label}</label>
                </div>
            ))}
        </div>
    );
}
