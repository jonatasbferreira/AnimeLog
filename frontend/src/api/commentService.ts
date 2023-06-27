import { api } from "../baseConfig";
import { Comment, CommentCollection } from "../types";
import { useUserStore } from "../stores/userStore";

class CommentService {
    async create(
        text: string,
        animeId: string,
        userId: string,
    ): Promise<Comment | Error>{
        const userStore = useUserStore();
        try {
            const { data } = await api.post("/comments", {
                data: {
                    text: text,
                    anime: animeId,
                    user: userId,
                },
            }, {
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`,
                },
            });

            return data;
        } catch (error) {
            return error as Error;
        }
    }

    async getCommentsByAnime(
        animeId: string,
    ): Promise<CommentCollection | Error> {
        try {
            const { data } = await api.get("/comments", {
                params: {
                    populate: ["anime", "user"],
                    "filters[anime][id][$eq]": animeId,
                    sort: "createdAt:desc",
                },
            });

            return { items: data.data };
        } catch (error) {
            return error as Error;
        }
    }
}

export function useCommentService() {
    return new CommentService;
}