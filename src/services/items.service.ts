import apiClient from "@/api/apiClient";

export interface IItemService {
  item_name: string;
  services: Service[];
}
export interface Service {
  service_name: string;
  price: number;
  estimated_hours: number;
  service_id: number;
}
export interface UpdateItem {
  id: number;
  item_id: number;
  user_id: number;
  store_id: number;
  item_name: string;
  service_id: number;
  price: number;
  estimated_hours: number;
  service_name: string;
}

class ItemsService {
  async postItem(data: IItemService) {
    const response = await apiClient.post(`/api/item-services/create`, data);
    return response;
  }

  async getItems() {
    const response = await apiClient.get(`/api/estore/get-item-service`);
    return response.data;
  }
  async getItem(id: string) {
    const response = await apiClient.get(`/api/item-services/${id}`);
    return response.data;
  }

  async updateItem(data: UpdateItem[]) {
    const response = await apiClient.put(`/api/item-services/update`, data);
    return response;
  }
}

export const itemsService = new ItemsService();
