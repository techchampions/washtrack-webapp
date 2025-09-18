import apiClient from "@/api/apiClient";

class OrderService {
  async addItem(data: any) {
    const response = await apiClient.post(`/api/create/item`, data);
    return response;
  }
}

export const orderService = new OrderService();
