import { Routes, Route } from "react-router-dom";
import MovieProvider from "./components/list/MovieContext";
import Layout from "./components/common/Layout";
import Myhome from "./pages/myhome/Myhome";
import List from "./pages/list/List";
import ListForm from "./components/list/ListForm";
import ENList from "./pages/list/ENList";
import Diary from "./pages/diary/Diary";
import DiaryListForm from "./components/diary/DiaryListForm";
import Bookmark from "./pages/diary/Bookmark";
import Write from "./pages/diary/Write";
import Detail from "./pages/diary/Detail";
import Edit from "./pages/diary/Edit";
import Stats from "./pages/stats/Stats";
import Mypage from "./pages/myhome/Mypage";
import NotFound from "./pages/NotFound";

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
                        <Route path="bookmark" element={<Bookmark />} />
                    </Route>
                    <Route path="write" element={<Write />} />
                    <Route path="detail/:id" element={<Detail />} />
                    <Route path="detail/:id/edit" element={<Edit />} />
                    <Route path="stats" element={<Stats />} />
                    <Route path="mypage" element={<Mypage />} />
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </MovieProvider>
    );
}

export default HomeRoutes;
