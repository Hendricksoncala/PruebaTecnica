const PeliculasRepository = require('../repositories/peliculasRepository');
const peliculasRepository = new PeliculasRepository();

const PeliculasService = {
  // Obtiene todas las películas, aplicando filtros si se envían
  async getAllPeliculas({ titulo, categoria, page = 1, limit = 5, orden = 'ASC' }) {
    if (categoria) {
      return await peliculasRepository.findByCategory(categoria);
    } else {
      return await peliculasRepository.getAll();
    }
  },

  // Obtiene una película por su ID
  getPeliculaById: async (id) => {
    return await peliculasRepository.getById(id);
  },

  // Crea una película, convirtiendo el nombre de la categoría en su ID
  async createPelicula(data) {
    const { titulo, descripcion, fechaEstreno, categoriaNombre } = data;

    // Buscar el ID de la categoría a partir del nombre
    const categoriaId = await peliculasRepository.findCategoriaIdByNombre(categoriaNombre);
    if (!categoriaId) {
      const nuevaCategoria = await categoriasRepository.createCategoria({ nombre: categoriaNombre });
      categoriaId = nuevaCategoria.id;
    }

    // Crear la película con el ID real de la categoría
    const peliculaCreada = await peliculasRepository.createPelicula({
      titulo,
      descripcion,
      fechaEstreno,
      categoriaId
    });

    return peliculaCreada;
  },

  // Actualiza una película por su ID
  updatePelicula: async (id, data) => {
    return await peliculasRepository.updateById(id, data);
  },

  // Elimina una película por su ID
  deletePelicula: async (id) => {
    return await peliculasRepository.deletePelicula(id);
  },

  // Obtiene las películas que se consideran novedades (por ejemplo, estrenadas hace menos de 3 semanas)
  getNovedades: async () => {
    return await peliculasRepository.getNovedades();
  },
};

module.exports = PeliculasService;
