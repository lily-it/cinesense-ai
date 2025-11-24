export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  longDescription: string;

  rating: number;
  genres: string[];

  poster: string;
  backdrop: string;

  releaseDate: string;
  runtime: number;
  languages: string[];

  budget: number;
  revenue: number;
  status: string;
}
export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}
