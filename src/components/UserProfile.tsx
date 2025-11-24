const UserProfile = () => {
    // Sample user data (this could be fetched from an API)
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        watchlist: ['Inception', 'Interstellar', 'The Matrix'],
        analytics: {
            watchedMovies: 120,
            favoriteGenre: 'Sci-Fi',
        },
    };

    return (
        <div className="user-profile">
            <h1>{user.name}'s Profile</h1>
            <p>Email: {user.email}</p>
            <h2>Watchlist</h2>
            <ul>
                {user.watchlist.map((movie, index) => (
                    <li key={index}>{movie}</li>
                ))}
            </ul>
            <h2>Analytics</h2>
            <p>Watched Movies: {user.analytics.watchedMovies}</p>
            <p>Favorite Genre: {user.analytics.favoriteGenre}</p>
        </div>
    );
};

export default UserProfile;