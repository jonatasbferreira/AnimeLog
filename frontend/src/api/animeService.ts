import { api } from "../baseConfig";
import { AnimeCollection, Anime } from "../types";

class AnimeService {
    async get(): Promise<AnimeCollection | Error> {
        try {
            const { data } = await api.get("/animes", {
                params: {
                    populate: ["cover"],
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
                    populate: ["cover"],
                },
            });

            return data.data;
        } catch (error) {
            return error as Error;
        }
    }
}

export function useAnimeService() {
    return new AnimeService;
}