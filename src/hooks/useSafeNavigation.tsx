import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignIn: undefined;
  MovieList: undefined;
  MovieDetail: {movieId: string};
};

type RootStackParam = NativeStackNavigationProp<RootStackParamList>;

export const useSafeNavigation = () => {
  const navigation = useNavigation<RootStackParam>();

  return navigation;
};
