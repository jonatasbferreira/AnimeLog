import { api } from "../baseConfig";
import { useUserStore } from "../stores/userStore";
import { Assessment } from "../types";

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
                    personal_rating: personalRating,
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
}

export function useAssessmentService() {
    return new AssessmentService;
}