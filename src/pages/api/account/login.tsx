// next
import { NextApiRequest, NextApiResponse } from 'next'
// import { users, JWT_SECRET, JWT_EXPIRES_IN } from '@/_simplification/_account'
import { users, JWT_SECRET } from '@/_simplification/_account'

import * as jose from 'jose';
// ----------------------------------------------------------------------


 export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse) 
{
    const {
        method,
        body: { email, password },
        // query,
      } = req;
  
    switch (method) {
        case "POST":
            try {
                const user = users.find((_user: any) => _user.email === email);

                if (!user) {
                    console.log('user', user)
                    return res.status(400).json({
                        message: 'Wrong authorization data.',
                    });
                }

                if (user.password !== password) {
                    return res.status(400).json({ message: 'Wrong authorization data.' });
                }

                const accessToken = await new jose.SignJWT({ userId: user.id })
                        .setProtectedHeader({ alg: 'HS256' })
                        .setIssuedAt()
                        .setExpirationTime('1d')
                        .sign(new TextEncoder().encode(JWT_SECRET))
                        //.sign(new TextEncoder().encode(`secret-key-phrase`))
                // const accessToken = sign({ userId: user.id }, JWT_SECRET, {
                //     expiresIn: JWT_EXPIRES_IN,
                // const accessToken = 'sdfsdfdsdf'
                // });

                res.status(200).json({ accessToken, user });                
            } catch (error: any) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            break
        default:
            return res.status(400).json({ message: `Method are [${method}] not supported`});
    }
}