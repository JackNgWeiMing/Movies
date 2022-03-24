import React from 'react';
import {ActivityIndicator} from 'react-native';

interface Props {
  size?: number;
  color?: string;
}

export const Spinner = (props: Props) => {
  const {size, color} = props;
  return (
    <ActivityIndicator
      animating
      color={color}
      style={{width: size, height: size}}
    />
  );
};
