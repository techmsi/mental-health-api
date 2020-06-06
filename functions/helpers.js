const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());
exports.chooseX = (arr, n) => (n ? shuffle(arr).slice(0, +n) : shuffle(arr));
exports.findByRange = (list, score) => {
  const checkRange = ({ min, max }) => score >= min && score <= max;
  const found = list.filter((obj) => checkRange(obj.range));
  return found[0];
};

exports.constructResponse = (data, statusCode = 200) => ({
  statusCode,
  headers: corsHeaders,
  body: JSON.stringify(data),
});
