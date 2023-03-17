// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type Setting = {
  id?: number;
  created_on: string;
  updated_on: string;
  type: string;
  content: string;
};



type Data = {
  total: number
  data: Array<Setting>
}

import { Client } from 'pg'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {

    const client = new Client({
      host: 'db',
      database: 'reaction-rapide',
      port: 5432,
      user: 'amnesty',
      password: 'amnesty',
    })
    await client.connect()
    const result = await client.query({
      text: 'SELECT id, created_on, updated_on, type, content from settings;',
    })

    //   console.log(result.fields[0].name) // one
    //   console.log(result.fields[1].name) // two
    //   console.log(result.rows) // [ [ 1, 2 ] ]

    // client
    //   .connect()
    //   .then(() => console.log('connected'))
    //   .catch((err) => console.error('connection error', err.stack))

    await client.end()

    res.status(200).json({
      total: result.rows.length,
      data: result.rows
    });

  } else {
    res.status(405)
  }
}
