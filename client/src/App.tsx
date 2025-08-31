import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import useTaskStore from "./store/task/store";
import useUserStore from "./store/user/store";
import AuthRouter from "./views/auth/AuthRouter";
import TaskRouter from "./views/task/TaskRouter";

function App() {
    const { loading, user, error: userError } = useUserStore();
    const { error: taskError } = useTaskStore();

    useEffect(() => {
        if (userError) toast.error(userError.message);
        if (taskError) toast.error(taskError.message);
    }, []);
    return (
        <div className="">
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<AuthRouter />} />
                    <Route
                        path="/task"
                        element={
                            !loading && user ? (
                                <TaskRouter />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                </Routes>
            </BrowserRouter>
            <Toaster duration={5000} />
        </div>
    );
}

export default App;
