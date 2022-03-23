import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen} from './screens/SignIn/SignInScreen';
import {MovieListScreen} from './screens/MovieList/MovieListScreen';

const Stack = createNativeStackNavigator();

export const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="MovieList" component={MovieListScreen} />
    </Stack.Navigator>
  );
};
