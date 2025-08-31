import apiClient from "@/apiCalls/apiClient";
import useUserStore from "@/store/user/store";
import { useEffect } from "react";

const Logout = () => {
    const { loading, setError, setLoading } = useUserStore();
    const handleLogout = async () => {
        setLoading(true);
        try {
            await apiClient.userAPICalls.logout();
            window.location.href = "/";
        } catch (error) {
            setError({
                message: "Error logging out",
                success: false,
            });
            setLoading(false);
        }
    };
    useEffect(() => {
        if (loading) return;
        handleLogout();
    }, []);
    return (
        <div className="flex items-center justify-center text-lg">
            {loading && "logging out..."}
        </div>
    );
};

export default Logout;
