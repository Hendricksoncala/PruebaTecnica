// services/moviesService.js
const MoviesRepository = require('../repositories/moviesRepository');
const CategoriesRepository = require('../repositories/categoriesRepository');

const moviesRepository = new MoviesRepository();
const categoriesRepository = new CategoriesRepository();

const MoviesService = {
  async getAllMovies({ title, category, page = 1, limit = 5, order = 'ASC' }) {
    if (category) {
      return await moviesRepository.findByCategory(category);
    } else if (title) {
      return await moviesRepository.findByTitle(title);
    } else {
      return await moviesRepository.getAll();
    }
  },

  async getMovieById(id) {
    return await moviesRepository.getById(id);
  },

  async createMovie(data) {
    const { title, description, releaseDate, categoryName } = data;
    let categoryId = await categoriesRepository.findCategoryIdByName(categoryName);
    if (!categoryId) {
      const newCategory = await categoriesRepository.createCategory({ name: categoryName });
      categoryId = newCategory.id;
    }
    const createdMovie = await moviesRepository.createMovie({
      title,
      description,
      releaseDate,
      categoryId
    });
    return createdMovie;
  },

  async updateMovieByTitle(oldTitle, data) {
    return await moviesRepository.updateByTitle(oldTitle, data);
  },

  async deleteMovieByTitle(title) {
    return await moviesRepository.deleteMovieByTitle(title);
  },

  async getRecentReleases() {
    return await moviesRepository.getRecentReleases();
  },

  async updateMovieByTitle(oldTitle, data) {
    // Si necesitas actualizar la categoría por nombre:
    const { title, description, releaseDate, categoryName } = data;
    let categoryId = null;
    
    if (categoryName) {
      categoryId = await categoriesRepository.findCategoryIdByName(categoryName);
      if (!categoryId) {
        const newCategory = await categoriesRepository.createCategory({ name: categoryName });
        categoryId = newCategory.id;
      }
    }
    
    // Arma un objeto con los campos que quieras actualizar
    const updateData = {
      title,
      description,
      releaseDate,
      categoryId
    };
    
    const result = await moviesRepository.updateByTitle(oldTitle, updateData);
    return result;
  }
};

module.exports = MoviesService;
