// run node client.js to send req as user

const fetch = require("node-fetch");

const clientPostMultiple = () => {
  const url = `http://localhost:3000/todo/all`;
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(),
  })
    .then((res) => console.log("server side response", res))
    .catch((err) => console.log(err));
};
// clientPostMultiple();

const clientGet = () => {
  const url = `http://localhost:3000/todo`;
  fetch(url)
    .then((res) => console.log("server side response", res))
    .catch((err) => console.log(err));
};
// clientGet();

const clientUpdate = () => {
  const url = `http://localhost:3000/todo`;
  fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: "this is title",
      description: "this is description",
      status: "active",
    }),
  })
    .then((res) => console.log("server side response", res))
    .catch((err) => console.log(err));
};
// clientUpdate();
