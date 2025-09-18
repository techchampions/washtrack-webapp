import { itemsService } from "@/services/items.service";
import { useQuery } from "@tanstack/react-query";

export interface Service {
  id: number;
  service_name: string;
  item_id: number;
  price: number;
  estimated_hours: number;
}

export interface ItemType {
  id: number;
  store_id: number;
  name: string;
  services: Service[];
}

export interface ItemTypeResponse {
  success: boolean;
  message: string;
  itemType: ItemType[];
}

export const useGetItemService = () => {
  return useQuery<ItemTypeResponse>({
    queryKey: ["items"],
    queryFn: itemsService.getItems,
  });
};
