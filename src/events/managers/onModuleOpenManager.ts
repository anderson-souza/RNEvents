import eventBus from '../eventBus';

export const onModuleOpen = (parameters: string) => {
  console.log('🚀 ~ OnModuleOpenManager ~ parameters:', parameters);
  eventBus.emit(
    'createSurvey',
    JSON.stringify({
      moduleId: parameters,
      timestamp: new Date().toISOString(),
    }),
  );
};
