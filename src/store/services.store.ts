import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Service } from '@/services/services.service';

interface ServicesState {
    services: Service[];
  error?: string | null;
}
interface ServicesActions {
    setServices: (data) => void;
 }

type ServicesStore = ServicesState & ServicesActions;

const initialState: ServicesState = {
    services: [], 
};

export const useServicesStore = create<ServicesStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setServices: (services) => {
        console.log("___________services store_______", services);
        set({services: services});
      },

      }),
    {
      name: 'services-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        services: state.services,
            }),
    }
  )
);
