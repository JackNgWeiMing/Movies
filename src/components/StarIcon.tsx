import * as React from 'react';
import {Image} from 'react-native';
import Svg, {G, Path, Defs, ClipPath, SvgProps} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

export function StarIcon() {
  return (
    <Image
      source={require('../images/star.png')}
      style={{width: 15, height: 15}}
      resizeMode="contain"
    />
  );
}

export default StarIcon;
