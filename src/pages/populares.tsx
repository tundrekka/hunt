import styled from 'styled-components'
import { ProductDetails } from 'components/inicioPage/ProductDetails'
import { useProducts } from 'hooks/useProducts'
import type { IOrderBy } from 'types/types'
import { Producto } from 'components/inicioPage/productDetails.styles'

// styled Components
const ProductsList = styled.div`
   padding: .5em;
   @media (min-width: 768px) {
      padding: 1em;
   }
   padding-top: 0;
   background-color: #2f2f2f;
`

export default function Home() {

   const products = useProducts('votos')
   return (
      <>
         <ProductsList>
            <ul>
               {
                  (products.length !== 0) ? (
                     products.map((product, idx )=> (
                        <ProductDetails product={product}  key={`${product.id}--${idx}`} />
                     ))
                  )
                  : (
                     [1,2,3,4].map((item, idx) => (
                        <Producto key={idx} />
                     ))
                  )
               }
            </ul>
         </ProductsList>
      </>
   )
}