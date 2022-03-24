import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {omdbAPI, GetMovieListAPIResponse} from '../../apis';
import {SafeAreaView} from '../../components/SafeAreaView';
import {MovieItem} from './MovieItem';

export function MovieListScreen() {
  const [movieData, setMovieData] =
    React.useState<GetMovieListAPIResponse | null>(null);

  /*
   * TODO: directly load the movie when the app start
   */
  React.useEffect(() => {
    omdbAPI.getMovieList({keyword: ''}).then(data => {
      console.log(data);
      setMovieData(data);
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.movieList}>
          {movieData?.Search.map(movie => {
            return <MovieItem movie={movie} />;
          })}
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
});
