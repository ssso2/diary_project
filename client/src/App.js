import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./scss/reset.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Join from "./pages/login/Join.jsx";
import List from "./pages/list/List.jsx";
import Diary from "./pages/diary/Diary.jsx";
import Myhome from "./pages/myhome/Myhome.jsx";
import Layout from "./components/common/Layout.jsx";
import DiaryListForm from "./components/diary/DiaryListForm.jsx";
import Archive from "./pages/diary/Archive.jsx";
import ENList from "./pages/list/ENList.jsx";
import ListForm from "./components/List/ListForm.jsx";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/home" element={<Layout />}>
                        <Route index element={<Myhome />} />
                        <Route path="list" element={<List />}>
                            <Route index element={<ListForm />} />
                            <Route path="en" element={<ENList />} />
                        </Route>
                        <Route path="diary" element={<Diary />}>
                            <Route index element={<DiaryListForm />} />
                            <Route path="archive" element={<Archive />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
