import apiClient from "@/api/apiClient";
interface Payload {
  service_name: string;
  no_of_items: number;
  item_type: string;
  photos?: File[];
}
class OrderService {
  async addItem(data: Payload) {
    const response = await apiClient.post(`/api/create/item`, data);
    return response;
  }
  async addNewItem(data: FormData) {
    const response = await apiClient.post(`/api/create/item`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  }
  async updateItem(data: Payload) {
    const response = await apiClient.post(`/api/upate/item`, data);
    return response;
  }
  async updateItem2(data: FormData) {
    const response = await apiClient.post(`/api/upate/item`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  }
  async deleteItem(id: number | string) {
    const payload = {
      id: id.toString(),
    };
    const response = await apiClient.post(`/api/delete/item`, payload);
    return response;
  }
}

export const orderService = new OrderService();
