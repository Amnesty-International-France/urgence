import type { NextApiRequest, NextApiResponse } from 'next'

import getPool from '../../utils/dbpool'

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Setting>
) {
  if (req.method === 'GET') {

    const result = await getPool().query({
      text: 'SELECT id, created_on, updated_on, type, content from settings;',
    })

    res.status(200).json({
      total: result.rows.length,
      data: result.rows
    });

  } else if (req.method === 'POST') {

    return handlePost(req, res);

  } else {
    res.status(405)
  }
}


async function handlePost(req: NextApiRequest,
  res: NextApiResponse<Data | Setting>) {

  console.log(req.query.settingId)

  console.log(req.body)

  // curl -X POST -H "Content-Type: application/json" -d '{"type": "new type", content":"new content"}' http://localhost:3333/api/settings

  try {
    const result = await getPool().query({
      text: 'INSERT INTO settings (type, content) VALUES ($1, $2) RETURNING id;',
      values: [req.body.type, req.body.content],
    })

    if (result.rows.length == 0) {
      res.status(404).end();
      return;
    }

    console.log(result)

    res.status(200).json(result.rows[0]);

  } catch (err) {
    console.log(err)
  }


  res.status(200).end();

}