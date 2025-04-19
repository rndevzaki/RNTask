import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Movie, RootStackParamList } from '../utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';

type MovieCardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MovieListScreen'>;
const MovieCard = ({ movie }: { movie: Movie }) => {
    const navigation = useNavigation<MovieCardNavigationProp>();
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.movies);
    const isFavorite = favorites.some(fav => fav.title === movie.title);
  
    const handleFavoritePress = () => {
      if (isFavorite) {
        dispatch(removeFavorite(movie.title));
      } else {
        dispatch(addFavorite(movie));
      }
    };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetail', { movie })}
    >
        <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={handleFavoritePress}
      >
        <Icon 
          name={isFavorite ? 'favorite' : 'favorite-border'} 
          size={24} 
          color="#E91E63" 
        />
      </TouchableOpacity>

      <Image source={{ uri: movie.poster }} style={styles.poster} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{movie.rating?.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailText}>{movie.year} • {movie.runtime} mins</Text>
          <Text style={styles.director} numberOfLines={1}>Dir: {movie.director}</Text>
        </View>

        <View style={styles.genreContainer}>
          {movie.genre?.map((genre, index) => (
            <View key={index} style={styles.genrePill}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.cast} numberOfLines={1}>
            <Icon name="people" size={14} color="#666" /> {movie.actors?.join(', ')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  poster: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  content: {
    paddingHorizontal: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  rating: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#666',
  },
  details: {
    marginBottom: 8,
  },
  detailText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  director: {
    color: '#E91E63',
    fontSize: 14,
    fontStyle: 'italic',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  genrePill: {
    backgroundColor: '#E91E63',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  genreText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 8,
  },
  cast: {
    color: '#666',
    fontSize: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 2,
    padding: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

export default MovieCard;