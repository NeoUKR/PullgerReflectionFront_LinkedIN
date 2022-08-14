const pool = require("./db");

export async function peopleCount() {
  // console.log('Executing count.')
  const res =  await pool.query(`SELECT count(uuid) FROM com_linkedin_people;`)
  // console.log('Query execute', res)
  return res
}