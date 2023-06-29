import { api } from "../baseConfig";
import { useUserStore } from "../stores/userStore";
import { AnimeCollection, Anime } from "../types";
const firstPage = 1;

class AnimeService {
    async getAllAnimes(page = firstPage): Promise<AnimeCollection | Error> {
        try {
            const { data } = await api.get("/animes", {
                params: {
                    "pagination[page]": page,
                    "pagination[pageSize]": 9,
                    sort: "rating:desc",
                    populate: ["cover"],
                },
            });

            return { items: data.data, pagination: data.meta.pagination };
        } catch (error) {
            return error as Error;
        }
    }

    async getAnimesByTitle(title: string): Promise<AnimeCollection | Error> {
        try {
            const { data } = await api.get("/animes", {
                params: {
                    populate: ["cover"],
                    "pagination[page]": firstPage,
                    "pagination[pageSize]": 9,
                    sort: "rating:desc",
                    "filters[title][$containsi]": title,
                },
            });

            return { items: data.data, pagination: data.meta.pagination };
        } catch (error) {
            return error as Error;
        }
    }

    async getAnimeById(id: string) : Promise<Anime | Error> {
        try {
            const { data } = await api.get(`/animes/${id}`, {
                params: {
                    populate: ["cover", "comments.user"],
                },
            });

            return data.data;
        } catch (error) {
            return error as Error;
        }
    }

    async create(
        anime: Pick<Anime, "title" | "rating" | "description"> & {cover: File},
    ) : Promise<Anime | Error> {
        const userStore = useUserStore();

        const body = new FormData();
        body.append("files.cover", anime.cover);
        body.append("data", JSON.stringify(anime));

        try {
            const { data } = await api.post("/animes", body, {
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`,
                },
            });

            return data.data as Anime;
        } catch (error) {
            return error as Error;
        }
    }

    async update(
        anime: Pick<Anime, "id" | "title" | "rating" | "description">
        & {cover: File | undefined},
    ) : Promise <Anime | Error> {
        const userStore = useUserStore();

        let body: FormData | { data: typeof anime } = { data: anime };
        if(anime.cover) {
            body = new FormData();
            body.append("files.cover", anime.cover);
            body.append("data", JSON.stringify(anime));
        }

        try {
            const { data } = await api.put(`animes/${anime.id}`, body, {
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`,
                },
            });

            return data.data as Anime;
        } catch (error) {
            return error as Error;
        }
    }

    async remove(id: string) : Promise<Anime | Error> {
        try {
            const userStore = useUserStore();
            const { data } = await api.delete(`/animes/${id}/`, {
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`,
                },
            });

            return data.data as Anime;
        } catch (error) {
            return error as Error;
        }
    }
}

export function useAnimeService() {
    return new AnimeService;
}