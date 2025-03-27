import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import "./scss/reset.css";

import Main from "./pages/Main.jsx";
import Login from "./pages/login/Login.jsx";
import Join from "./pages/login/Join.jsx";
import HomeRoutes from "./Homeroutes.js";
import Find from "./pages/login/Find.jsx";
import { AuthProvider } from "./components/login/AuthContext.jsx";
import ProtecteRoute from "./ProtectRoute.js";
import NotFound from "./pages/NotFound.jsx";
import { useEffect } from "react";
import ScrollToTop from "./ScrollToTop.jsx";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/find" element={<Find />} />
                    <Route
                        path="/home/*"
                        element={
                            <ProtecteRoute>
                                <HomeRoutes />
                            </ProtecteRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
