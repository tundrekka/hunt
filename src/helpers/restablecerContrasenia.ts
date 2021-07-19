import type { SetStateAction } from 'react'
import { firebaseDB } from 'firebase/index'
import { isFirebaseError } from './isFirebaseError'
import React from 'react'

export const restablecerPassword = async (
   email: string,
   setErrorFirebase: React.Dispatch<SetStateAction<string | null>>,
   setEmailSent: React.Dispatch<SetStateAction<boolean>>,
   resetForm: () => void
) => {
   try {
      await firebaseDB.startNewPassword(email)
      setEmailSent(true)
      setErrorFirebase(null)
      resetForm()
   } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('error reseteando password')
      if(isFirebaseError(error)) {
         setErrorFirebase(error.message)
      }
   }
}