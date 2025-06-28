import React, { useEffect } from 'react';
import eventBus from './eventBus';
import { onModuleOpen } from './managers/onModuleOpenManager';
import { onCreateSurvey } from './managers/onCreateSurvey';
import { onSurveyCreated } from './managers/onSurveyCreated';
import { onSurveyPkCreated } from './managers/onSurveyPkCreated';

export const useEventManager = () => {
  useEffect(() => {
    eventBus.on('moduleOpen', param => onModuleOpen(param));
    console.log('moduleOpen event listener added');

    eventBus.on('createSurvey', param => onCreateSurvey(param));
    console.log('createSurvey event listener added');

    eventBus.on('surveyCreated', param => onSurveyCreated(param));
    console.log('surveyCreated event listener added');

    eventBus.on('surveyPkCreated', param => onSurveyPkCreated(param));
    console.log('surveyPkCreated event listener added');

    return () => {
      console.log('Cleaning up event listeners');
      eventBus.all.clear(); // Clear all listeners
      eventBus.off('moduleOpen');
      eventBus.off('createSurvey');
      eventBus.off('surveyCreated');
    };
  }, []);
};
