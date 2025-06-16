
CREATE DATABASE movies;
GRANT ALL PRIVILEGES ON movies.* TO admin;


CREATE TABLE contentTitle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titleType VARCHAR(255),
    primaryTitle VARCHAR(255),
    year INT,
    runtimeMinutes INT,
    genres VARCHAR(255)
);


INSERT INTO contentTitle(id,titleType, primaryTitle,year, runtimeMinutes, genres)VALUES
    (1,'Movie','Dune',2019, 180,'Fantasy'),
    (2,'Movie', 'Heat', 1996,150, 'Action');