const pool = require("./db");

export async function sendCompliesStatus(inUUID:string, inStatus:boolean) {
  const resultQuery = await pool.query(
    `UPDATE
        com_linkedin_companies SET "complies_parameters" = $2
    WHERE uuid = $1`, [inUUID, inStatus])

  return resultQuery
}