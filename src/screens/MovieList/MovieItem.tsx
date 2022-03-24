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
    });
  }, [movie.imdbID, navigation]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.root,
        {
          width: dimension.width / 2.5,
        },
      ]}>
      <Image
        resizeMode="contain"
        source={{uri: movie.Poster}}
        style={[styles.movieImage]}
      />
      <Text>{movie.Title}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'pink',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  movieImage: {
    width: '100%',
    height: 250,
    marginBottom: 5,
  },
});
