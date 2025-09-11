import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onboardingService } from "@/services/onboarding.service";
import { useOnboardingStore } from "@/store/onboarding.store";
import { showError, showSuccess } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export const useCreateStore = () => {
  const navigate = useNavigate();
  const { setStep, setStore } = useOnboardingStore();
  const { setUser } = useAuthStore();

  const mutation = useMutation({
    mutationFn: onboardingService.createEstore,
    onSuccess: (response) => {
      console.log("✅ Store setup success:", response.data);
      if (response.status === 200 || response.status === 201) {
        setStore(response.data["store details"]);
        setUser(response.data.user);
        console.log(response.data.message, "in create store");
        showSuccess(response.data.message);
        setStep("ADD_SERVICES");
        navigate("/onboarding/add-services-setup");
      }
    },
    onError: (error) => {
      console.error("❌ Create Store error:", error.response);
      showError(error.response.data.message);
    },
    onSettled: () => {
      console.log("🔁 Create store profile settled");
    },
  });
  return {
    ...mutation,
    createEstore: mutation.mutate,
    createEstoreAsync: mutation.mutateAsync,
  };
};

export const useSoosarCreateStore = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setStep, setStore } = useOnboardingStore();
  const { setUser } = useAuthStore();

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
        setUser(response.data.user);
        console.log(response.data.message, "in create store");
        showSuccess(response.data.message);
        setStep("ADD_SERVICES");
        navigate("/onboarding/add-services-setup");
      }
    },
  });
};
