import { create } from "zustand";

interface DialogState {
  dialog: boolean;
  setDialog: () => void;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>()((set) => ({
  dialog: false,
  setDialog: () => set((state) => ({ dialog: !state.dialog })),
  openDialog: () => set({ dialog: true }),
  closeDialog: () => set({ dialog: false }),
}));
