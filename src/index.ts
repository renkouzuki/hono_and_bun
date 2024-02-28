import { Hono } from 'hono'
import { measureTime, prisma } from './data'
import { testing } from './routes'

const app = new Hono()

app.use(measureTime)

app.get('/', async(c) => {
  const testing = await prisma.test.findMany()
  return c.json({testing})
})

app.route('/api',testing)

const port = process.env.PORT 

export default {
  port,
  fetch:app.fetch
}
