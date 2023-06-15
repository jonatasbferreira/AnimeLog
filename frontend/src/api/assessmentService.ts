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

    async getByUser(userId: string) : Promise<AssessmentCollection|Error> {
        const userStore = useUserStore();

        try {
            const { data } = await api.get("/assessments", {
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`,
                },
                params: {
                    populate: ["user", "anime"],
                    "filters[user][id][$eq]": userId,
                },
            });

            return { items: data.data };
        } catch (error) {
            return error as Error;
        }
    }
}

export function useAssessmentService() {
    return new AssessmentService;
}