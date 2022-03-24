import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GetMovieByIdResponse, omdbAPI} from '../../apis';
import {RootStackParamList} from '../../hooks/useSafeNavigation';
import {Container} from '../../components';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;
export function MovieDetailScreen(props: Props) {
  const {route} = props;
  const {movieId} = route.params;
  const [loading, setLoading] = React.useState(false);
  const {height, width} = useWindowDimensions();
  const [response, setResponse] = React.useState<GetMovieByIdResponse | null>(
    null,
  );

  React.useEffect(() => {
    setLoading(true);
    omdbAPI
      .getMovieListById(movieId)
      .then(responseData => {
        setLoading(false);
        setResponse(responseData);
      })
      .catch(() => {
        setLoading(false);
        setResponse(null);
      });
  }, [movieId]);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <Image
          resizeMode="contain"
          style={{width: width, height: Math.min(height / 2, 400)}}
          source={{
            uri: response ? response.Poster : '',
          }}
        />
        <Container>
          <Text>{response?.Title}</Text>
          <Text>{response?.Year}</Text>
        </Container>
        {response && (
          <>
            <Container>
              <Text>{response.Type}</Text>
              <Text>{response.Runtime}</Text>
              <Text>{response.Rated}</Text>
              <Text>{response.imdbRating}</Text>
            </Container>
            <Container>
              <Text>{response.Plot}</Text>
            </Container>
            <Container>
              <Text>{response.Metascore}</Text>
              {/* TODO: missing reviews & popularity */}
              {/* <Text>{response.Reviews}</Text> */}
              {/* <Text>{response.Popularit}</Text> */}
            </Container>
            <Container>
              <Text>{response.Director}</Text>
              <Text>{response.Writer}</Text>
              <Text>{response.Actors}</Text>
            </Container>
          </>
        )}
      </ScrollView>
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
