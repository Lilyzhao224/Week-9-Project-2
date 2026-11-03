import express from "express";

import http from "http";

import { Server } from "socket.io";

import { JSONFilePreset } from "lowdb/node";


const app = express();

const server =
  http.createServer(app);

const io =
  new Server(server);


const db =
  await JSONFilePreset(
    "data/db.json",
    {
      bottles: []
    }
  );


app.use(
  express.json()
);


app.use(
  express.static("public")
);


// Get all bottles

app.get(
  "/api/bottles",

  function (req, res) {

    res.json(
      db.data.bottles
    );

  }
);


// Add a new bottle

app.post(
  "/api/bottles",

  async function (req, res) {

    const bottle = {

      message:
        req.body.message,

      time:
        new Date()

    };


    db.data.bottles.push(
      bottle
    );


    await db.write();


    io.emit(
      "new-bottle",
      bottle
    );


    res.json(bottle);

  }
);


// Socket connection

io.on(
  "connection",

  function () {

    console.log(
      "Someone entered the ocean."
    );

  }
);


// Railway gives the website its own port

const PORT =
  process.env.PORT || 3000;


server.listen(
  PORT,

  function () {

    console.log(
      "Server is running on port " + PORT
    );

  }
);