import { staffServices } from "@/services/staff.service";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffServices.createStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["staffs"],
      });
      showSuccess("Added Staff successfully");
    },
    onError(error: AxiosError<CreateStaffErrorResponse>) {
      console.log(error);
      // const errorMessage = error.response?.data.message.message;
      // console.log("errorMess", errorMessage);
      // if (errorMessage) {
      //   // Object.entries(errorMessage).forEach(([field, messages]) => {
      //   //   if (Array.isArray(messages) && messages.length > 0) {
      //   //     showError(`${field}...${messages[0]}`);
      //   //   }
      //   // });
      //   showError(errorMessage);
      // } else {
      //   showError("Failed to add Staff");
      // }
    },
  });
};
export const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffServices.updateStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["staffs"],
      });
      showSuccess("Updated Staff successfully");
    },
    onError(error: AxiosError<ErrorResponse>) {
      const errorMessage = error.response?.data.message;
      if (errorMessage) {
        showError(errorMessage);
      } else {
        showError("Failed to update Staff");
      }
    },
  });
};
export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffServices.deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["staffs"],
      });
      showSuccess("Deleted staff successfully");
    },
    onError(error: AxiosError<ErrorResponse>) {
      const errorMessage = error.response?.data.message;
      if (errorMessage) {
        showError(errorMessage);
      } else {
        showError("Failed to delete staff");
      }
    },
  });
};
