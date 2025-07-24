import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  surveyPK: string | null;
};

type Actions = {
  updateSurveyPK: (surveyPK: string) => void;
};

export const useSurveyStore = create<State & Actions>()(
  immer(set => ({
    surveyPK: null,

    updateSurveyPK: (surveyPK: string) => {
      set(state => {
        state.surveyPK = surveyPK;
      });
    },
  })),
);
