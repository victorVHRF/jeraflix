import { FastifyReply, FastifyRequest } from "fastify";
import { addMovieToWatchListService, getTopRatedMoviesService, listWatchService, markAsWatchedService, searchMoviesService } from "../services/movieService";

export async function searchMovies (request: FastifyRequest, reply: FastifyReply) {
  const { query } = request.query as any

  try {
    const movies = await searchMoviesService(query)
    reply.send(movies)
  } catch (error: any) {
    reply.status(400).send({ message: error.message })
  }
}

export async function addMovieToWatchList(request: FastifyRequest, reply: FastifyReply) {
  const { profileId, movieId, title} = request.body as any

  try {
    const movie = await addMovieToWatchListService(profileId, movieId, title)
     reply.send(movie)
  } catch (error: any) {
    reply.status(400).send({ message: error.message })
  }
}

export async function listWatch(request: FastifyRequest, reply: FastifyReply) {
  const { profileId } = request.params as {profileId: string}

  try {
    const movies = await listWatchService(profileId)
    reply.send(movies)
  } catch (error: any) {
    reply.status(400).send({ message: error.message })
  }
}

export async function markAsWatched(request: FastifyRequest, reply: FastifyReply) {
  const { movieId } = request.body as any

  try {
    const movie = await markAsWatchedService(movieId)
    reply.send(movie)
  } catch (error: any) {
    reply.status(400).send({ message: error.message })
  }
}

export async function getTopRatedMovies(request: FastifyRequest, reply: FastifyReply) {
  try {
    const movies = await getTopRatedMoviesService()
    reply.send(movies)
  } catch (error: any) {
    reply.status(400).send({ message: error.message });
  }
}