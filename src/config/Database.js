require('dotenv').config();
const mongoose = require('mongoose');

// const DB = process.env.DATABASE;

// if (!DB) {
//   console.error("DATABASE environment variable is not set.");
//   process.exit(1);
// }

mongoose.connect("mongodb+srv://admin:WflNcSHug68E74ts@cluster0.9wkw6.mongodb.net/Maplocally?retryWrites=true&w=majority")
  .then(() => console.log("connection successful"))
  .catch(err => console.log(err, 'no connection'));
