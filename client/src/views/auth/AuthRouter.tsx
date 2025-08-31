import apiClient from "@/apiCalls/apiClient";
import LoadingCircle from "@/components/LoadingCircle";
import useUserStore from "@/store/user/store";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

const AuthRouter = () => {
    const { loading, user, setUser, setLoading, setError } = useUserStore();
    const navigate = useNavigate();

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await apiClient.userAPICalls.verify();
            if ("success" in response) {
                setError(response);
                setLoading(false);
                return;
            }
            setUser(response);
            setLoading(false);
        } catch (error: any) {
            setError({
                message: error.message,
                success: false,
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user || loading) return;
        fetchUser();
    }, []);

    useEffect(() => {
        if (!loading && user) {
            navigate("/task");
            return;
        }
    }, [loading, user]);

    return (
        <AuthLayout>
            {loading && (
                <div className="min-h-dvh w-full absolute top-0 left-0 bg-background/50 flex items-center justify-center">
                    <LoadingCircle className="size-5" />
                </div>
            )}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </AuthLayout>
    );
};

export default AuthRouter;
