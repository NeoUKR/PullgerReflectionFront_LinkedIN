import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const conn = await openDB
  // const response = await pool.query("SELECT NOW()");
  // console.log(response.rows);

  // res.status(200).json({ message: "Pong!", time: response.rows[0].now });

  // const allTodos = await pool.query(`SELECT * FROM com_linkedin_companies
  //           WHERE 
  //           industry in (
  //             'IT SYSTEM CUSTOM SOFTWARE DEVELOPMENT', 
  //             'IT SERVICES AND IT CONSULTING', 
  //             'SOFTWARE DEVELOPMENT',
  //             'TECHNOLOGY, INFORMATION AND INTERNET'
  //             'IT SERVICES AND IT CONSULTING',
  //             'INFORMATION SERVICES',
  //             'BUSINESS CONSULTING AND SERVICES'
  //             'COMPUTER NETWORKING PRODUCTS',
  //             'DATA INFRASTRUCTURE AND ANALYTICS',
  //             'TECHNOLOGY, INFORMATION AND INTERNET',
  //             'TECHNOLOGY, INFORMATION AND MEDIA',
  //             'INFORMATION TECHNOLOGY & SERVICES'
  //             )
  //           and not "countryISO" in ('UA', 'BY', 'RU', 'KZ', 'AE', 'ZA', 'TR', 'KG', 'BZ', 'CY', 'IN', 'HK', 'AM', 'QA', 'MY', 'CN', 'UZ')
  //           and "sendToCustomer" is NULL
  //           and ("complies_parameters" <> false or "complies_parameters" is null)
  //           LIMIT 40;`)


  //   const response = await conn.query("SELECT NOW()");
//   console.log(response.rows);
    // const [response] = await Promise.all([test()])

    // console.log(response)

    // res.status(200).json({message: "Pong!"})
  // res.status(200).json({ message: "Pong!", time: response.rows[0].now });
  // res.status(200).json(response.rows)
  // console.log(allTodos.rows)

  const {
    method,
    body,
    query: { uuid },
  } = req;

  switch (method) {
    case "PUT":
      try {
        const { status} = body;
        
        console.log('uuid: ', uuid)
        console.log('status: ', status)
        res.status(200).json({status: status, uuid: uuid})
    
      } catch (error: any) {
        return res.status(400).json({ message: `error: ${error.message}` });  
      }
      break
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
}