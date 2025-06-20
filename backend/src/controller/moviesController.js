const {
  displayMovies,
  registerMovies,
  deleteMovies,
  modifyMovies,
  displayMovieById
} = require('../moviesService');

// Controller functions
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await displayMovies();
    //console.log(movies);
    res.status(200).json(movies);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

exports.createMovie = async (req, res) => {
  try {
    let { titleType, primaryTitle, year, runtimeMinutes, genres } = req.body;
    // Convert year and runtimeMinutes to numbers
    year = Number(year);
    runtimeMinutes = Number(runtimeMinutes);
    if (!primaryTitle) {
      return res.status(400).json({ status: 'bad-request', message: 'primaryTitle field is mandatory' });
    }
    if (isNaN(year)) {
      return res.status(400).json({ status: 'bad-request', message: 'year must be a number' });
    }
    const movie = await registerMovies(titleType, primaryTitle, year, runtimeMinutes, genres);
    res.status(201).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create movie' });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteMovies(id);
    if (deleted) {
      res.status(200).json({ message: 'Movie deleted' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to delete movie' });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    console.log('Received body:', req.body); // Log the body for debugging
    const { id } = req.params;
    const { titleType, primaryTitle, year, runtimeMinutes, genres } = req.body;
    const updated = await modifyMovies(id, titleType, primaryTitle, year, runtimeMinutes, genres);
    if (updated) {
      res.status(200).json({ message: 'Movie updated' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to update movie' });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await displayMovieById(id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
};
