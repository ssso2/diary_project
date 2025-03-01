import { NavLink } from "react-router-dom";

export default function Tab({ tabs }) {
    return (
        <nav>
            <ul className="tabs">
                {tabs.map((tab, index) => (
                    <li key={index} className="tablist">
                        <NavLink to={tab.path} end className="tabLink">
                            {tab.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
