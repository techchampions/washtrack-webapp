import apiClient from '@/api/apiClient';

class OnboardingService {
    async createEstore(dto: FormData) {
        const response = await apiClient.post('/api/profile/update', dto, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response;
    }
}

export const onboardingService = new OnboardingService();