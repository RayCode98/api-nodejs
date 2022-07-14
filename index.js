const express = require('express')
const cors = require('cors')

const server = express()

const logger = require('./loggerMiddleware')

server.use(cors())

server.use(express.json())

server.use(logger)

let datos = [
  {
    id: 1,
    contenido: 'Hola mundo esto es una prueba',
    importante: true
  },
  {
    id: 2,
    contenido: 'nota dos',
    importante: true
  }
]

server.get('/api/notes', (req, res) => {
  res.json(datos)
})

server.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const nota = datos.find(nota => nota.id === id)
  if (nota) {
    res.json(nota)
  } else {
    res.json({
      error: 'Nota no encontrada'
    })
  }
})

server.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const nota = datos.find(nota => nota.id === id)
  if (nota) {
    datos = datos.filter(nota => nota.id !== id)
    res.json({
      mensaje: 'Nota eliminada',
      id
    })
  } else {
    res.json({
      error: 'Nota no encontrada'
    })
  }
})

server.post('/api/notes', (req, res) => {
  const nota = req.body

  if (!nota || !nota.contenido) {
    res.status(400).json({
      error: 'Falta contenido'
    })
  }

  const id = datos.map(nota => nota.id)
  const maxId = Math.max(...id)

  const notaNueva = {
    id: maxId + 1,
    contenido: nota.contenido,
    importante: nota.importante || false
  }

  datos = [...datos, notaNueva]
  res.json(notaNueva)
})

// Erro 404
server.use((req, res) => {
  res.status(404).json({
    error: 'Not found'
  })
})

const port = proccess.env.PORT || 3001

server.listen(port, () => {
  console.log('Corriendo')
})
