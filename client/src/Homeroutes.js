import { Routes, Route } from "react-router-dom";
import MovieProvider from "./components/list/MovieContext";
import Layout from "./components/common/Layout";
import Myhome from "./pages/myhome/Myhome";
import List from "./pages/list/List";
import ListForm from "./components/list/ListForm";
import ENList from "./pages/list/ENList";
import Diary from "./pages/diary/Diary";
import DiaryListForm from "./components/diary/DiaryListForm";
import Archive from "./pages/diary/Archive";
import Write from "./pages/diary/Write";

function HomeRoutes() {
    return (
        <MovieProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Myhome />} />
                    <Route path="list" element={<List />}>
                        <Route index element={<ListForm />} />
                        <Route path="en" element={<ListForm />} />
                    </Route>
                    <Route path="diary" element={<Diary />}>
                        <Route index element={<DiaryListForm />} />
                        <Route path="archive" element={<Archive />} />
                    </Route>
                    <Route path="Write" element={<Write />} />
                </Route>
            </Routes>
        </MovieProvider>
    );
}

export default HomeRoutes;
