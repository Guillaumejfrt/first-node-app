const express = require('express'); // framework Node
const app = express(); // setup de l'appli avec express
const bodyParser = require('body-parser'); // pour lire le body du requête HTTP
const multer = require('multer'); // pour récupérer des champs postés et des photos
const upload = multer();

const PORT = 3000;
let frenchMovies = [];

app.use('/public', express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/movies', (req, res) => {
  frenchMovies = [
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

// app.post('/movies', urlencodedParser, (req, res) => {
//   if(req.body) {
//     const newMovie = { title: req.body.title, year: req.body.year }
//     frenchMovies = [...frenchMovies, newMovie]; // this syntax creates a new array with frenchMovies and newMovie
//     console.log(frenchMovies);

//     res.sendStatus(201);
//     // const title = req.params.title;
//     // const year = req.params.year;
//   } else {
//     return res.sendStatus(500);
//   }
// });

app.post('/movies', upload.fields([]), (req, res) => {

  if(req.body) {
    const formData = req.body;
    // console.log(formData);
    const newMovie = { title: req.body.title, year: req.body.year }
    frenchMovies = [...frenchMovies, newMovie]; // this syntax creates a new array with frenchMovies and newMovie
    // console.log(frenchMovies);
    res.sendStatus(201);
  } else {
    return res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`listenning the port ${PORT}`);
});
