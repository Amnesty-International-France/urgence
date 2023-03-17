import type { NextApiRequest, NextApiResponse } from 'next'

import type { Setting } from '../settings'

import { Client } from 'pg'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Setting | null>
) {
  if (req.method === 'GET') {
    console.log(req.query.settingId)

    const client = new Client({
      host: 'db',
      database: 'reaction-rapide',
      port: 5432,
      user: 'amnesty',
      password: 'amnesty',
    })

    await client.connect()


    try {
      const result = await client.query({
        text: 'SELECT id, created_on, updated_on, type, content FROM settings WHERE id = $1;',
        values: [req.query.settingId],
      })
      
      if (result.rows.length == 0) {
        res.status(404).end();
        await client.end()
        return;
      }
      
      res.status(200).json(result.rows[0]);
      await client.end()
      return;

    } catch (err) {
      console.log(err)
    }

    await client.end()
    


    //   console.log(result.fields[0].name) // one
    //   console.log(result.fields[1].name) // two
    //   console.log(result.rows) // [ [ 1, 2 ] ]

    // client
    //   .connect()
    //   .then(() => console.log('connected'))
    //   .catch((err) => console.error('connection error', err.stack))

    

    res.status(200).end();

  } else {
    res.status(405).end();
  }
}
