const knex = require("../config/db");
const { GenerateToken } = require("../auth/index");
const bcrypt = require("bcrypt");
insertData = (req, res) => {
  // console.log(req.body);
  knex("users")
    .where("username", req.body.username)
    .then((data) => {
      if (data.length < 1) {
        const valideData = {
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password,10),
          Name: req.body.Name,
          Sex: req.body.Sex,
          DOB: req.body.DOB,
          "Father's Name": req.body["Father's Name"],
          "Mother's Name": req.body["Mother's Name"],
          state: req.body.state,
          district: req.body.district,
        };
        knex("users")
          .insert(valideData)
          .then((data) => {
            res.send({ massage: "data inserted" });
          })
          .catch((err) => {
            res.send({ error: err.massage || "SDf" });
          });
      } else {
        res.send("data already exist");
      }
    })
    .catch((err) => {
      res.send({ error: err.massage });
    });
};

login = (req, res) => {
  knex("users")
    .where({ username: req.body.username })
    .then((data) => {
      var password = bcrypt.compareSync(req.body.password, data[0].password);
      if (password) {
        const token = GenerateToken(req.body);
        res.cookie("token", token);
        res.send(data);
      } else {
        res.send("Invalid email or password");
      }
    })
    .catch((err) => {
      res.send({ error: err.massage });
    });
};
logOut = (req, res) => {
  knex("users")
    .where({ username: req.body.username })
    .then((data) => {
      var password = bcrypt.compareSync(req.body.password, data[0].password);
      if (password) {
        res.clearCookie("token").send("logout successfully");
      } else {
        res.send("Invalid email or password");
      }
    })
    .catch((err) => {
      res.send({ error: err.massage });
    });
};

getState = (req, res) => {
    knex("users")
      .then((data) => {
        const d = [];
        data.map((v) => {
          const valid = v.state;
          if (!d.includes(valid)) {
            d.push(valid);
          }
        });
        res.send({ state: d });
      })
      .catch((err) => {
        res.send({ error: err.massage });
      });
  };
  

getDistrict = (req, res) => {
  knex("users")
    .then((data) => {
      const d = [];
      data.map((v) => {
        const valid = v.district;
        if (!d.includes(valid)) {
          d.push(valid);
        }
      });
      res.send({ district: d });
    })
    .catch((err) => {
      res.send({ error: err.massage });
    });
};

getAll = (req, res) => {
  knex("users")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ error: err.massage });
    });
};

module.exports = { insertData, login, logOut, getDistrict, getState, getAll };
