import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ImageBackground,
  View,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {GetMovieByIdResponse, omdbAPI} from '../../apis';
import {RootStackParamList} from '../../hooks/useSafeNavigation';
import {Container} from '../../components';
import {MovieField} from './components/MovieField';
import {SafeAreaView} from '../../components/SafeAreaView';
import {Spinner} from '../../components/Spinner';
import {PreviewVideo} from './components/PreviewVideo';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;
export function MovieDetailScreen(props: Props) {
  const {route} = props;
  const {movieId, preloadData} = route.params;
  const [loading, setLoading] = React.useState(false);
  const {height, width} = useWindowDimensions();
  const [response, setResponse] = React.useState<GetMovieByIdResponse | null>(
    null,
  );
  const isFocused = useIsFocused();

  /**
   * Clear response data when this screen in unfocus
   * so that user won't see stale images and info
   */
  React.useEffect(() => {
    if (isFocused) {
      setResponse(null);
    }
  }, [isFocused]);

  /**
   * Fetch movie on movieId update
   */
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
    <SafeAreaView hideTop>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ImageBackground
          resizeMode="contain"
          defaultSource={require('../../images/image-fallback.png')}
          style={{
            width: width,
            height: Math.min(height / 2, 400),
          }}
          source={{
            uri: response ? response.Poster : preloadData.poster,
          }}
        />
        <View style={styles.header}>
          <View style={{flexGrow: 1, flexShrink: 1}}>
            <Text style={{fontSize: 18}}>
              {response?.Title || preloadData.title}
            </Text>
            <Text style={{fontSize: 16}}>{response?.Year}</Text>
          </View>
          <PreviewVideo />
        </View>

        {response ? (
          <>
            {/* Categories , Run Time , Rating */}
            <View>
              <Container
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{textTransform: 'capitalize'}}>
                  {response.Type}
                </Text>
                <Text>{response.Runtime}</Text>
                <Text>{response.imdbRating} </Text>
              </Container>
            </View>

            {/* Sypnopsis */}
            <Container>
              <Text style={{lineHeight: 20}}>
                <Text style={{fontWeight: 'bold'}}>Synopsis {'    '}</Text>
                {response.Plot}
              </Text>
            </Container>

            {/* Statistic */}
            <Container style={styles.statisticWrapper}>
              {[
                {
                  title: 'Score',
                  value: response.Metascore,
                },
                {
                  title: 'Reviews',
                  value: response.imdbVotes,
                },
                {
                  title: 'Popularity',
                  value: response.imdbVotes,
                },
              ].map(item => {
                return (
                  <View style={{paddingHorizontal: 10}}>
                    <Text>{item.title}</Text>
                    <Text style={{textAlign: 'center'}}>{item.value}</Text>
                  </View>
                );
              })}
            </Container>

            {/* Other Info */}
            <Container>
              <MovieField title="Director" value={response.Director} />
              <MovieField title="Writer" value={response.Writer} />
              <MovieField title="Actors" value={response.Actors} />
            </Container>
          </>
        ) : (
          // Show Loading Spinner
          <View style={styles.spinnerWrapper}>
            <Spinner />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  input: {
    height: 40,
    borderWidth: 1,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    backgroundColor: '#e9e9e9',
  },
  playIconWrapper: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statisticWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  scrollViewContainer: {paddingBottom: 50},
  spinnerWrapper: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
