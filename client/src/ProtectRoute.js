import { Navigate } from "react-router-dom";
import { useAuth } from "./components/login/AuthContext";

export default function ProtecteRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
