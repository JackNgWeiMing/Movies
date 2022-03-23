/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import store from './src/redux/store';
import {Router} from './src/Router';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
