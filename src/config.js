module.exports = {
  host: process.env.HOST || 'localhost',
  hotLoadPort: process.env.HOT_LOAD_PORT || 4000,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 4040,
  app: {
    title: 'Hahoo Admin'
  }
};
