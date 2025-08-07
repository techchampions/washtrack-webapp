import { useUserStore } from "../store/AppStore";

export const loadEverything = async () => {
  const { loadPlans, loadStore, loadItems, loadServices, loadOrders } =
    useUserStore.getState();

  await Promise.all([
    loadPlans(),
    loadStore(),
    loadItems(),
    loadServices(),
    loadOrders(),
  ]);
};
