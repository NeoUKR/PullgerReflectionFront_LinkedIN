const pool = require("./db");

export async function companyCount() {
  // console.log('Executing count.')
  const res =  await pool.query(`SELECT count(uuid) FROM com_linkedin_companies;`)
  // console.log('Query execute', res)
  return res
}

export async function companyProfileGet(uuid:any) {
  const res = await pool.query(`SELECT * FROM com_linkedin_companies WHERE uuid = $1`, [uuid])
  return res
}