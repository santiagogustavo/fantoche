const express = require('express');

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.get('/puppet', (req, res) => {
  res.json({ foo: 'bar' });
});

app.listen(port, () => {
  console.log('Server running on port 3000');
});
