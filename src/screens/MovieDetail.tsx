// MovieDetailScreen.tsx
import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Movie, RootStackParamList } from '../utils/types';
import { RouteProp } from '@react-navigation/native';

type MovieDetailScreenRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

interface MovieDetailScreenProps {
  route: MovieDetailScreenRouteProp;
}

const MovieDetailScreen = ({ route }: MovieDetailScreenProps) => {
  const navigation = useNavigation();
  const { movie } = route.params;

  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={28}
          color="#333"
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
        />
        <Text style={styles.headerTitle}>Movie Details</Text>
      </View>

      {/* Poster */}
      <Image source={{ uri: movie.poster }} style={styles.poster} />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title and Rating */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{movie.rating?.toFixed(1)}</Text>
          </View>
        </View>

        {/* Metadata */}
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>{movie.year}</Text>
          <Text style={styles.metaSeparator}>•</Text>
          <Text style={styles.metaText}>{movie.runtime} mins</Text>
          <Text style={styles.metaSeparator}>•</Text>
          <Text style={styles.metaText}>{movie.country}</Text>
        </View>

        {/* Genre Tags */}
        <View style={styles.genreContainer}>
          {movie.genre?.map((genre, index) => (
            <View key={index} style={styles.genrePill}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>

        {/* Plot */}
        <Text style={styles.sectionTitle}>Storyline</Text>
        <Text style={styles.plotText}>{movie.plot}</Text>

        {/* Cast */}
        <Text style={styles.sectionTitle}>Cast</Text>
        <View style={styles.castContainer}>
          <Icon name="people" size={20} color="#666" style={styles.castIcon} />
          <Text style={styles.castText}>{movie.actors.join(', ')}</Text>
        </View>

        {/* Director */}
        <Text style={styles.sectionTitle}>Director</Text>
        <Text style={styles.directorText}>{movie.director}</Text>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Awards:</Text>
            <Text style={styles.infoValue}>{movie.awards}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Box Office:</Text>
            <Text style={styles.infoValue}>{movie.boxOffice}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Language:</Text>
            <Text style={styles.infoValue}>{movie.language}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backIcon: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  poster: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  metaSeparator: {
    marginHorizontal: 8,
    color: '#666',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  genrePill: {
    backgroundColor: '#E91E63',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  plotText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
  },
  castContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  castIcon: {
    marginRight: 8,
  },
  castText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  directorText: {
    fontSize: 16,
    color: '#E91E63',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#444',
    flex: 1,
    marginLeft: 16,
    textAlign: 'right',
  },
});

export default MovieDetailScreen;