import apiClient from "@/apiCalls/apiClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useUserStore from "@/store/user/store";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function Register() {
    const { setUser, setLoading, setError, loading } = useUserStore();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string | null | undefined;
        const password = formData.get("password") as string | null | undefined;
        const confirmPassword = formData.get("confirmPassword") as
            | string
            | null
            | undefined;

        if (password !== confirmPassword) {
            setError({
                message: "Passwords do not match",
                success: false,
            });
            return;
        }
        if (!username || !password) {
            setError({
                message: "Please fill in all fields",
                success: false,
            });
            return;
        }

        setLoading(true);
        try {
            const userData = await apiClient.userAPICalls.register(
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
            toast.success("Registration successful");
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
                    <CardTitle className="text-2xl">Register</CardTitle>
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
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                        />
                        <Button
                            disabled={loading}
                            type="submit"
                            className="mt-4"
                        >
                            <span>Register</span>
                        </Button>
                    </form>
                    <div className="mt-6 text-center text-sm">
                        Already have an account?
                        <Link to="/" className="ml-1 text-blue-500">
                            login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Register;
