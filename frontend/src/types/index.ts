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
    id: string
    title: string,
    rating: number,
    description: string,
    cover: {
        url: string
    }
    comments: Comment[]
}

export interface AnimeCollection {
    items: Anime[],
    pagination: Pagination
}

export interface Comment {
    id: string,
    text: string,
    user: User
}

export interface Assessment {
    id: string,
    personalRating: number,
    anime: Anime,
    user: User
}

export interface AssessmentCollection {
    items: Assessment[],
}