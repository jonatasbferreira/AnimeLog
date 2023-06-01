import { api } from "../baseConfig";

export interface Anime {
    title: string,
    rating: number,
    description: string,
    cover: {
        url: string
    }
    id: string
}

export interface Pagination {
    page: number,
    pageCount: number,
    pageSize: number,
    total: number
}

export interface AnimeCollection {
    items: Anime[],
    pagination: Pagination
}

class AnimeService {
    async get(): Promise<AnimeCollection> {
        const { data } = await api.get("/animes", {
            params: {
                populate: ["cover"],
            },
        });
        //const { data } = await api.get("/animes");
        return { items: data.data, pagination: data.meta.pagination };
    }

    async getAnimeById(id: string) : Promise<Anime> {
        const { data } = await api.get(`/animes/${id}`, {
            params: {
                populate: ["cover"],
            },
        });

        return data.data;
    }
}

export function useAnimeService() {
    return new AnimeService;
}