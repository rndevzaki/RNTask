export interface Movie {
    id: string;
    title: string;
    year: number;
    plot: string;
    poster: string;
    genre: string[];
    rating?: number;
    director: string;
    runtime: number;
    actors: string[];
    awards: string;
    country: string;
    language: string;
    boxOffice: string;
  }
  
  export type RootStackParamList = {
    SignInScreen: undefined;
    SignupScreen: undefined;
    MovieListScreen: undefined;
    MovieDetail: { movie: Movie };
    Favorites: undefined;
    AppTabs:undefined
  };