const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3333;


app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Listening on port ${port}`));


app.post('/user', (req, res) => {
  console.log(req);
  
});

app.post('/expense', (req, res) => {
  console.log(req.body);
  
});

app.post('/tag', (req, res) => {
  console.log(req);
});