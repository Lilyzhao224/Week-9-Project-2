const socket = io();

let bottles = [];


// Find things on the page

const writeButton =
  document.getElementById("writeButton");

const catchButton =
  document.getElementById("catchButton");

const sendButton =
  document.getElementById("sendButton");

const anotherButton =
  document.getElementById("anotherButton");

const closeWrite =
  document.getElementById("closeWrite");

const closeCatch =
  document.getElementById("closeCatch");

const writeBox =
  document.getElementById("writeBox");

const catchBox =
  document.getElementById("catchBox");

const messageInput =
  document.getElementById("messageInput");

const receivedMessage =
  document.getElementById("receivedMessage");

const receivedTime =
  document.getElementById("receivedTime");

const lights =
  document.getElementById("lights");



// Load old messages

fetch("/api/bottles")

  .then(response => response.json())

  .then(data => {

    bottles = data;

    showLights();

  });



// Open write box

writeButton.onclick = function () {

  writeBox.style.display = "flex";

};



// Close write box

closeWrite.onclick = function () {

  writeBox.style.display = "none";

};



// Catch a bottle

catchButton.onclick = function () {

  catchBottle();

};



// Catch another bottle

anotherButton.onclick = function () {

  catchBottle();

};



// Close catch box

closeCatch.onclick = function () {

  catchBox.style.display = "none";

};



// Send bottle

sendButton.onclick = function () {

  const message =
    messageInput.value.trim();


  if (message === "") {

    return;

  }


  fetch("/api/bottles", {

    method: "POST",

    headers: {

      "Content-Type":
        "application/json"

    },

    body: JSON.stringify({

      message: message

    })

  });


  messageInput.value = "";

  writeBox.style.display = "none";

};



// Catch random bottle

function catchBottle() {

  if (bottles.length === 0) {

    receivedMessage.innerText =
      "The ocean is quiet.";

    receivedTime.innerText =
      "";

  }

  else {

    const randomNumber =
      Math.floor(
        Math.random() *
        bottles.length
      );


    const bottle =
      bottles[randomNumber];


    receivedMessage.innerText =
      bottle.message;


    // Show time

    if (bottle.time) {

      const date =
        new Date(bottle.time);


      receivedTime.innerText =
        date.toLocaleString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
          }
        );

    }

    else {

      receivedTime.innerText =
        "";

    }

  }


  catchBox.style.display = "flex";

}



// Show lights

function showLights() {

  lights.innerHTML = "";


  bottles.forEach(function () {

    const light =
      document.createElement("div");


    light.className =
      "light";


    light.style.left =
      Math.random() *
      88 +
      6 +
      "%";


    light.style.top =
      Math.random() *
      65 +
      15 +
      "%";


    lights.appendChild(light);

  });

}



// Receive new message in real time

socket.on(
  "new-bottle",

  function (bottle) {

    bottles.push(bottle);

    showLights();

  }
);