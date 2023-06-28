import { api } from "../baseConfig";
import { User, UserCollection } from "../types";
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
            userStore.id = res.data.id;
            userStore.username = res.data.username;
            userStore.jwt = jwt;
            userStore.role = res.data.role.type;

            localStorage.setItem("id", res.data.id);
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

    async getUserById(id: string): Promise <User | Error> {
        const noContentStatusNumber = 204;
        const axiosResponse = await api.get(`users/${id}`);

        if (axiosResponse.status === noContentStatusNumber) {
            return new Error("no content");
        } else {
            return axiosResponse.data as User;
        }
    }

    async getUsersByName(username: string): Promise<UserCollection | Error> {
        const userStore = useUserStore();
        try {
            const { data } = await api.get("/users", {
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`,
                },
                params: {
                    populate: ["role"],
                    "filters[username][$containsi]": username,
                },
            });

            return { items: data };
        } catch (error) {
            return error as Error;
        }
    }
}

export function useUserService() {
    return new UserService;
}