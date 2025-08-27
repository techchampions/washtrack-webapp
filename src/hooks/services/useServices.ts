
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Service, servicesService } from '@/services/services.service';
import { useServicesStore } from '@/store/services.store';


export const useAddServices = () => {
const queryClient = useQueryClient();

    const addServicesMutation = useMutation({
        mutationFn: servicesService.addServices,
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getServices"] });
    },
    });

    return {
        addServicesMutation,
          };
}

export const useUpdateService = () => {
    const queryClient = useQueryClient();

    const updateServiceMutation = useMutation({
        mutationFn: servicesService.updateServices,
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getServices"] });
    },
    })

    return {
        updateServiceMutation
    }
}
export const useDeleteService = () => {
    const queryClient = useQueryClient();

    const deleteServiceMutation = useMutation({
        mutationFn: servicesService.deleteServices,
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getServices"] });
    },
    })

    return {
        deleteServiceMutation
    }
}
export function useGetServices(type: number) {

    const {setServices} = useServicesStore();
    return useQuery<Service[], Error>({
        queryKey: ["getServices", type],
        queryFn: async () => {
            
            const res = await servicesService.getServices(type);
            setServices(res.service);
            return res.service; 
        },
       
        onError: (err) => {
            console.log(err, "____err get services___")
        }
    });
}

