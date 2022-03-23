import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

export const Container: React.FC<ViewProps> = props => {
  const {style, children, ...rest} = props;
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
