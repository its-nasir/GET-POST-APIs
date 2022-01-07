require("dotenv").config();
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.host,
    user: process.env.user,
    database: process.env.database,
    password: process.env.password,
  },
});

knex.schema
  .createTable("users", (table) => {
    table.increments("id");
    table.string("username");
    table.string("password");
    table.string("Name");
    table.string("Sex");
    table.string("DOB");
    table.string("Father's Name");
    table.string("Mother's Name");
    table.string("state");
    table.string("district");
  })
  .then(() => {
    console.log("table create");
  })
  .catch((err) => {
    console.log("table allready exists");
  });

module.exports = knex;
