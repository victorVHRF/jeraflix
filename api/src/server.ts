import cors from '@fastify/cors'
import fastify from 'fastify'
import { hello } from './routes/hello'

const app = fastify()
app.register(cors)

app.register(hello)

app.listen({ port: 3333 }).then(() => console.log('HTTP server runnig!'))