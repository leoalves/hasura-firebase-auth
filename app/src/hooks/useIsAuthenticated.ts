import { useState, useEffect } from 'react'
import firebase from '../firebase'

const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated]: [
    undefined | Boolean,
    React.Dispatch<React.SetStateAction<any>>
  ] = useState(undefined)

  const getToken = async (user: firebase.User) => {
    const token = user ? await user.getIdToken(true) : undefined
    return token
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const token: any = await getToken(user)
        if (token) {
          localStorage.setItem('token', token)
        }
      } else {
        localStorage.removeItem('token')
      }
      setIsAuthenticated(user ? true : false)
    })
  }, [])

  return isAuthenticated
}

export default useIsAuthenticated
