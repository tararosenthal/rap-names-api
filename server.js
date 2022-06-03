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
  'unknown': {
    'age': 0,
    'birthName': 'unknown',
    'birthLocation': 'unknown'
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
  const requestData = request.query.rapperName;

  if (requestData) {
    const rapperName = parseRapperName(requestData);
    rapper = getRapper(rapperName);
  }

  response.render('index.ejs', {rapper});
});

app.get('/api/:rapperName', (request, response) => {
  const rapperName = parseRapperName(request.params.rapperName);
  const rapper = getRapper(rapperName);

  response.json(rapper);

});

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is running on port ${PORT}. You'd better go catch it!`);
});

function parseRapperName(requestData) {
  return requestData.toLowerCase().trim();
}

function getRapper(rapperName) {
  if (rappers[rapperName]) {
    return rappers[rapperName];
  }
    return rappers['unknown'];
}

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
