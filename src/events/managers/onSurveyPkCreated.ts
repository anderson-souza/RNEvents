import { useSurveyStore } from '../../states/surveyStore';

export const onSurveyPkCreated = (parameters: string) => {
  console.log('🚀 ~ OnSurveyPkCreatedManager ~ parameters:', parameters);
  useSurveyStore.getState().updateSurveyPK(parameters);
};
