GRANT ALL PRIVILEGES ON movies.* TO 'user'@'%';
USE movies;

CREATE TABLE IF NOT EXISTS contentTitle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titleType VARCHAR(50),
    primaryTitle VARCHAR(255),
    year INT,
    runtimeMinutes INT,
    genres VARCHAR(255)
);

INSERT INTO contentTitle (titleType, primaryTitle, year, runtimeMinutes, genres)
VALUES
  ('movie', 'Inception', 2010, 148, 'Action,Sci-Fi,Thriller'),
  ('movie', 'The Matrix', 1999, 136, 'Action,Sci-Fi'),
  ('movie', 'Interstellar', 2014, 169, 'Adventure,Drama,Sci-Fi');