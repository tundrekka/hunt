import { firebaseDB } from 'firebase/index'
import { useEffect, useState } from 'react'
import type { IFirebaseUser } from 'types/auth' 
export const useVerifyAuth = () => {
   const [userAuthenticated, setUserAuthenticated] = useState<IFirebaseUser | null>(null)
   const [checking, setChecking] = useState(true)
   useEffect(() => {
      const unsuscribe = firebaseDB.auth.onAuthStateChanged((user) => {
         if(user) {
            setUserAuthenticated(user)
         } else {
            setUserAuthenticated(null)

         }
         setChecking(false)
      })
      return () => unsuscribe()
   }, [])

   return {
      userAuthenticated,
      checking
   }

}