require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Persons = require("./models/phoneBook");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/", (request, response) => {
  response.send("<h1>Ruska is my queen</h1>");
});

app.get("/api/persons", (request, response, next) => {
  Persons.find({})
    .then((persons) => response.json(persons))
    .catch((error) => next(error));
});

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

app.post("/api/persons", async (request, response, next) => {
  let newId = generateId();
  let body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  let newPerson = new Persons({
    name: body.name,
    number: body.number,
  });

  let validateError = newPerson.validateSync();
  if(validateError) {
    return response.status(400).json({error: validateError.message});
  }
  Persons.find({})
    .then((persons) => {
      let checkNameIsUnique = persons.find(
        (person) => person.name.toLowerCase() === body.name.toLowerCase()
      );
      if (checkNameIsUnique) {
        return response.status(404).json({ error: "name must be unique" });
      }
      newPerson
        .save()
        .then((savedPerson) => response.json(savedPerson))
        .catch((err) => response.status(400).end({ error: err.message }));
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  const sumOfPersons = persons.length;
  const date = new Date().toString();
  response.send(
    `<p>Phonebook has info for ${sumOfPersons} people</p> <p>${date}</p>`
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  Persons.findById(request.params.id)
    .then((person) => {
      if (person) {
        return response.json(person);
      } else {
        return response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", async (request, response, next) => {
  let body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const filter = { _id: request.params.id };
  const update = { $set: { number: body.number } };

  Persons.findOneAndUpdate(filter, update, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((person) => {
      console.log("updatedPerson: ", person);
      return response.json(person);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", async (request, response, next) => {
  await Persons.findByIdAndDelete(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);

const errorHendler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHendler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
