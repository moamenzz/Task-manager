import { create } from "zustand";

interface UIStore {
  activePage:
    | "All Tasks"
    | "Completed Tasks"
    | "Pending Tasks"
    | "Overdue Tasks";
  setActivePage: (
    page: "All Tasks" | "Completed Tasks" | "Pending Tasks" | "Overdue Tasks"
  ) => void;
}

const useUIStore = create<UIStore>((set) => ({
  activePage: "All Tasks",
  setActivePage: (
    page: "All Tasks" | "Completed Tasks" | "Pending Tasks" | "Overdue Tasks"
  ) => set({ activePage: page }),
}));

export default useUIStore;
