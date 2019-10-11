const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle error message'
  });
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
