import { Router } from 'express'

const routes = Router()

routes.post('/certifications', async (req, res) => {
    await req.producer.send({
        topic: 'issue-certifications',
        messages: [
            { 
                value: JSON.stringify(req.body)
            },
        ],
    })

    return res.json({ ok: true })
})

export default routes;
