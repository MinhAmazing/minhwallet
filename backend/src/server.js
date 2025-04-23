/**
 * server.js
 * File này khởi chạy Express app.
 */
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
