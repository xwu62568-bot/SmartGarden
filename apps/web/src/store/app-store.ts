import { create } from 'zustand';
import type { Role } from '../shared/types/app';

type AppStore = {
  selectedRole: Role | null;
  setSelectedRole: (role: Role) => void;
  clearSelectedRole: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  selectedRole: null,
  setSelectedRole: (role) => set({ selectedRole: role }),
  clearSelectedRole: () => set({ selectedRole: null }),
}));
