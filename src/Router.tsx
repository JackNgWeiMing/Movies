import React from 'react';
import {SignInScreen} from './screens/SignIn/SignInScreen';
import {MovieListScreen} from './screens/MovieList/MovieListScreen';
import {MovieDetailScreen} from './screens/MovieDetail/MovieDetailScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SearchModal from './components/SearchModal';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CustomDrawerContent} from './components/CustomDrawerContent';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export const Router = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="MovieList"
          component={() => {
            return (
              <Drawer.Navigator drawerContent={CustomDrawerContent}>
                <Drawer.Screen
                  name="MovieList"
                  component={MovieListScreen}
                  options={{
                    title: 'Amazing Movies',
                    headerShown: true,
                    headerRight: _props => <SearchModal />,
                  }}
                />
              </Drawer.Navigator>
            );
          }}
        />
        <Stack.Screen name="SignIn" component={SignInScreen} />

        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </>
  );
};
