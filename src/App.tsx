/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import eventBus from './events/eventBus';
import { useEventManager } from './events/useEventManager';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEventManager();

  useEffect(() => {
    console.log('App mounted, emitting moduleOpen event');
    eventBus.emit('moduleOpen', 'App.tsx');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NewAppScreen templateFileName="App.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
