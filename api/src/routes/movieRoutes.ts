import { FastifyInstance } from 'fastify';
import { addMovieToWatchList, listWatch, markAsWatched, searchMovies } from '../controllers/movieController';

export async function movieRoutes(fastify: FastifyInstance) {
  fastify.get('/movies/search', searchMovies);
  fastify.post('/movies/watchlist', addMovieToWatchList);
  fastify.get('/movies/watchlist', listWatch);
  fastify.post('/movies/watched', markAsWatched);
}
