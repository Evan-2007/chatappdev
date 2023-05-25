const crypto = require('crypto');

const generateApiKey = () => {
  const apiKeyLength = 16; // change this value to set the desired length of the API key
  return crypto.randomBytes(apiKeyLength).toString('hex');
}

console.log(generateApiKey());