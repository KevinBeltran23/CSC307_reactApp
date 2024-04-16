import express from "express";

const app = express();
const port = 8000;

const users = {
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

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(
        'Example app listening at http://localhost:${port}'
    );
});

const findUserByName = (name) => {
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

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

// Find users by name or job
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
});

// Find users by id
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

// Add users
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

// Delete users
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const index = users.users_list.findIndex((user) => user.id === id);
    if (index !== -1) {
        // Remove the user from the list
        users.users_list.splice(index, 1);
        // Send a success response
        res.status(200).send(`User with id ${id} has been deleted successfully.`);
    } else {
        // User not found
        res.status(404).send("Resource not found.");
    }
});



