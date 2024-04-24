import express from "express";
import cors from "cors";

import userService from "./user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

/*const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Fanitor"
      },
      {
        id: "abc123",
        name: "BIGMAC",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "lilMAC",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };
*/

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(
        'Example app listening at http://localhost:${port}'
    );
});

/*const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};

const findUserByJob = (job) => {
    return users["users_list"].filter(
      (user) => user["job"] === job
    );
};

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    )
}

const findUserById = (id) => users["users_list"].find((user) => user["id"] === id);

const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 10); 
};

const addUser = (user) => {
  const newUser = { ...user, id: generateRandomId() };
  users["users_list"].push(newUser); 
  return newUser; 
};*/

/* Find users by name or job
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);
        result = { users_list: result };
        res.send(result);
    } else if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else if (job != undefined) {
        let result = findUserByJob(job);
        result = { users_list: result};
        res.send(result);
    } else {
        res.send(users);
    }
});*/

app.get("/users", (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"];
  userService
    .getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService.findUserById(id).then((result) => {
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else res.send({ users_list: result });
  });
});

/* Find users by id
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});*/

app.post("/users", (req, res) => {
  const user = req.body;
  userService.addUser(user).then((savedUser) => {
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
  });
});

/*app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd);
  res.status(201).json(newUser).send(); 
});*/


app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService.deleteUserById(id)
    .then((user) => {
        if (user) {
            res.status(204).send(`User with id ${id} has been deleted successfully.`);
        } else {
            res.status(404).send("Resource not found.");
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send("An error occurred while deleting the user.");
    });
});


/* Delete users by ID
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const index = users.users_list.findIndex((user) => user.id === id);
  if (index !== -1) {
      // Remove the user from the list
      users.users_list.splice(index, 1);
      // Send a success response with status code 204 
      res.status(204).send(`User with id ${id} has been deleted successfully.`);
  } else {
      // User not found, send status code 404 
      res.status(404).send("Resource not found.");
  }
});*/



