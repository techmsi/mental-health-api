const { chooseX, findByRange, constructResponse } = require('./helpers');
const { therapists } = require('./data/therapists.json');
const { scale: phq9Scale, ...phq9 } = require('./data/diagnosticPHQ9.json');

exports.getRoute = ({
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

        return constructResponse({ therapists: list });
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
