import useMovies from "../hooks/useMovies";


const MovieList = () => {
    const { movies, loading, error } = useMovies();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="movie-list">
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                        <span>Rating: {movie.rating}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
