import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {SafeAreaView} from '../../components/SafeAreaView';
import {Spinner} from '../../components/Spinner';
import {useAppDispatch, useSearchState} from '../../redux';
import {nextPageThunk, searchThunk} from '../../redux/reducer/searchSlice';
import {MovieItem} from './MovieItem';

export function MovieListScreen() {
  const dispatch = useAppDispatch();
  const {status, isEnded, responses, errorMessage} = useSearchState();

  /*
   * TODO: directly load the movie when the app start
   */
  React.useEffect(() => {
    dispatch(searchThunk({title: ''}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView hideTop>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.movieList}>
          {responses
            .flatMap(res => res.Search)
            .map(movie => {
              return <MovieItem movie={movie} />;
            })}
        </View>

        {errorMessage ? (
          <View style={styles.errorWrapper}>
            <Text>{errorMessage}</Text>
          </View>
        ) : null}

        <View style={styles.buttonWrapper}>
          {isEnded ? (
            <Text>No More to Load</Text>
          ) : (
            <TouchableOpacity
              disabled={status === 'loading'}
              style={styles.button}
              onPress={() => {
                dispatch(nextPageThunk());
              }}>
              {status === 'loading' && <Spinner />}
              <Text>Load More</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'pink',
    flex: 1,
  },
  movieList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonWrapper: {
    padding: 10,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#5ec3eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scrollViewContainer: {
    paddingBottom: 20,
  },
  errorWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
});
