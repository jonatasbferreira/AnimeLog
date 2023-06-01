import { api } from "../baseConfig";

export interface User {
    id: string,
    username: string,
    email: string,
    role: {
        type: string
    }
}

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

            return res.data as User;
        } catch (error) {
            return error as Error;
        }
    }
}

export function useUserService() {
    return new UserService;
}