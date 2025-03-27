import { Outlet } from "react-router-dom";

import LoginHeader from "./LoginHeader";
import SideNav from "./SideNav";

import "../../scss/common.scss";
import { useEffect, useRef, useState } from "react";

export default function Layout() {
    const [open, setOpen] = useState(false);
    const [tablet, setTablet] = useState(window.innerWidth <= 1279);

    // 반응형대응
    useEffect(() => {
        const handleResize = () => {
            setTablet(window.innerWidth <= 1279);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <SideNav tablet={tablet} open={open} setOpen={setOpen} />
            <LoginHeader setOpen={setOpen} open={open} />

            <div className="layoutwrapper">
                <div className="layoutwrap">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
