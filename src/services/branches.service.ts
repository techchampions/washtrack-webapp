import apiClient from "@/api/apiClient";

class BranchServices {
  async getAllBranches(id?: number) {
    const response = await apiClient.get(`/api/stores/${id}/branches`);
    return response.data;
  }
  async deleteBranch(id: number) {
    const response = await apiClient.delete(`/api/stores/branches/${id}`);
    return response.data;
  }
  async createBranch(payload: CreateBranchPayload) {
    const formData = new FormData();
    if (payload.store_name && payload.phone) {
      formData.append("store_name", payload.store_name);
      formData.append("phone", String(payload.phone));
      formData.append("description", payload.description);
    }
    if (payload.parent_store_id) {
      formData.append("parent_store_id", String(payload.parent_store_id));
    }
    if (payload.store_location && payload.state && payload.country) {
      formData.append("store_location", payload.store_location);
      formData.append("state", payload.state);
      formData.append("country", payload.country);
    }
    console.log(payload);
    const response = await apiClient.post(`/api/stores/branches`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
  async updateBranch(payload: UpdateBranchPayload) {
    const formData = new FormData();
    if (payload.store_name) {
      formData.append("store_name", payload.store_name);
    }
    if (payload.phone) {
      formData.append("phone", String(payload.phone));
    }
    if (payload.description) {
      formData.append("description", payload.description);
    }
    if (payload.store_location && payload.state && payload.country) {
      formData.append("store_location", payload.store_location);
      formData.append("state", payload.state);
      formData.append("country", payload.country);
    }
    console.log(payload);
    const response = await apiClient.post(
      `/api/stores/branches/${payload.branch_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
}

export const branchServices = new BranchServices();
