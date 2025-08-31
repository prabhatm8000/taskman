import { create } from "zustand";
import type { UserStore } from "./types";

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),

    loading: false,
    setLoading: (loading) => set({ loading }),

    error: null,
    setError: (error) => set({ error }),
}));

export default useUserStore;
