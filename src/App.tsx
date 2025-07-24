import { useCallback, useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import eventBus from './events/eventBus';
import { useEventManager } from './events/useEventManager';
import { useSurveyStore } from './states/surveyStore';
import { useModuleStore } from './states/moduleStore';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEventManager();

  useEffect(() => {
    console.log('App mounted, emitting moduleOpen event');
    eventBus.emit('moduleOpen', 'App.tsx');
  }, []);

  const currentSurveyPK = useSurveyStore(state => state.surveyPK);

  const addModule = useModuleStore(state => state.addModule);
  const modules = useModuleStore(state => state.modules);

  const addNewModule = useCallback(() => {
    console.log('Adding new module');
    addModule({
      id: 'newModule',
      jobPK: 'job123',
      filePath: 'path/to/module',
      status: 'loading',
    });
  }, [addModule]);

  useEffect(() => {
    console.log('Current Survey PK:', currentSurveyPK);
  }, [currentSurveyPK]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000' : '#F5FCFF'}
      />
      <Text>Current Survey PK {currentSurveyPK}</Text>
      <Button
        onPress={() => {
          console.log('Button pressed, emitting buttonClick event');
          addNewModule();
        }}
        title="Adicionar novo módulo"
      />
      <Text>
        {modules.map(it => {
          return `Module ID: ${it.id}, Status: ${it.status}, Job PK: ${it.jobPK}, File Path: ${it.filePath}\n`;
        })}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
