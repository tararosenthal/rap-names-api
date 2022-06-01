const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;
const rappers = {
  '21 savage': {
    'age': 29,
    'birthname': 'Shéyaa Bin Abraham-Joseph',
    'birthlocation': 'London, England'
  },
  'chance the rapper': {
    'age': 29,
    'birthname': 'Chancellor Bennett',
    'birthlocation': 'Chicago, Illinois'
  },
  'dylan': {
    'age': 29,
    'birthname': 'Dylan',
    'birthlocation': 'Dylan'
  }
};

app.use(cors());

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

app.get('/api/:rapperName', (request, response) => {
  let rapperName = request.params.rapperName.toLowerCase().trim();
  let rapper;

  if (rappers[rapperName]) {
    rapper = rappers[rapperName];
  } else {
    rapper = rappers['dylan'];
  }
  response.json(rapper);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is running on port ${PORT}. You'd better go catch it!`);
});
