import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GetMovieByIdResponse, omdbAPI} from '../../apis';
import {RootStackParamList} from '../../hooks/useSafeNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;
export function MovieDetailScreen(props: Props) {
  const {route} = props;
  const {movieId} = route.params;
  const [response, setResponse] = React.useState<GetMovieByIdResponse | null>(
    null,
  );

  React.useEffect(() => {
    omdbAPI
      .getMovieListById(movieId)
      .then(responseData => {
        setResponse(responseData);
      })
      .catch(() => {
        setResponse(null);
      });
  }, [movieId]);

  return (
    <SafeAreaView style={styles.root}>
      <Text>{response?.Title}</Text>
      <Text>This is movie Info {movieId}</Text>
      <Text>This is movie Info {response?.Rated}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  input: {
    height: 40,
    borderWidth: 1,
  },
});
