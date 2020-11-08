const knexconfig = require("../knexfile")["main"];

module.exports = require("knex")(knexconfig);
