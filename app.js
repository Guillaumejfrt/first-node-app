const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`listenning on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`listenning on port ${PORT}`);
});
