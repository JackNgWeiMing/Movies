import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {omdbAPI, GetMovieListAPIResponse} from '../../apis';
import {useSafeNavigation} from '../../hooks/useSafeNavigation';

export function MovieListScreen() {
  const navigation = useSafeNavigation();
  const [movieData, setMovieData] =
    React.useState<GetMovieListAPIResponse | null>(null);

  const dimension = useWindowDimensions();

  /**
   * TODO: directly load the movie when the app start
   */
  React.useEffect(() => {
    omdbAPI.getMovieList({keyword: ''}).then(data => {
      console.log(data);
      setMovieData(data);
    });
  }, []);

  return (
    <SafeAreaView style={[styles.root]}>
      {/* <Container> */}
      <ScrollView>
        <Text>Movie List Screen {movieData?.totalResults}</Text>
        <View style={styles.movieList}>
          {movieData?.Search.map(movie => {
            return (
              <TouchableOpacity
                key={movie.imdbID}
                onPress={() => {
                  navigation.navigate('MovieDetail', {
                    movieId: movie.imdbID,
                  });
                }}
                style={{
                  width: dimension.width / 2.5,
                  backgroundColor: 'pink',
                  alignItems: 'center',
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  marginTop: 5,
                  marginBottom: 10,
                }}>
                <Image
                  resizeMode="contain"
                  source={{uri: movie.Poster}}
                  style={styles.moveiImage}
                />
                <Text>{movie.Title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
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
  movieList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moveiImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
});
