import useUserStore from "@/store/user/store";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const NavBar = () => {
    const { user } = useUserStore();
    return (
        <nav className="w-full border-b border-border">
            <div className="max-w-7xl mx-auto p-4 flex justify-between items-center gap-4">
                <h1 className="text-2xl sm:text-4xl font-semibold">TaskMan</h1>
                <div className="flex gap-4 items-center">
                    {user ? (
                        <>
                            <span>{user.username}</span>
                            <Link to="/logout">
                                <Button variant={"destructive"}>Logout</Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button>Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Register</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
