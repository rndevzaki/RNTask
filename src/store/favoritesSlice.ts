import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../utils/types';

interface FavoritesState {
  movies: Movie[];
}

const initialState: FavoritesState = {
  movies: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      if (!state.movies.some(movie => movie.title === action.payload.title)) {
        state.movies.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(movie => movie.title !== action.payload);
    },
    resetFavorites: (state) => {
      state.movies = [];
    },
  },
});

export const { addFavorite, removeFavorite,resetFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;