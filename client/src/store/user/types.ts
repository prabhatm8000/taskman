import type { APIErrorType } from "@/apiCalls/error";

export type IUser = {
    id: string;
    username: string;
};

export type UserStore = {
    user: IUser | null;
    loading: boolean;
    error: APIErrorType | null;
    setUser: (user: IUser | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: APIErrorType | null) => void;
};
