

// ************************************************************************
// SERVER WAS CREATED FOR STRETCH GOALS BUT NEVER COMPLETED... FUTURE WORK!
// ************************************************************************



// const express = require('express');
// const app = express();
// const PORT = 8082;
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(express.static("public"));

// let boardsDB = {
//   playBoardArray: [],
//   compBoardArray: [],
// };

// app.post('/ships', (req, res) => {

//   if (!req.body) {
//     console.log('error! no data sent');
//     res.end();
//     return;
//   }

//   let data = req.body;
//   boardsDB = data;
//   console.log(boardsDB);
//   res.end();
// });

// app.get('/ships', (req, res) => {
//   //database query
//   res.send(data)
//     .then(() => {
//     })
//   res.send(boardsDB);
// })

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// })