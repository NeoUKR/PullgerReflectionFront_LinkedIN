const pool = require("./db");

export async function test() {
  const res =  await pool.query(`SELECT * FROM com_linkedin_companies
            WHERE 
            industry in (
              'IT SYSTEM CUSTOM SOFTWARE DEVELOPMENT', 
              'IT SERVICES AND IT CONSULTING', 
              'SOFTWARE DEVELOPMENT',
              'TECHNOLOGY, INFORMATION AND INTERNET'
              'IT SERVICES AND IT CONSULTING',
              'INFORMATION SERVICES',
              'BUSINESS CONSULTING AND SERVICES'
              'COMPUTER NETWORKING PRODUCTS',
              'DATA INFRASTRUCTURE AND ANALYTICS',
              'TECHNOLOGY, INFORMATION AND INTERNET',
              'TECHNOLOGY, INFORMATION AND MEDIA',
              'INFORMATION TECHNOLOGY & SERVICES'
              )
            and not "countryISO" in ('UA', 'BY', 'RU', 'KZ', 'AE', 'ZA', 'TR', 'KG', 'BZ', 'CY', 'IN', 'HK', 'AM', 'QA', 'MY', 'CN', 'UZ')
            and "sendToCustomer" is NULL
            and ("complies_parameters" <> false or "complies_parameters" is null);`)
  return res
}