import type { NextApiRequest, NextApiResponse } from "next";
import { companyProfileGet } from "@/db/companies"
import _mock from '@/_mock';
import { randomNumberRange, randomInArray } from '@/_mock/funcs';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const {
    method,
    body,
    query: { uuid },
  } = req;

  switch (method) {
    case "GET":
      try {
        const { status } = body;
        
        // console.log('uuid: ', uuid)
        // res.status(200).json({uuid: uuid})
        // await Promise.all([test()])
        // companyProfileGet
        
        const queryResult = await companyProfileGet( uuid )

        if ( queryResult.rows.length == 1 ) {
          return res.status(200).json(
            {
              id: _mock.id(1),
              name: queryResult.rows[0].name,
              overview: queryResult.rows[0].overview,
              cover: _mock.image.cover(1),
              position: '',
              follower: queryResult.rows[0].followers,
              following: '',
              quote: queryResult.rows[0].discription,
              country: queryResult.rows[0].countryISO,
              email: null,
              company: null,
              school: null,
              role: null,
              card_type: queryResult.rows[0].card_type,
              employee_linkedin: queryResult.rows[0].employee_linkedin,
              company_size: queryResult.rows[0].company_size,
              industry: queryResult.rows[0].industry,
              webLink: queryResult.rows[0].url_company,
              facebookLink: ``,
              instagramLink: ``,
              linkedinLink: `https://${queryResult.rows[0].url}`,
              twitterLink: ``,
            }
          )
        } else {
          return res.status(400).json({ message: "Internal Error" })
        }

      } catch (error: any) {
        return res.status(400).json({ message: `error: ${error.message}` })
      }
      break
    default:
      return res.status(400).json({ message: "Method are not supported" })
  }
}