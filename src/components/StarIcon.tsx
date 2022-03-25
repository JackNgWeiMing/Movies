import * as React from 'react';
import {Image, StyleSheet} from 'react-native';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

export function StarIcon() {
  return (
    <Image
      source={require('../images/star.png')}
      style={styles.root}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  root: {width: 15, height: 15},
});

export default StarIcon;
