import { firebaseDB } from 'firebase/index'
import type { TQueryDocumentSnapShot } from 'types/auth'
import type { ProductWithId } from 'types/types'
import type { IOrderBy } from 'types/types'

// external function
// let lastDocument: any = null

// ****
interface IPaginationProps {
   (
      posts: ProductWithId[],
      setPosts: React.Dispatch<React.SetStateAction<ProductWithId[]>>,
      setIsPostsLoading: React.Dispatch<React.SetStateAction<boolean>>,
      setNoMorePosts: React.Dispatch<React.SetStateAction<boolean>>,
      lastDoc: any,
      orderB: IOrderBy
   ): Promise<TQueryDocumentSnapShot>
}

// let lastDocument: any
export const paginationNext: IPaginationProps = async (
   posts,
   setPosts,
   setIsPostsLoading,
   setNoMorePosts,
   lastDoc,
   orderB
) => {
   setIsPostsLoading(true)
   const postsSnap = await firebaseDB.db
      .collection('productos')
      .orderBy(orderB || 'creado', 'desc')
      .startAfter(lastDoc)
      .limit(5)
      .get()

   // lastDocument = postsSnap.docs[postsSnap.docs.length - 1] || null
   const lastSnapDoc = postsSnap.docs[postsSnap.docs.length - 1] || null

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

   return lastSnapDoc
}
