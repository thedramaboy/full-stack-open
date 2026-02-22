require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./model/person");

app.use(cors());
app.use(express.json());

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      req.method === "POST" ? JSON.stringify(req.body) : "",
    ].join(" ");
  }),
);

let persons = [];

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// app.get("/info", (request, response) => {
//   const date = new Date();
//   const responseText = `
//         <p>Phonebook has info for ${persons.length} people</p>
//         <p>${date}</p>
//     `;
//   response.send(responseText);
//   console.log(`Phonebook has info for ${persons.length} people`);
//   console.log(`Time: ${date}`);
// });

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

// const getRandomId = () => {
//   return Math.floor(Math.random() * 10000);
// };

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number is missing",
    });
  }

  // const nameExists = persons.find((person) => person.name === body.name);

  // if (nameExists) {
  //   return response.status(400).json({
  //     error: "Name must be unique",
  //   });
  // }

  const person = new Person({
    // id: String(getRandomId()),
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
