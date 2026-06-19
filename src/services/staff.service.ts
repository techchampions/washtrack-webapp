import apiClient from "@/api/apiClient";

class StaffServices {
  async getAllStaff() {
    const response = await apiClient.get(`/api/staff/all`);
    return response.data;
  }
  async deleteStaff(id: number) {
    const response = await apiClient.delete(`/api/staff/${id}`);
    return response.data;
  }
  async createStaff(payload: CreateStaffPayload) {
    const response = await apiClient.post(`/api/staff`, payload);
    return response.data;
  }
  async updateStaff(payload: UpdateStaffPayload) {
    const response = await apiClient.post(`/api/staff`, payload);
    return response.data;
  }
}

export const staffServices = new StaffServices();
