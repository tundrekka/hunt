import styled from 'styled-components'
import { ProductDetails } from 'components/inicioPage/ProductDetails'
import { Producto } from 'components/inicioPage/productDetails.styles'
import { PaginationData } from 'components/utils/Pagination'
import loadDB from 'firebase/loadDB'
import { ProductWithId } from 'types/types'
import { InferGetServerSidePropsType } from 'next'
import { handleSnapshot } from 'helpers/handleSnapshot'
import { useSSRPagination } from 'hooks/useSSRPagination'
import { ProductContext } from 'context/ProductsContext'
import { useContext, useEffect } from 'react'

export const getServerSideProps = async () => {
   const firebase = await loadDB()
   const db = firebase.firestore()

   let result: ProductWithId[] = await new Promise((res, rej) => {
      // let resp = []
      db.collection('productos')
         .orderBy('votos', 'desc')
         .limit(5)
         .get()
         .then((snapShot) => {
            const productosResp = handleSnapshot(snapShot)
            res([...productosResp])
         })
         .catch((err) => {
            console.log(err)
            rej([])
         })
   })
   // console.log(result);

   return {
      props: {
         result,
      },
   }
}
// styled Components
const ProductsList = styled.div`
   padding: 0.5em;
   @media (min-width: 768px) {
      padding: 1em;
   }
   padding-top: 0;
   background-color: #2f2f2f;
`

export default function Populares({
   result,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
   const { products, last } = useSSRPagination(result)

   const { loadingSSR, setLoadingSSR } = useContext(ProductContext)
   useEffect(() => {
      setLoadingSSR(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   // const products = useProducts('votos')
   return (
      <>
         <ProductsList>
            <ul>
               {loadingSSR &&
                  [1, 2, 3, 4, 5].map((item, idx) => <Producto key={idx} />)}
                  
               {products.length !== 0
                  ? products.map((product, idx) => (
                       <ProductDetails
                          product={product}
                          key={`${product.id}--${idx}`}
                       />
                    ))
                  : [1, 2, 3, 4].map((item, idx) => <Producto key={idx} />)}
            </ul>
            <PaginationData orderBy="votos" lastDoc={last} />
         </ProductsList>
      </>
   )
}
