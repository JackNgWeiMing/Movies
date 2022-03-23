import * as React from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Container} from '../../components';

export function MovieListScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <Container>
        <Text>Movie List Screen</Text>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
  },
});
