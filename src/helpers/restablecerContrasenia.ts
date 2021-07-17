import type { SetStateAction } from 'react'
import Router from 'next/router'
import { firebaseDB } from 'firebase/index'
import { isFirebaseError } from './isFirebaseError'

export const restablecerPassword = async (
   email: string,
   setErrorFirebase: React.Dispatch<SetStateAction<string | null>>
) => {
   try {
      const user = await firebaseDB.startNewPassword(email)
      console.log('emailenviadl', user)
      // Router.push('/')
   } catch (error) {
      console.log('error reseteando password')
      if(isFirebaseError(error)) {
         console.log(error)
         setErrorFirebase(error.message)
      }
   }
}