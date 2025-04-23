// for changes to be permanent, we would have to write the data somewhere when we want changes to be commited.
// this can be a file on our system or a database.
// backend.js
import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js";

const IDMAX = 1999999;

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

//////////////////////
// helper functions //
//////////////////////
//const findUserByName = (name) => {
//  return users["users_list"].filter(
//    (user) => user["name"] === name
//  );
//};


//const findUserById = (id) =>
//  users["users_list"].find((user) => user["id"] === id);


//const addUser = (user) => {
//  users["users_list"].push(user);
//  return user;
//};


// place holder ID to get substituted by mongoose
function genID() {
  return Math.floor(Math.random() * IDMAX);
}



//////////////
// REST API //
//////////////
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  userServices.getUsers(req.query.name, req.query.job)
    .then((result) => res.send({ users_list : result }))
    .catch((error) => res.status(404).send(error))
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id

  userServices.findUserById(id)
    .then((result) => res.send({ users_list : result }))
    .catch((error) => res.status(404).send(error))
});

app.post("/users", (req, res) => {
  const userToAdd = { id: String(genID()), ...req.body };

  userServices.addUser(userToAdd)
    .then((result) => res.status(201).send(result))
    .catch((error) => res.status(404).send(error))
  
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  userServices.findByIdAndDel(userId)
    .then(() => res.status(204).send())
    .catch(() => res.status(404).send())
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
