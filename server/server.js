const express = require('express');
const app = express();
const PORT = 8082;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const boardsDB = [];


app.post('/ships', (req, res) => {

})



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})