require("./config/config");

const mongoose = require('mongoose');
const express = require("express");
const app = express();

app.use(require("./routes//guests_route"));

mongoose
  .connect(process.env.CONEXIONDB, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Online.'))
  .catch((err) => {
    console.log(Error, err.message);
  });

app.listen(process.env.PORT, () => {
  console.log("Conect port: ", process.env.PORT);
});