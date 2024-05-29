import cors from '@fastify/cors'
import fastify from 'fastify'
import { profileRoutes } from './routes/profileRoutes'

const app = fastify()
app.register(cors)

app.register(profileRoutes)

app.listen({ port: 3333 }).then(() => console.log('HTTP server runnig!'))