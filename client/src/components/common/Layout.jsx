import { Outlet } from "react-router-dom";

import LoginHeader from "./LoginHeader";
import SideNav from "./SideNav";

import "../../scss/common.scss";

export default function Layout() {
    return (
        <>
            <LoginHeader />
            <SideNav />
            <div className="layoutwrapper">
                <div className="layoutwrap">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
