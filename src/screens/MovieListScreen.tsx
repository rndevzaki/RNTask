import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, TextInput, Text, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { fetchMovies } from '../services/movies';
import { Movie, RootStackParamList } from '../utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MovieCard from '../components/MovieCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { FontSizes } from '../styles/FontSizes';
import { logout } from '../services/auth';
import { useNavigation } from '@react-navigation/native';
type MovieCardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MovieListScreen'>;

const MovieListScreen = () => {

  const navigation = useNavigation<MovieCardNavigationProp>();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadMovies = async (pageNumber: number) => {
    try {
      const data = await fetchMovies(pageNumber);
      setMovies(prev => 
        pageNumber === 1 ? data : [...prev, ...data]
      );
      setHasMore(data.length >= 10);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    loadMovies(1);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && searchQuery === '') {
      setLoadingMore(true);
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    loadMovies(page);
  }, [page]);

  if (initialLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Retry" onPress={() => {
          setPage(1);
          loadMovies(1);
        }} />
      </View>
    );
  }
const Logout =()=>{
  logout();
  navigation.reset({
    index: 0,
    routes: [{ name: 'SignInScreen' }],
  });
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoutContainer}>
        <Text style={styles.logoutText} onPress={Logout}>Logout</Text>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search movies..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      <FlatList
        data={searchQuery ? filteredMovies : movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieCard movie={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" style={styles.loader} />
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No movies found{searchQuery ? ` for "${searchQuery}"` : ''}</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    fontSize: 16,
    elevation: 2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  loader: {
    marginVertical: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  logoutContainer:{
    flexDirection:'row',
    justifyContent:'flex-end',
    padding:15
  },
  logoutText:{fontWeight:'bold',
  fontSize:FontSizes.medium,
  color:'blue'}
});

export default MovieListScreen;