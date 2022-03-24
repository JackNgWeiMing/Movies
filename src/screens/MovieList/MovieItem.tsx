import React from 'react';
import {
  useWindowDimensions,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {Movie} from '../../apis';
import {useSafeNavigation} from '../../hooks/useSafeNavigation';

interface Props {
  movie: Movie;
}
export const MovieItem: React.FC<Props> = React.memo(props => {
  const {movie} = props;
  const dimension = useWindowDimensions();
  const navigation = useSafeNavigation();

  const onPress = React.useCallback(() => {
    navigation.navigate('MovieDetail', {
      movieId: movie.imdbID,
      preloadData: {
        poster: movie.Poster,
        title: movie.Title,
      },
    });
  }, [movie.Poster, movie.Title, movie.imdbID, navigation]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.root, {width: dimension.width / 2.5}]}>
      <Image
        resizeMode="contain"
        defaultSource={require('../../images/image-fallback.png')}
        source={{uri: movie.Poster}}
        style={[styles.movieImage]}
      />
      <Text style={{fontSize: 18}}>{movie.Title}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  movieImage: {
    width: '100%',
    height: 250,
    marginBottom: 5,
  },
});
