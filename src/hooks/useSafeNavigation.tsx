import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  SignIn: undefined;
  MovieList: undefined;
  MovieInfo: {movieId: string};
};

type RootStackParam = NativeStackNavigationProp<RootStackParamList>;

export const useSafeNavigation = () => {
  const navigation = useNavigation<RootStackParam>();

  return navigation;
};
