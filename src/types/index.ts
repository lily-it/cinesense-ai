// Movie object based on TMDB + your app
export interface Movie {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    rating: number;
    genres: string[];
    poster: string;
    backdrop?: string;
}


// A single community review
export interface CommunityReview {
    id: number;
    movieId: number;
    userId: number;
    username: string;
    rating: number;
    comment: string;
    createdAt: string;
}


// User profile (for Profile page)
export interface UserProfile {
    id: number;
    username: string;
    email: string;

    avatar?: string;

    watchlist: Movie[];
    reviews: CommunityReview[];
    likedGenres?: string[];
}


// AI Recommendation item
export interface Recommendation {
    movieId: number;
    score: number;   
    reason?: string; 
}


// AI Recommendation Response
export interface AIRecommendationResponse {
    userId: number;
    recommendations: Recommendation[];
    generatedAt: string;
}
export interface TMDBMovie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
    poster_path: string;
    backdrop_path: string;
}
