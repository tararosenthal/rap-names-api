const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;
const rappers = {
  '21 savage': {
    'age': 29,
    'birthName': 'Shéyaa Bin Abraham-Joseph',
    'birthLocation': 'London, England'
  },
  'chance the rapper': {
    'age': 29,
    'birthName': 'Chancellor Bennett',
    'birthLocation': 'Chicago, Illinois'
  },
  'dylan': {
    'age': 29,
    'birthName': 'Dylan',
    'birthLocation': 'Dylan'
  },
  'blank': {
    'age': '',
    'birthName': '',
    'birthLocation': ''
  }
};

app.set('view engine', 'ejs');

app.use(cors());

app.get('/', (request, response) => {
  let rapper = rappers.blank;

  if (request.query.rapperName) {
    let rapperName = request.query.rapperName.toLowerCase().trim();
    if (rappers[rapperName]) {
      rapper = rappers[rapperName];
    }
  }

  response.render('index.ejs', {rapper});
});

app.get('/api/:rapperName', (request, response) => {
  let rapperName = request.params.rapperName.toLowerCase().trim();
  let apiResponse;

  if (rappers[rapperName]) {
    apiResponse = rappers[rapperName];
  } else {
    apiResponse = rappers['dylan'];
  }
  response.json(apiResponse);

});

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is running on port ${PORT}. You'd better go catch it!`);
});
