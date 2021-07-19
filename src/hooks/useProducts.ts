import { useContext, useEffect } from 'react'
import { FirebaseContext, firebaseDB } from 'firebase/index'
import type { IFirebaseSnapShot } from 'types/auth'
import type { ProductWithId } from 'types/types'
import type { IOrderBy } from 'types/types'
import { ProductContext } from 'context/ProductsContext'



// external function
let lastDocument: any = null

const handleSnapshot = (snapShot: IFirebaseSnapShot) => {
   lastDocument = snapShot.docs[snapShot.docs.length - 1] || null
   const products = snapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
   }))
   return products as ProductWithId[]
}

let orderByProp: any
export const useProducts = (orden: IOrderBy) => {
   orderByProp = orden
   const { firebaseDB } = useContext(FirebaseContext)
   const { products: productos ,setProducts: setProductosContext } = useContext(ProductContext)

   useEffect(() => {
      const getProducts = () => {
         firebaseDB.db.collection('productos')
            .orderBy(orden, 'desc')
            .limit(5)
            .onSnapshot((snapShot) => {
               const productosResp = handleSnapshot(snapShot)
               setProductosContext(productosResp)
            })
      }
      getProducts()

      return () => {}
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   // console.log(lastDocument)
   // console.log(orderByProp)
   return productos
}


// ****
interface IPaginationProps {
   (
      posts: ProductWithId[],
      setPosts: React.Dispatch<React.SetStateAction<ProductWithId[]>>,
      setIsPostsLoading: React.Dispatch<React.SetStateAction<boolean>>,
      setNoMorePosts: React.Dispatch<React.SetStateAction<boolean>>
   ): Promise<void>
}

export const paginationNext: IPaginationProps = async (
   posts,
   setPosts,
   setIsPostsLoading,
   setNoMorePosts
) => {
   setIsPostsLoading(true)
   const postsSnap = await firebaseDB.db
      .collection('productos')
      .orderBy(orderByProp, 'desc')
      .startAfter(lastDocument)
      .limit(5)
      .get()

   lastDocument = postsSnap.docs[postsSnap.docs.length - 1] || null

   const postsToConcatenate: any[] = []

   postsSnap.forEach((snapChild) => {
      postsToConcatenate.push({
         id: snapChild.id,
         ...snapChild.data(),
      })
   })

   // giving the type
   const arrayOfPosts: ProductWithId[] = postsToConcatenate

   if (arrayOfPosts.length === 0) {
      setNoMorePosts(true)
   }
   setIsPostsLoading(false)
   setPosts([...posts, ...arrayOfPosts])
}