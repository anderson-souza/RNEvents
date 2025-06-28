import mitt, { Emitter } from 'mitt';

export type SurveyEvents = {
  moduleOpen: string;
  createSurvey: string;
  surveyCreated: string;
  surveyPkCreated: string;
  photoTaken: string;
  preProcessFinished: string[];
  uploadCompleted: string;
};

const eventBus: Emitter<SurveyEvents> = mitt<SurveyEvents>();
Object.freeze(eventBus);
export default eventBus;
