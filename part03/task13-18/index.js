require('dotenv').config()
const { json } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PhonebookEntry = require('./models/phonebookEntry')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  PhonebookEntry.find({})
    .then(phonebookEntry => {
      response.json(phonebookEntry)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = String(request.params.id)

  PhonebookEntry.findById(id)
    .then(phonebookEntry => {
      if (phonebookEntry) {
        response.json(phonebookEntry)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => { return next(error) })
})

app.delete('/api/persons/:id', (request, response, next) => {
  PhonebookEntry.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({
      error: 'request body is missing'
    })
  }

  if (!body.name) {
    return response.status(400).json({
      error: 'name is missing'
    })
  }

  if (!body.phone) {
    return response.status(400).json({
      error: 'phone is missing'
    })
  }

  const person = new PhonebookEntry({
    name: body.name,
    phone: body.phone
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  if (!body) {
    return response.status(400).json({
      error: 'request body is missing'
    })
  }

  if (!body.phone) {
    return response.status(400).json({
      error: 'number is missing'
    })
  }

  const person = {
    name: body.name,
    phone: body.phone,
  }

  PhonebookEntry.findByIdAndUpdate(request.params.id, person, { new: true })
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})