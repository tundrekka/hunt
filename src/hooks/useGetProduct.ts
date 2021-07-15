import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FirebaseContext } from 'firebase/index'
import type { ProductWithId } from 'types/types';
import type { IFirebaseClass } from 'firebase/firebase'
import type { IFirebaseDocumentSnapShot } from 'types/auth'


// external function
const getProduct = async (id: string | undefined, firebaseDB: IFirebaseClass) => {
   const productoQuery = firebaseDB.db.collection('productos').doc(id)

   const productoResp = await productoQuery.get()
   
   if(!productoResp.exists) {
      throw new Error('no existe ese producto')
   } 

   // giving the object the Type
   const productTyped = {
      ...productoResp.data(),
      id: id
   } as ProductWithId
   return productTyped

}

// custom hook
export const useGetProduct = () => {
   const [error, setError] = useState(false)
   const [producto, setProducto] = useState<ProductWithId>({} as ProductWithId)
   const { firebaseDB, user } = useContext(FirebaseContext)
   const [dbChanged, setDbChanged] = useState(true)

   const router = useRouter()
   const { id } = router.query

   useEffect(() => {
      if( id ) {
         if( dbChanged ) {
            const productId = id as string | undefined
            getProduct(productId, firebaseDB)
            .then(setProducto)
            .catch((error) => {
               console.warn(error)
               setError(true)
            })
            .finally(() => {
               setDbChanged(false)
               console.log('ejcuta peticion')
            })
         }
      }

      return () => {}

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id, dbChanged])

   return {
      producto,
      error,
      user,
      router,
      firebaseDB,
      setProducto,
      setDbChanged
   }

} 