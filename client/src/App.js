import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/reset.css";
import Main from "./pages/Main.jsx";
import Login from "./pages/login/Login.jsx";
import Join from "./pages/login/Join.jsx";
import HomeRoutes from "./Homeroutes.js";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />

                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Join />} />
                <Route path="/home/*" element={<HomeRoutes />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
