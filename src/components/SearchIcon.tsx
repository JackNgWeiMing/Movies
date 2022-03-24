import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const SearchIcon = (props: SvgProps) => {
  return (
    <Svg width={40} height={40} fill="none" {...props}>
      <Path
        d="M18 8C12.489 8 8 12.489 8 18s4.489 10 10 10a9.947 9.947 0 006.322-2.264l5.971 5.971a1 1 0 101.414-1.414l-5.97-5.97A9.947 9.947 0 0028 18c0-5.511-4.489-10-10-10zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8z"
        fill="#000"
      />
    </Svg>
  );
};
