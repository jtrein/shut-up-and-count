const cors = require('cors');

const app = require('./app');

const port = process.env.PORT || 3000;

app.use(cors());

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port %d', port);
});
