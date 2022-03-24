import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  title: string;
  value: string;
}

export const MovieField: React.FC<Props> = props => {
  const {title, value} = props;

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.displayText}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flexDirection: 'row', marginTop: 10},
  title: {width: 80},
  displayText: {flexShrink: 1, flexGrow: 1},
});
