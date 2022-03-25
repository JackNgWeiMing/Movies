import {DrawerContentComponentProps} from '@react-navigation/drawer';
import React from 'react';
import {Button, Dimensions, StyleSheet, View} from 'react-native';
import {useSafeNavigation} from '../hooks/useSafeNavigation';
import {SafeAreaView} from './SafeAreaView';

const {height} = Dimensions.get('window');
export const CustomDrawerContent: React.FC<
  DrawerContentComponentProps
> = () => {
  return (
    <SafeAreaView>
      <View style={styles.root}>
        <LogoutButton />
      </View>
    </SafeAreaView>
  );
};

const LogoutButton = () => {
  const navigation = useSafeNavigation();
  return (
    <Button
      title="Logout"
      onPress={() => {
        navigation.replace('SignIn');
      }}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
