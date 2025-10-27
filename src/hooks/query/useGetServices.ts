import { Service, servicesService } from "@/services/services.service";
import { useQuery } from "@tanstack/react-query";
interface Response {
  message: string;
  status: boolean;
  service: Service[];
}
export const useGetServices = () => {
  return useQuery<Response>({
    queryKey: ["services"],
    queryFn: () => servicesService.getServices(1),
  });
};
