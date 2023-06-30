import { api } from "../baseConfig";
import { useUserStore } from "../stores/userStore";
import { Assessment, AssessmentCollection } from "../types";
const firstPage = 1;

class AssessmentService {
    async create(
        userId: string,
        animeId: string,
        personalRating: number,
    ) : Promise<Assessment|Error> {
        const userStore = useUserStore();

        try {
            const { data } = await api.post("/assessments", {
                data: {
                    personalRating: personalRating,
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

    async update(
        animeId: string,
        userId: string,
        newPersonalRating: number,
    ): Promise<Assessment | Error> {
        const userStore = useUserStore();

        try {
            const assessment = await this.getByAnime(animeId, userId);

            if (!(assessment instanceof Error)) {
                assessment.personalRating = newPersonalRating;
                const updatedAssessment = {
                    id: assessment.id,
                    personalRating: assessment.personalRating,
                    anime: assessment.anime,
                    user: assessment.user,
                };

                const { data } = await api.put(`/assessments/${assessment.id}`,
                    { data: updatedAssessment }, {
                        headers: {
                            Authorization: `Bearer ${userStore.jwt}`,
                        },
                    },
                );

                return data.data as Assessment;
            }

            return assessment;
        } catch (error) {
            return error as Error;
        }
    }

    async getByAnime(
        animeId: string,
        userId: string,
    ) : Promise<Assessment | Error> {
        const userStore = useUserStore();

        try {
            const { data } = await api.get("/assessments", {
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`,
                },
                params: {
                    populate: ["user", "anime"],
                    "filters[user][id][$eq]": userId,
                    "filters[anime][id][$eq]": animeId,
                },
            });

            return data.data[0];
        } catch (error) {
            return error as Error;
        }
    }

    async getAllByUser(
        userId: string,
        page = firstPage,
    ) : Promise<AssessmentCollection | Error> {
        const userStore = useUserStore();

        try {
            const { data } = await api.get("/assessments", {
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`,
                },
                params: {
                    populate: ["user", "anime.cover"],
                    "pagination[page]": page,
                    "pagination[pageSize]": 9,
                    "filters[user][id][$eq]": userId,
                    sort: "personalRating:desc",
                },
            });

            return { items: data.data, pagination: data.meta.pagination };
        } catch (error) {
            return error as Error;
        }
    }

    async getAssessmentsByTitle(
        userId: string,
        title: string,
        page = firstPage,
    ): Promise<AssessmentCollection | Error> {
        const userStore = useUserStore();

        try {
            const { data } = await api.get("/assessments", {
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`,
                },
                params: {
                    populate: ["user", "anime.cover"],
                    "pagination[page]": page,
                    "pagination[pageSize]": 9,
                    "filters[user][id][$eq]": userId,
                    "filters[anime][title][$containsi]": title,
                    sort: "personalRating:desc",
                },
            });

            return { items: data.data, pagination: data.meta.pagination };
        } catch (error) {
            return error as Error;
        }
    }

    async remove(assesmentId: string) : Promise<Assessment | Error> {
        try {
            const userStore = useUserStore();
            const { data } = await api.delete(`/assessments/${assesmentId}`, {
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`,
                },
            });

            return data.data as Assessment;
        } catch (error) {
            return error as Error;
        }
    }
}

export function useAssessmentService() {
    return new AssessmentService;
}