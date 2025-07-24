import React, { useEffect } from 'react';
import eventBus from './eventBus';
import {
  onCreateSurvey,
  onModuleOpen,
  onSurveyCreated,
  onSurveyPkCreated,
} from './managers';

export const useEventManager = () => {
  useEffect(() => {
    eventBus.on('moduleOpen', param => onModuleOpen(param));
    console.log('1 - moduleOpen event listener added');

    eventBus.on('createSurvey', param => onCreateSurvey(param));
    console.log('2 - createSurvey event listener added');

    eventBus.on('surveyCreated', param => onSurveyCreated(param));
    console.log('3 - surveyCreated event listener added');

    eventBus.on('surveyPkCreated', param => onSurveyPkCreated(param));
    console.log('4 - surveyPkCreated event listener added');

    return () => {
      console.log('Cleaning up event listeners');
      eventBus.all.clear(); // Clear all listeners
      eventBus.off('moduleOpen');
      eventBus.off('createSurvey');
      eventBus.off('surveyCreated');
    };
  }, []);
};
