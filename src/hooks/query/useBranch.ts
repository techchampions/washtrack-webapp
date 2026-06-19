import { branchServices } from "@/services/branches.service";
import { staffServices } from "@/services/staff.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllBranches = (id?: number) => {
  return useQuery<ApiResponse<Branch[]>>({
    queryKey: ["branches"],
    queryFn: () => branchServices.getAllBranches(id),
    enabled: !!id,
  });
};
export const useGetAllStaff = () => {
  return useQuery<ApiResponse<Staff[]>>({
    queryKey: ["staffs"],
    queryFn: staffServices.getAllStaff,
  });
};
