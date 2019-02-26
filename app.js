const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

app.use('/public', express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/movies', (req, res) => {
  const frenchMovies = [
    {
      title: "Le fabuleux destin d'Amélie Poulain",
      year: 1980
    },
    {
      title: "James Bond",
      year: 1990
    },
    {
      title: "Le bon, la brute et le truand",
      year: 1975
    }
  ]
  res.render('movies.ejs', { frenchMovies: frenchMovies})
});

app.get('/movie-details', (req, res) => {
});

app.get('/movies/add', (req, res) => {
  res.send("Let's add a new movie");
});

app.get('/movies/:id/:title', (req, res) => {
  const id = req.params.id;
  const title = req.params.title;
  // const title = 'terminator';
  res.render('movie-details.ejs', { movieId: id, title: title })
});

// On passe le parser du body uniquement à la route qui en a besoin
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/movies', urlencodedParser, (req, res) => {
  console.log(req.body.title);
  res.sendStatus(201);
  // const title = req.params.title;
  // const year = req.params.year;
});

app.listen(PORT, () => {
  console.log(`listenning the port ${PORT}`);
});
