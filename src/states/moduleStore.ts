import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Module {
  id: string;
  jobPK: string;
  filePath: string;
  status: 'loading' | 'loaded' | 'error';
}

type State = {
  modules: Module[];
};

type Actions = {
  addModule: (module: Module) => void;
  updateModuleStatus: (
    id: string,
    status: 'loading' | 'loaded' | 'error',
  ) => void;
  removeModule: (id: string) => void;
  updateJobPK: (id: string, jobPK: string) => void;
};

export const useModuleStore = create<State & Actions>()(
  immer(set => ({
    modules: [],

    addModule: (module: Module) => {
      set(state => {
        state.modules.push(module);
      });
    },

    updateModuleStatus: (
      id: string,
      status: 'loading' | 'loaded' | 'error',
    ) => {
      set(state => {
        const module = state.modules.find(m => m.id === id);
        if (module) {
          module.status = status;
        }
      });
    },

    removeModule: (id: string) => {
      set(state => {
        state.modules = state.modules.filter(m => m.id !== id);
      });
    },

    updateJobPK: (id: string, jobPK: string) => {
      set(state => {
        const module = state.modules.find(m => m.id === id);
        if (module) {
          module.jobPK = jobPK;
        }
      });
    },
  })),
);
