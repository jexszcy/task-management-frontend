import { createContext, useContext, useEffect, useState } from "react";
import axiosRequest from "./../utils/axios-request"
import { useNavigate, useLocation } from "react-router";
import { toastSuccess, toastWarning } from "../pages/ToastNotif";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkUser = async () => {
        try {
            const res = await axiosRequest.get("user");
            const location = window.location.pathname;
            if (!location.includes("/auth/sign-in")) {
                navigate("/tasks");
            }
            setUser(res.data);
        } catch (error) {
            Cookies.remove("access_token");
            setUser(null);
            const location = window.location.pathname;
            if (!location.includes("/auth/sign-up")) {
                navigate("/");
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const response = await axiosRequest.post("auth/sign-out");
            toastSuccess(response.data.message)
            setUser(null);
            navigate("/");
            Cookies.remove("access_token");
        } catch (error) {
            toastWarning(err.response.data.message)
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, checkUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
