const MoviesRepository = require('../repositories/moviesRepository');
const moviesRepository = new MoviesRepository();

const MoviesService = {
  // Obtiene todas las películas, aplicando filtros si se envían
  async getAllMovies({ title, category, page = 1, limit = 5, order = 'ASC' }) {
    if (category) {
      return await moviesRepository.findByCategory(category);
    } else {
      return await moviesRepository.getAll();
    }
  },

  // Busca películas por título
  async getMovieByTitle(title) {
    const movies = await moviesRepository.findByTitle(title);
    return movies;
  },

  // Obtiene una película por su ID
  getMovieById: async (id) => {
    return await moviesRepository.getById(id);
  },

  // Crea una película, convirtiendo el nombre de la categoría en su ID
  async createMovie(data) {
    const { title, description, releaseDate, categoryName } = data;

    // Buscar el ID de la categoría a partir del nombre
    let categoryId = await moviesRepository.findCategoryIdByName(categoryName);
    if (!categoryId) {
      const newCategory = await categoriesRepository.createCategory({ name: categoryName });
      categoryId = newCategory.id;
    }

    // Crear la película con el ID real de la categoría
    const createdMovie = await moviesRepository.createMovie({
      title,
      description,
      releaseDate,
      categoryId
    });

    return createdMovie;
  },

  // Actualiza una película por su ID
  updateMovie: async (id, data) => {
    return await moviesRepository.updateById(id, data);
  },

  // Elimina una película por su ID
  deleteMovie: async (id) => {
    return await moviesRepository.deleteMovie(id);
  },

  // Obtiene las películas que se consideran novedades (por ejemplo, estrenadas hace menos de 3 semanas)
  getNewReleases: async () => {
    return await moviesRepository.getNewReleases();
  },
};

module.exports = MoviesService;