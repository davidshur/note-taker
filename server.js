const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/tables', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

app.post('/api/reserve', (req, res) => {
  console.log(req.body);
  res.send('Request posted, reservation made.');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
