const { therapists } = require('./data/therapists.json');
const { scale: phq9Scale, ...phq9 } = require('./data/diagnosticPHQ9.json');

const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());
const chooseX = (arr, n) => (n ? shuffle(arr).slice(0, +n) : shuffle(arr));
const findByRange = (list, score) => {
  const checkRange = ({ min, max }) => score >= min && score <= max;
  const found = list.filter((obj) => checkRange(obj.range));
  return found[0];
};

const constructResponse = (data, statusCode = 200) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
  body: JSON.stringify(data),
});

const getRoute = ({
  httpMethod,
  path,
  body = null,
  queryStringParameters = null,
}) => {
  switch (httpMethod) {
    case 'GET':
      if (path === '/api/') {
        return constructResponse('Mental Health Api');
      }
      if (path.includes('phq9')) {
        return constructResponse(phq9);
      }
      if (path.includes('therapists')) {
        const { limit } = queryStringParameters;
        const list = limit ? chooseX(therapists, limit) : therapists;

        return constructResponse(list);
      }
    case 'POST':
      if (path.includes('diagnosis')) {
        const score = parseInt(JSON.parse(body).score);
        const diagnosis =
          score >= 0
            ? findByRange(phq9Scale, score)
            : 'Could not process diagnosis.';

        return constructResponse(diagnosis);
      }
    default:
      return constructResponse({ msg: 'No data found.' });
  }
};

exports.handler = async function (event) {
  console.log('Accessed', event.path);
  try {
    return getRoute(event);
  } catch (error) {
    return constructResponse(error, 500);
  }
};
