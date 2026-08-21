import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import express from 'express'
import cors from 'cors'
import ordersRouter from './routes.js'

try {
  process.loadEnvFile(fileURLToPath(new URL('.env', import.meta.url)))
} catch {
  console.warn('[server] No server/.env found — copy server/.env.example to server/.env and fill in values.')
}

const app = express()
const distDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173' }))
app.use(express.json())
app.use('/api', ordersRouter)

// In production the built frontend (vite build's dist/) is served by this
// same process, so the deployed app is a single service — no separate static
// host needed. Locally, the frontend normally runs via `vite` instead, and
// dist/ won't exist until you build, so this is a no-op there.
if (existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get(/^(?!\/api\/).*/, (req, res) => {
    res.sendFile(join(distDir, 'index.html'))
  })
}

const port = process.env.PORT ?? 4000
app.listen(port, () => {
  console.log(`DugsonTech API listening on http://localhost:${port}`)
})
