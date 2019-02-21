import * as functions from 'firebase-functions'
import { createAccount } from './account/create'
import * as cors from 'cors'

const corsHandler = cors({ origin: true })

export const newUser = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const account = await createAccount(req)
      res.status(200).send({ error: null, data: account })
    } catch (err) {
      res.status(500).send({ error: err, data: null })
    }
  })
})
