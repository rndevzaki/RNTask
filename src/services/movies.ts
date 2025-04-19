import axios from 'axios';
import { Movie } from '../utils/types';

const API_URL = 'https://freetestapi.com/api/v1/movies';

export const fetchMovies = async (page: number = 1): Promise<Movie[]> => {
    try {
      const response = await axios.get<Movie[]>(`${API_URL}?page=${page}&limit=10`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch movies');
    }
  };

export const fetchMovieById = async (id: string): Promise<Movie> => {
    try {
        const response = await axios.get<Movie>(`${API_URL}/${id}`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch movies');
      }
};