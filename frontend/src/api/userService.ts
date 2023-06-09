import { api } from "../baseConfig";
import { User } from "../types";
import { useUserStore } from "../stores/userStore";

class UserService {
    async login(identifier: string, password: string): Promise< User | Error > {
        try {
            const { data } = await api.post("/auth/local", {
                identifier,
                password,
            });

            const jwt = data.jwt;

            const res = await api.get("/users/me", {
                params: {
                    populate: ["role"],
                },
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            const userStore = useUserStore();
            userStore.username = res.data.username;
            userStore.jwt = jwt;
            userStore.role = res.data.role.type;

            localStorage.setItem("username", res.data.username);
            localStorage.setItem("token", jwt);
            localStorage.setItem("role", res.data.role.type);

            return res.data as User;
        } catch (error) {
            return error as Error;
        }
    }

    async register(
        username: string,
        email: string,
        password: string,
    ): Promise< User | Error> {
        try {
            const { data } = await api.post("/auth/local/register", {
                username,
                email,
                password,
            });

            return data as User;
        } catch (error) {
            return error as Error;
        }
    }
}

export function useUserService() {
    return new UserService;
}