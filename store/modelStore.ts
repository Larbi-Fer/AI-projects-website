import { create } from 'zustand';

type ModelStoreProps = {
    model: ModelDetails | null;
    setModel: (newModel: ModelDetails) => void;
    clearModel: () => void;

    version: number
};

const useModelStore = create<ModelStoreProps>((set) => ({
  model: null,
  setModel: (newModel) => set({ model: newModel }),
  clearModel: () => set({ model: null }),
  version: 1
}));

export default useModelStore;