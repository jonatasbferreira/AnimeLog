import { api } from "../baseConfig";
import { useUserStore } from "../stores/userStore";
import { Assessment, AssessmentCollection } from "../types";

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

    async getByAnime(
        animeId: string,
        userId: string,
    ) : Promise<Assessment|Error> {
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

    async getAllByUser(userId: string) : Promise<AssessmentCollection|Error> {
        const userStore = useUserStore();

        try {
            const { data } = await api.get("/assessments", {
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`,
                },
                params: {
                    populate: ["user", "anime.cover"],
                    "filters[user][id][$eq]": userId,
                },
            });

            return { items: data.data };
        } catch (error) {
            return error as Error;
        }
    }

    async remove(assesmentId: string) : Promise<Assessment|Error> {
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