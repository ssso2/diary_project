import axios from "axios";
import { useEffect, useState } from "react";
import LoginHeader from "../../components/common/LoginHeader";
import SideNav from "../../components/common/SideNav";
import Tab from "../../components/common/Tab";
import { Outlet } from "react-router-dom";

export default function MovieList() {
    const tabs = [
        { title: "한국", path: "/home/list" },
        { title: "외국", path: "/home/list/en" },
    ];

    return (
        <>
            <h1 className="title">최신영화 정보</h1>
            <Tab tabs={tabs} />
            <main className="diaryContainer listContainer">
                <Outlet />
            </main>
        </>
    );
}
