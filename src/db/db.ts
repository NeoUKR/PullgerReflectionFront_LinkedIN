import { Pool } from "pg"

// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "linkedin_soft2",
//   password: "Xr9dts",
//   host: "10.0.0.111",
//   port: 5432,
//   database: "linkedin_soft2",
//   ssl: {
//     rejectUnauthorized: false,
//   }
// });

const pool = new Pool({
  user: "linkedin",
  password: "RsTj8o0jtHBHkpTDh8EP",
  host: "database-2.c5mxxchqnurh.us-east-1.rds.amazonaws.com",
  port: 5432,
  database: "linkedin_softline",
  ssl: {
    rejectUnauthorized: false,
  }
});

module.exports = pool;