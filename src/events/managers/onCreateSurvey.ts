import { CreateSurvey } from '../../taskmanager/CreateSurvey';
import { TaskManager } from '../../taskmanager/TaskManager';
import eventBus from '../eventBus';

export const onCreateSurvey = async (parameters: string) => {
  console.log('🚀 ~ OnCreateSurveyManager ~ parameters:', parameters);
  // Here you can add logic to handle the creation of a survey
  // For example, you might want to initialize some state or make an API call
  // to create a new survey in your backend.

  // create a simple timeout to simulate an async operation
  TaskManager.getInstance().addTask(
    new CreateSurvey('survey-12345', 'New Survey', 'This is a new survey'),
  );

  eventBus.emit(
    'surveyCreated',
    JSON.stringify({
      surveyId: 'survey-12345',
      timestamp: new Date().toISOString(),
      parameters: JSON.parse(parameters),
    }),
  );
};
