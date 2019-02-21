import * as admin from 'firebase-admin'

export const app = admin.initializeApp()

export const createUser = async ({ email, password }) => {
  const user = await app.auth().createUser({
    email,
    password
  })
  if (user.uid) {
    const customClaims = {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['manager', 'user'],
        'x-hasura-default-role': 'manager',
        'x-hasura-user-id': user.uid
      }
    }

    await app.auth().setCustomUserClaims(user.uid, customClaims)
    return user
  } else {
    throw new Error('Error creating firebase user')
  }
}
