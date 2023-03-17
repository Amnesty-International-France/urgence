import type { NextApiRequest, NextApiResponse } from 'next'

import type { Setting } from '../settings'

import getPool from '../../../utils/dbpool'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Setting | null>
) {
  if (req.method === 'GET') {

    return handleGet(req, res);

  } else if (req.method === 'PUT') {

    return handlePut(req, res);
  }
}

async function handleGet(req: NextApiRequest,
  res: NextApiResponse<Setting | null>) {

  console.log(req.query.settingId)


  try {


    const result = await getPool().query({
      text: 'SELECT id, created_on, updated_on, type, content FROM settings WHERE id = $1;',
      values: [req.query.settingId],
    })

    if (result.rows.length == 0) {
      res.status(404).end();
      return;
    }

    res.status(200).json(result.rows[0]);
    return;

  } catch (err) {
    console.log(err)
  }


  res.status(200).end();

}


async function handlePut(req: NextApiRequest,
  res: NextApiResponse<Setting | null>) {

  console.log(req.query.settingId)

  console.log(req.body)

  // curl -X PUT -H "Content-Type: application/json" -d '{"content":"new content"}' http://localhost:3333/api/settings/1
  
  try {
    await getPool().query({
      text: 'UPDATE settings SET updated_on = NOW(), content = $1 WHERE id = $2;',
      values: [req.body.content, req.query.settingId],
    })

    const result = await getPool().query({
      text: 'SELECT id, created_on, updated_on, type, content FROM settings WHERE id = $1;',
      values: [req.query.settingId],
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
