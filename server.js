const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

app.post('/api/notes', (req, res) => {
  const apiPost = req.body;
  fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
    let json = JSON.parse(data);
    json.push(apiPost);
    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(json), err => {
      if (err) throw err;
      console.log('Appended notes to the database!');
    });
  });
  res.send('DB has been modified.');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
