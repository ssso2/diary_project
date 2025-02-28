import { NavLink } from "react-router-dom";

export default function Tab() {
    return (
        <nav>
            <ul className="tabs">
                <li className="tablist">
                    <NavLink to="#" className="tabLink">
                        전체
                    </NavLink>
                </li>
                <li className="tablist">
                    <NavLink to="archive" className="tabLink">
                        보관함
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
