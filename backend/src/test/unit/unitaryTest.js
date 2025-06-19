const httpMocks = require('node-mocks-http');
const { describe, it, expect, afterEach } = require('@jest/globals');

jest.mock('../../moviesService');

const moviesController = require('../../controller/moviesController');
const moviesService = require('../../moviesService');

const mockMovieArray = [
  { id: 1, titleType: 'movie', primaryTitle: 'The Matrix', year: 1999, runtimeMinutes: 136, genres: 'Action,Sci-Fi' },
  { id: 2, titleType: 'movie', primaryTitle: 'Inception', year: 2010, runtimeMinutes: 148, genres: 'Action,Sci-Fi' }
];
const mockMovieToRegister = {
  titleType: 'movie',
  primaryTitle: 'Interstellar',
  year: 2014,
  runtimeMinutes: 169,
  genres: 'Adventure,Drama,Sci-Fi'
};
const mockMovieResponse = {
  id: 3,
  ...mockMovieToRegister
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('moviesController', () => {
  it('GET /movies should return a movie list', async () => {
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    moviesService.displayMovies.mockResolvedValue(mockMovieArray);

    await moviesController.getAllMovies(request, response);

    expect(moviesService.displayMovies).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
    expect(response._getJSONData().length).toEqual(2);
    expect(response._getJSONData()[0].primaryTitle).toEqual('The Matrix');
  });

  it('POST /movies should register a new movie', async () => {
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
      method: 'POST',
      body: mockMovieToRegister
    });
    moviesService.registerMovies.mockResolvedValue(mockMovieResponse);

    await moviesController.createMovie(request, response);

    expect(moviesService.registerMovies).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(201);
    expect(response._isEndCalled()).toBeTruthy();
    expect(response._getJSONData().primaryTitle).toEqual('Interstellar');
    expect(response._getJSONData().id).toEqual(3);
  });

  it('PUT /movies/:id should update a movie', async () => {
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
      method: 'PUT',
      params: { id: 1 },
      body: mockMovieToRegister
    });
    moviesService.modifyMovies.mockResolvedValue(1);

    await moviesController.updateMovie(request, response);

    expect(moviesService.modifyMovies).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
    expect(response._getJSONData().message).toEqual('Movie updated');
  });

  it('DELETE /movies/:id should delete a movie', async () => {
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest({
      method: 'DELETE',
      params: { id: 1 }
    });
    moviesService.deleteMovies.mockResolvedValue(1);

    await moviesController.deleteMovie(request, response);

    expect(moviesService.deleteMovies).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
    expect(response._getJSONData().message).toEqual('Movie deleted');
  });
});