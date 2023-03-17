// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Guy = {
  id: string
  name: string
}
type Data = {
  total: number
  data: Array<Guy>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
      total: 4,
      data: [
        { id: 'tb', name: 'Thomas B.' },
        { id: 'tm', name: 'Thomas A.' },
        { id: 'aj', name: 'Alexis' },
        { id: 'jbo', name: 'Jean-Baptiste' },
      ]
  });
}
