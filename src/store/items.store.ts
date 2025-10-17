/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { EItemTypeService } from "@/types/GeneralTypes/estoreTypes";
export interface EItemTypes {
  id: number;
  name: string;
  store_id: number;
  services: EItemTypeService[];
}
// interface ItemI {
//     itemType: EItemTypes[]
// }
interface ItemsState {
  items: {};
  error?: string | null;
}
interface ItemsActions {
  setItems: (data: any) => void;
}

type ItemsStore = ItemsState & ItemsActions;

const initialState: ItemsState = {
  items: {},
};

export const useItemsStore = create<ItemsStore>()(
  persist(
    (set) => ({
      ...initialState,

      setItems: (data) => {
        console.log(data, "______inside store item____");

        set({
          items: {
            ...data,
          },
        });
      },

      resetItems: () => {
        localStorage.removeItem("items-storage");
      },
    }),
    {
      name: "items-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);
