const { constructResponse } = require('./helpers');
const { getRoute } = require('./getRoute');
exports.handler = async function (event) {
  try {
    return getRoute(event);
  } catch (error) {
    return constructResponse(error, 500);
  }
};
