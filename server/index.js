import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import ordersRouter from './routes.js'

try {
  process.loadEnvFile(fileURLToPath(new URL('.env', import.meta.url)))
} catch {
  console.warn('[server] No server/.env found — copy server/.env.example to server/.env and fill in values.')
}

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173' }))
app.use(express.json())
app.use('/api', ordersRouter)

const port = process.env.PORT ?? 4000
app.listen(port, () => {
  console.log(`DugsonTech API listening on http://localhost:${port}`)
})
