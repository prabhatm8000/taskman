import apiClient from "@/apiCalls/apiClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useUserStore from "@/store/user/store";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function Login() {
    const { setUser, setLoading, setError, loading } = useUserStore();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string | null | undefined;
        const password = formData.get("password") as string | null | undefined;

        if (!username || !password) {
            setError({
                message: "Please fill in all fields",
                success: false,
            });
            return;
        }

        setLoading(true);
        try {
            const userData = await apiClient.userAPICalls.login(
                username,
                password
            );
            if ("success" in userData) {
                setError(userData);
                setLoading(false);
                return;
            }
            setUser(userData);
            setLoading(false);
            toast.success("Login successful");
        } catch (error: any) {
            setError({
                message: error.message,
                success: false,
            });
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 w-full min-w-xs"
                    >
                        <Input placeholder="Username" name="username" />
                        <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                        <Button
                            disabled={loading}
                            type="submit"
                            className="mt-4 gap-2"
                        >
                            <span>Login</span>
                        </Button>
                    </form>
                    <div className="mt-6 text-center text-sm">
                        Don&apos;t have an account?
                        <Link to="/register" className="ml-1 text-blue-500">
                            sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;
