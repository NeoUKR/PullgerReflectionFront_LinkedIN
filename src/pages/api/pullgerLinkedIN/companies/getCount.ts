
import type { NextApiRequest, NextApiResponse } from "next";
import { companyCount } from "@/db/companies"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log('Api count start.')
  try {
    const resultDBquery = await companyCount()
    // console.log('DB responce: ', resultDBquery)
    return res.status(200).json(resultDBquery.rows[0])
  } catch ( error: any) {
    console.log(error)
    return res.status(400).json({ message: 'Internal error'})
  }


    // const [response] = await Promise.all([test()])

    // console.log(response)

    // res.status(200).json({message: "Pong!"})
  // res.status(200).json({ message: "Pong!", time: response.rows[0].now });
  // res.status(200).json(response.rows)
  // console.log(allTodos.rows)
}