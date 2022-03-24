import React from 'react';
import {SignInScreen} from './screens/SignIn/SignInScreen';
import {MovieListScreen} from './screens/MovieList/MovieListScreen';
import {MovieDetailScreen} from './screens/MovieDetail/MovieDetailScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SearchModal from './components/SearchModal';
const Drawer = createDrawerNavigator();

export const Router = () => {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="MovieList"
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen
          name="MovieList"
          component={MovieListScreen}
          options={{headerShown: true, headerRight: _props => <SearchModal />}}
        />
        <Drawer.Screen name="SignIn" component={SignInScreen} />
        <Drawer.Screen name="MovieDetail" component={MovieDetailScreen} />
      </Drawer.Navigator>
    </>
  );
};
