
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IItemService, itemsService } from '@/services/items.service';
import {} from '@/hooks/items/useItems'
import { useItemsStore } from '@/store/items.store';
import { useAuthStore } from '@/store/auth.store';

export const useCreateItem = () => {
const queryClient = useQueryClient();

    const createItemMutation = useMutation({
        mutationFn: itemsService.postItem,
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getItems"] });
    },
    });

    return {
        createItemMutation,
          };
}

export const useUpdateItem = () => {
    const queryClient = useQueryClient();
    const updateItemMutation = useMutation({
        mutationFn: itemsService.updateItem,
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getItems"] });
    },
    })
    return {
        updateItemMutation
    }
}

export function useGetItems() {
     const {token} = useAuthStore();

    const {setItems} = useItemsStore();
    return useQuery<IItemService,Error>({
        queryKey: ["getItems"],
        queryFn: async () => {
            const res = await itemsService.getItems();
            console.log(res, "_____get items_____")

            setItems(res);
            return res; 
        },
        enabled: !!token,
        retry: 3
    });
}

export function useGetItem(data: any) {
     const {token} = useAuthStore();

    // const {setItems} = useItemsStore();
    return useQuery<IItemService,Error>({
        queryKey: ["getItem", data],
        
        queryFn: async () => {
            const res = await itemsService.getItem(data);
            // setItems(res);
            return res; 
        },
        enabled: !!token
    });
}
