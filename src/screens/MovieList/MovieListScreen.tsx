import * as React from 'react';
import {StyleSheet, View, ScrollView, Button} from 'react-native';
import {SafeAreaView} from '../../components/SafeAreaView';
import {useAppDispatch, useRootState} from '../../redux';
import {nextPageThunk, searchThunk} from '../../redux/reducer/searchSlice';
import {MovieItem} from './MovieItem';

export function MovieListScreen() {
  const dispatch = useAppDispatch();
  const {search: searchState} = useRootState();

  /*
   * TODO: directly load the movie when the app start
   */
  React.useEffect(() => {
    dispatch(searchThunk({title: ''}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.movieList}>
          {searchState.responses
            .flatMap(res => res.Search)
            .map(movie => {
              return <MovieItem movie={movie} />;
            })}
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title={'Load More'}
            onPress={() => {
              dispatch(nextPageThunk());
            }}
          />
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
  },
  scrollViewContainer: {
    paddingBottom: 20,
  },
});
