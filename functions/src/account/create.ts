import { createUser } from './firebase'
import { client } from '../graphql/graphql_client'
import { addUser } from '../graphql/mutations'

export const createAccount = async (req: any) => {
  const { firstName, lastName, email, password } = req.body

  const user = await createUser({ email, password })
  if (user && user.uid) {
    const hasuraUser = await client.request(addUser, {
      uid: user.uid,
      email,
      name: `${firstName} ${lastName}`
    })
    if (hasuraUser) {
      return user
    } else {
      throw new Error('Error creating hasura user')
    }
  } else {
    throw new Error('Error creating firebase user')
  }
}
