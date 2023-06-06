export interface Pagination {
    page: number,
    pageCount: number,
    pageSize: number,
    total: number
}

export interface User {
    id: string,
    username: string,
    email: string,
    role: {
        type: string
    }
}

export interface Anime {
    title: string,
    rating: number,
    description: string,
    cover: {
        url: string
    }
    id: string
}

export interface AnimeCollection {
    items: Anime[],
    pagination: Pagination
}