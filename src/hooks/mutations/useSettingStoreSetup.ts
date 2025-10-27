import { onboardingService } from "@/services/onboarding.service";
import { useOnboardingStore } from "@/store/onboarding.store";
import { showSuccess } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSettingStoreSetup = () => {
  const queryClient = useQueryClient();
  const { setStore } = useOnboardingStore();

  return useMutation({
    mutationFn: onboardingService.createEstore,
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        queryClient.invalidateQueries({
          queryKey: ["user-store"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user-profile"],
        });
        setStore(response.data["store details"]);
        console.log(response.data.message, "in create store");
        showSuccess(response.data.message);
      }
    },
  });
};
