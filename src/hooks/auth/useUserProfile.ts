import { useQuery } from "@tanstack/react-query";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useUserProfile() {
  const { token, setAuthObject, setOtpVerified, setPlan, setStore } =
    useAuthStore();
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await authService.getProfile();
      console.log(res, "_____get user  profile_____");
      console.log(
        "does it include:  ",
        res.message.includes("Unverified Email Address")
      );
      if (res.message.includes("Unverified Email Address")) {
        setOtpVerified(false);
        return res;
      }

      setAuthObject({
        user: res.user,
        plan: res.user.plan,
        store: res.user.store,
      });
      setPlan(res.plan);
      setStore(res.store);
      return res;
    },
    enabled: !!token,
  });
}
