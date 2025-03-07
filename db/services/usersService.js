// services/usersService.js
const UsersRepository = require('../repositories/usersRepository');
const MoviesRepository = require('../repositories/moviesRepository');
const usersRepository = new UsersRepository();
const moviesRepository = new MoviesRepository();

const UsersService = {
  async createUser(data) {
    const { name, email, password } = data;
    const newUser = await usersRepository.createUser({ name, email, password });
    return newUser;
  },

  async markMovieAsWatched(userId, movieId) {
    return await usersRepository.markMovieAsWatched(userId, movieId);
  },

  // Nuevo método para marcar película vista usando username y movieTitle
  async markMovieAsWatchedByUsernameAndTitle(username, movieTitle) {
    // Buscar usuario por username
    const user = await usersRepository.findUserByName(username);
    if (!user) {
      throw new Error(`User "${username}" not found`);
    }
    
    // Buscar la película por título (búsqueda flexible, case-insensitive)
    const movies = await moviesRepository.findByTitle(movieTitle);
    if (!movies || movies.length === 0) {
      throw new Error(`Movie with title "${movieTitle}" not found`);
    }
    // Usamos la primera coincidencia
    const movieId = movies[0].id;
    
    // Marcar la película como vista para el usuario
    return await usersRepository.markMovieAsWatched(user.id, movieId);
  },

  async listUsersWithWatchedMovies() {
    return await usersRepository.listUsersWithWatchedMovies();
  },
};

module.exports = UsersService;
