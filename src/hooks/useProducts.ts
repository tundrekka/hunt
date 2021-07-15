import { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from 'firebase/index'
import type { IFirebaseSnapShot } from 'types/auth'
import type { ProductWithId } from 'types/types'
import type { IOrderBy } from 'types/types'



// external function
const handleSnapshot = (snapShot: IFirebaseSnapShot) => {
   const products = snapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
   }))
   return products as ProductWithId[]
}

export const useProducts = (orden: IOrderBy) => {
   const [products, setProducts] = useState<ProductWithId[]>([])
   const { firebaseDB } = useContext(FirebaseContext)

   useEffect(() => {
      const getProducts = () => {
         firebaseDB.db.collection('productos').orderBy(orden, 'desc').onSnapshot((snapShot) => {
            const productosResp = handleSnapshot(snapShot)
            setProducts(productosResp)
         })
      }
      getProducts()

      return () => {
         console.log('desmonatao')
      }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return products

}

