import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import { connectDB } from './db/db';
import { authRoutes } from './routes/authRoutes';
import { movieRoutes } from './routes/movieRoutes';
import { profileRoutes } from './routes/profileRoutes';


// dotenv.config();

const app = fastify()
app.register(fastifyCors, { origin: true })
// app.register(fastifyJwt, { secret: process.env.JWT_SECRET })

app.register(authRoutes)
app.register(profileRoutes)
app.register(movieRoutes)

app.listen({ port: 3333 })
.then(() => {
  connectDB()
  return app.log.info('Database connected successfully')
})
.then(() => {
  return console.log('HTTP server runnig!')
})
.catch(err => {
  app.log.error('database connect failed: ' + err)
  process.exit(1)
})