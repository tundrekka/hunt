import type { SetStateAction } from 'react'
import Router from 'next/router'
import { firebaseDB } from 'firebase/index'
import { isFirebaseError } from './isFirebaseError'

export const startLogin = async (
   email: string,
   password: string,
   setErrorFirebase: React.Dispatch<SetStateAction<string | null>>
) => {
   try {
      const user = await firebaseDB.login(email, password)
      console.log(user)
      Router.push('/')
   } catch (error) {
      console.log('error logueando')
      if(isFirebaseError(error)) {
         setErrorFirebase(error.message)
      }
   }
}
