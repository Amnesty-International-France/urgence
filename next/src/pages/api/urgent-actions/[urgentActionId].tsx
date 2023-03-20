import type { NextApiRequest, NextApiResponse } from 'next'

import type { UrgentAction } from '../urgent-actions'

import getPool from '../../../utils/dbpool'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UrgentAction | null>
) {
    if (req.method === 'GET') {

        return handleGet(req, res);

    } else if (req.method === 'PUT') {

        return handlePut(req, res);

    } else if (req.method === 'DELETE') {

        return handleDelete(req, res);
    }
}


async function handleGet(req: NextApiRequest,
    res: NextApiResponse<UrgentAction | null>) {

    try {
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
              FROM urgent_action
              WHERE id = $1;`,
            values: [req.query.urgentActionId],
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
    res: NextApiResponse<UrgentAction | null>) {

    // curl -X PUT -H "Content-Type: application/json" -d '{"content":"new content"}' http://localhost:3333/api/settings/1

    const origin_code = '';

    try {
        await getPool().query({
            text: `UPDATE urgent_action SET 
                    title = $1,
                    story = $2,
                    last_edition_date = NOW(),
                    call_to_action = $3,
                    email_thank = $4,
                    end_thank = $5,
                    slug = $6,
                    register = $7,
                    campaign_code = $8,
                    origin_code = $9,
                    is_default = $10,
                    message = $11,
                    social_metadata = $12
                    WHERE id = $13;`,
            values: [req.body.title,
            JSON.stringify(req.body.story),
            req.body.call_to_action,
            req.body.email_thank,
            req.body.end_thank,
            req.body.slug,
            req.body.register,
            req.body.campaign_code,
            req.body.origin_code,
            req.body.is_default,
            req.body.message,
            req.body.social_metadata,
            req.query.urgentActionId],
        })

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
              FROM urgent_action
              WHERE id = $1;`,
            values: [req.query.urgentActionId],
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

async function handleDelete(req: NextApiRequest,
    res: NextApiResponse<UrgentAction | null>) {

    console.log(req.query.settingId)


    try {


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
              FROM urgent_action
              WHERE id = $1;`,
            values: [req.query.urgentActionId],
        })
        if (result.rows.length == 0) {
            res.status(404).end();
            return;
        }

        await getPool().query({
            text: 'DELETE FROM urgent_action WHERE id = $1;',
            values: [req.query.urgentActionId],
        }).catch((err) => {
            res.status(500).end();
            return;
        })

        res.status(200).json(result.rows[0]);
        return;

    } catch (err) {
        console.log(err)
    }


    res.status(200).end();

}
