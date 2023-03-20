import type { NextApiRequest, NextApiResponse } from 'next'

import getPool from '../../utils/dbpool'


// type Position = {
//   x: number;
//   y: number;
// };

// export type SocialMetadata = {
//   title: string;
//   description: string;
//   medium: {
//     src: ImageUpload;
//   };
// };


// type Medium = {
//   title: string;
//   src: ImageUpload;
//   crop?: Crop;
// };

// type CropDesktop = {
//   unit: string;
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// };

// type MediumDesktop = {
//   title: string;
//   src: ImageUpload;
//   crop?: CropDesktop;
// };

// type DisplayOptions = {
//   mediumPosition?: Position;
//   backgroundColor?: Color;
//   color?: Color;
//   position?: string;
// };

// type Share = { message: string; twitter_message: string };

// type Telegram = { url: string; message: string };

// export type StoryStep = {
//   content: String;
//   medium?: Medium;
//   mediumDesktop?: MediumDesktop;
//   displayOptions?: DisplayOptions;
// };

export type UrgentAction = {
  // TODO
  id: string;
  title: string;
  slug: string;
  is_default: boolean;
  campaign_code: string;
  origin_code: string;

  call_to_action: string; // TODO Verify if this is a string or a Object
  register: string; // TODO Verify if this is a string or a Object
  end_thank: string; // TODO Verify if this is a string or a Object
  creation_date: string; // TODO Verify if this is a string or a Object
  last_edition_date?: string; // TODO Verify if this is a string or a Object
  response_count: number;

  // story: StoryStep[];
  // social_metadata: SocialMetadata;
  // email_thank: {
  //   title: string;
  //   text: string;
  //   button: string;
  //   share: Share;
  //   telegram: Telegram;
  // };
  message: {
    text_view: string;
    text_send: string;
    button_view: string;
    button_send: string;
    object_indication: string;
    object_example: string;
    message_template: { value: string }[]; // TODO
    recipient: {
      // TODO
      postal_address: string;
    };
  };
};



type Data = {
  total: number
  data: Array<UrgentAction>
}




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | UrgentAction>
) {
  if (req.method === 'GET') {

    const result = await getPool().query({
      text: `SELECT 
          id,
          title,
          story,
          creation_date,
          last_edition_date,
          call_to_action,
          email_thank,
          end_thank,
          slug,
          register,
          campaign_code,
          origin_code,
          is_default,
          message,
          social_metadata,
          response_count
        FROM urgent_action;`,
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
  res: NextApiResponse<Data | UrgentAction>) {

  console.log(req.query.settingId)

  console.log(req.body)

  // curl -X POST -H "Content-Type: application/json" -d '{"title": "new title"}' http://localhost:3333/api/urgent-actions
  const origin_code = '';

  try {
    const result = await getPool().query({
      text: `INSERT INTO urgent_action (
          title,
          slug,
          is_default,
          campaign_code,
          origin_code,
          story,
          call_to_action,
          message,
          email_thank,
          end_thank,
          register,
          social_metadata
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id;
          `,
      values: [req.body.title,
      req.body.slug,
      req.body.is_default,
      req.body.campaign_code,
        origin_code,
      JSON.stringify(req.body.story),
      req.body.call_to_action,
      req.body.message,
      req.body.email_thank,
      req.body.end_thank,
      req.body.register,
      req.body.social_metadata,
      ],
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