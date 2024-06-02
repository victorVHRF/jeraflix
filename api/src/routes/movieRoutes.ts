import { FastifyInstance } from 'fastify'
import { addMovieToWatchList, getTopRatedMovies, listWatch, markAsWatched, searchMovies } from '../controllers/movieController'
import { authenticate } from '../utils/auth'

export async function movieRoutes(app: FastifyInstance) {
  app.addHook('onRequest', authenticate)
  app.get('/movies/search', searchMovies)
  app.post('/movies/watchlist', addMovieToWatchList)
  app.get('/movies/watchlist/:profileId', listWatch)
  app.post('/movies/watched', markAsWatched)
  app.get('/movies/top-rated', getTopRatedMovies)
}
