import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView as _SafeAreaView} from 'react-native-safe-area-context';

export const SafeAreaView: React.FC = props => {
  return (
    <_SafeAreaView
      // workaround: ios top edge extra padding issue
      // https://github.com/th3rdwave/react-native-safe-area-context/issues/167
      edges={['top', 'bottom', 'left', 'right']}
      style={styles.root}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
});
