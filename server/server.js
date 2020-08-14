const express = require('express');
const app = express();
const PORT = 8082;
const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

let boardsDB = {};

app.post('/ships', (req, res) => {

  if (!req.body) {
    console.log('error! no data sent');
    res.end();
    return;
  }

  let data = req.body;
  boardsDB = data;

  console.log(boardsDB);
  res.end();
});

app.get('/ships', (req, res) => {

  res.send(boardsDB);

})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})