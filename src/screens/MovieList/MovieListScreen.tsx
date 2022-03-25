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
  const scrollRef =
    React.useRef<ScrollView>() as React.MutableRefObject<ScrollView>;
  const {status, isEnded, responses, errorMessage, searchParams} =
    useSearchState();

  /**
   * Onmount load initial data
   */
  React.useEffect(() => {
    dispatch(searchThunk({title: ''})); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * When change search titel , auto scroll to top
   */
  React.useEffect(() => {
    scrollRef.current.scrollTo({
      y: 0,
      animated: true,
    });
  }, [searchParams.title]);

  /**
   * Load next page using existing keyword
   */
  const loadNextPage = () => {
    dispatch(nextPageThunk());
  };

  return (
    <SafeAreaView hideTop>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.movieList}>
          {responses
            .flatMap(res => res.Search)
            .map(movie => {
              return <MovieItem key={movie.imdbID} movie={movie} />;
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
              onPress={loadNextPage}>
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
