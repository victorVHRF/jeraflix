import { FastifyInstance } from 'fastify';
import { addMovieToWatchList, listWatch, markAsWatched, searchMovies } from '../controllers/movieController';

export async function movieRoutes(app: FastifyInstance) {
  app.get('/movies/search', searchMovies);
  app.post('/movies/watchlist', addMovieToWatchList);
  app.get('/movies/watchlist', listWatch);
  app.post('/movies/watched', markAsWatched);
}
