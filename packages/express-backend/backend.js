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


app.get("/users", (req, res) => {
    res.send(users);
  });


app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(port, () => {
    console.log(
        'Example app listening at http://localhost:${port}'
    );
});


