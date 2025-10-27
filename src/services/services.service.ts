import apiClient from "@/api/apiClient";


export interface Service {
    id: number;
    store_id: number;
    user_id: number;
    name: string;
    price: string;
    estimated_hours: number;
    created_at: string;
    updated_at: string;
}
export interface IServices {
    name: string;
    price?: number;
    estimated_hours?: number;
    service_type?: number;
}
export interface EditServices {
    id?:number;
    name: string;
    price: number;
    estimated_hours: number;
}
export interface DeleteServices {
    id?:number;
}

class Services {


    async getServices (type: number)  {
        const response = await apiClient.get(`/api/service/${type}`);
        return response.data;
    }
    async addServices (data: IServices) {
        const response = await apiClient.post(`/api/create/service`, data);
        return response;
    }

    async updateServices(data: EditServices) {
        const response = await apiClient.post(`/api/upate/service`, data);
        return response;
    }
    async deleteServices (data: DeleteServices) {
        const response = await apiClient.post(`/api/delete/service`, data);
        return response;
    }
}

export const  servicesService = new Services();
