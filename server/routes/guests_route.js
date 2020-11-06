const express = require("express");
const app = express();
const _ = require("underscore");
const bodyparser = require("body-parser");

const Guests = require("../models/guests_model");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.post('/addguest/',(req, res) => {

  const guestData = req.body;
  
  let { numberOfPeople, numberOfDays, rate, name, lastName } = guestData;

  if( numberOfPeople === 1 ) {
    total = (numberOfDays * 2500 * 1.19)
    rate = total - (total * 0.05)
  } else if( numberOfPeople === 2 ) {
    total = (numberOfDays * 4600 * 1.19)
    rate = total - (total * 0.09)
  } else if( numberOfDays >= 3 ) {
    total = (numberOfDays * 5200 * 1.19)
    rate = total - (total * 0.15)
  } else {
    rate = 0;
  }

  const guest = new Guests({
    numberOfPeople,
    numberOfDays,
    rate,
    name,
    lastName
  });

  guest.save((err, productDB) => {
    if (err) {
      res.status(200).json({
        ok: false,
        status: "400",
        response: "Error al intentar guardar!",
        err,
      });
    } else {
      res.json({
        ok: true,
        status: "200",
        response: "Guest guardado correctamente!",
        producto: productDB,
      });
    }
  });
}
);

app.get("/getguests/", (req, res) => {
  
    Guests.find()
      .exec((err, guestDB) => {
        if (err) {
          res.status(200).json({
            ok: false,
            status: "400",
            response: "Error!",
            err,
          });
        } else {
          //hacemos conteo de la cantidad de usuarios
          Guests.countDocuments({}, (err, conteo) => {
            res.json({
              ok: true,
              status: "200",
              response: "Guest List!",
              totalProducts: conteo,
              guestDB,
            });
          });
        }
      });
  }
);

//TODO: Falta esta monda.
app.get('/getguestbyid/:id', (req, res) => {
  
  //id del producto
  const id = req.params.id;

    Guests.findById(id)
      .exec((err, guestDB) => {
        if (err) {
          res.status(200).json({
            ok: false,
            status: "400",
            response: "Error al listar los usuarios!",
            err,
          });
        } else if (guestDB === null) {
        res.status(200).json({
          ok: false,
          status: "400",
          response: "Guest no encontrado!",
        });
      } else {
          //hacemos conteo de la cantidad de usuarios
            res.json({
              ok: true,
              status: "200",
              response: "Guest!",
              guestDB,
            });
        }
      });
  }
);

app.put("/updateGuest/:id", (req, res) => {
  
  let id = req.params.id;
  
  const guestData = req.body;
  
  let { numberOfPeople, numberOfDays, rate, name, lastName } = guestData;

  if( numberOfPeople === 1 ) {
    total = (numberOfDays * 2500 * 1.19)
    rate = total - (total * 0.05)
  } else if( numberOfPeople === 2 ) {
    total = (numberOfDays * 4600 * 1.19)
    rate = total - (total * 0.09)
  } else if( numberOfDays >= 3 ) {
    total = (numberOfDays * 5200 * 1.19)
    rate = total - (total * 0.15)
  } else {
    rate = 0;
  }

  Guests.findByIdAndUpdate(id, {numberOfPeople, numberOfDays, rate, name, lastName},
    { new: true },
    (err, guestDB) => {
      if (err) {
        res.status(200).json({
          ok: false,
          status: "400",
          response: "Error de base de datos!",
          err,
        });
      } else {
        res.json({
          ok: true,
          status: "200",
          response: "Guest actualizado correctamente!",
          guest: guestDB,
        });
      }
    }
  );
});

app.delete("/deleteGuestById/:id",(req, res) => {

  let id = req.params.id;

  Guests.findByIdAndRemove(id, (err, guestDeleted) => {
    
    if (err) {
      res.status(200).json({
        ok: false,
        status: "400",
        response: "Error on database",
        err,
      });
    } else if (guestDeleted === null) {
      res.status(200).json({
        ok: false,
        status: "400",
        response: "Guest not found",
      });
    } else {
      res.json({
        ok: true,
        status: "200",
        response: "Guest deleted successfuly",
        producto: guestDeleted,
      });
    }
  });
}
);

module.exports = app;
