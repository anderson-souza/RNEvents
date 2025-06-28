import eventBus from '../eventBus';

export const onSurveyCreated = async (parameters: string) => {
  console.log('🚀 ~ OnSurveyCreatedManager ~ parameters:', parameters);
  // Here you can add logic to handle the survey creation event
  // For example, you might want to update the state or notify other parts of your application
  // that a new survey has been created.

  await new Promise(resolve => setTimeout(resolve, 5000));

  eventBus.emit(
    'surveyPkCreated',
    'teste-22c473a6-f41f-4af2-b680-3f22f84e2591',
  );
};
