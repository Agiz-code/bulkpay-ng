const { expo } = require('./app.json');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

module.exports = {
  expo: {
    ...expo,
    extra: {
      ...expo.extra,
      backendUrl:
        process.env.EXPO_PUBLIC_BACKEND_URL ||
        'http://localhost:3000',
    },
  },
};
