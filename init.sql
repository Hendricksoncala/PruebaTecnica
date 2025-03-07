CREATE TABLE IF NOT EXISTS Categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Peliculas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descripcion TEXT,
  fechaEstreno DATE NOT NULL,
  categoriaId INT,
  FOREIGN KEY (categoriaId) REFERENCES Categorias(id)
);

CREATE TABLE IF NOT EXISTS Usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS PeliculasVistas (
  usuarioId INT,
  peliculaId INT,
  fechaVista TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (usuarioId, peliculaId),
  FOREIGN KEY (usuarioId) REFERENCES Usuarios(id),
  FOREIGN KEY (peliculaId) REFERENCES Peliculas(id)
);

INSERT IGNORE INTO Categorias (nombre) VALUES
('Terror'),
('Suspenso'),
('Drama'),
('Comedia');
