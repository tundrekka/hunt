import styled from 'styled-components'
import { ProductDetails } from 'components/inicioPage/ProductDetails'
import { useProducts } from 'hooks/useProducts'

const ProductsList = styled.div`
   padding: 1em;
   background-color: #2f2f2f;
`

export default function Home() {

   const products = useProducts('creado')

   return (
      <>
         <ProductsList>
            <ul>
               {
                  products.map((product, idx )=> (
                     <ProductDetails product={product}  key={`${product.id}--${idx}`} />
                  ))
               }
            </ul>
         </ProductsList>
      </>
   )
}