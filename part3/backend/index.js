const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]
  
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const generateId = () => {
  return  Math.floor(Math.random() * 1000);
}

app.post("/api/persons", (request, response) => {
  let newId = generateId();
  let body = request.body;
  if(!body.name || !body.number){
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  let checkNameIsUnique = persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())
  if (checkNameIsUnique) {
    return response.status(404).json({error: 'name must be unique'})
  }
  let newPerson = {
    id: newId,
    name: body.name,
    number: body.number
  }
  persons.concat(newPerson);
  response.json(newPerson);
});

app.get("/info", (request, response) => {
  const sumOfPersons = persons.length;
  const date = new Date().toString();
  response.send(`<p>Phonebook has info for ${sumOfPersons} people</p> <p>${date}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
