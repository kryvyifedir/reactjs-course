const { json } = require('express')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), JSON.stringify(req.body),
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "phone": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "phone": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "phone": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "phone": "39-23-6423122"
  }
]

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  let currentDate = new Date(Date.now());
  response.send("Persons has " + persons.length + " people in it <br>" + currentDate.toString())
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
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
      error: 'number is missing'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    phone: body.phone
  }

  persons = persons.concat(person)

  response.json(person)
})

app.put('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const updatedPerson = persons.find(person => person.id === id)
  if(!updatedPerson) {
    return response.status(404).json({
      error: 'person is missing'
    })
  }

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

  persons = persons.map(person => {
    if (person.id === updatedPerson.id) {
      return {
        "id": updatedPerson.id,
        "name": updatedPerson.name,
        "phone": body.phone
      };
    }
    return person;
  })

  response.status(204).end()

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})