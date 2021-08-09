import { useContext, useState, useEffect } from 'react'
import { ProductContext } from 'context/ProductsContext'
import { paginationNext } from 'hooks/useProducts'
import styled from 'styled-components'

const StyledButton = styled.button`
   text-align: center;
   cursor: pointer;
   font-weight: 700;
   text-transform: uppercase;
   border: 0.75px solid #d1d1d1;
   color: white;
   background: limegreen;
   padding: 0.8rem 1.5rem;
   margin-top: 0.5rem;
`

export const PaginationData: React.FC = () => {
   const { products, setProducts } = useContext(ProductContext)
   const [isDataLoading, setIsDataLoading] = useState(false)
   const [noMoreData, setNoMoreData] = useState(false)
   const handlePagination = () => {
      paginationNext(
         products,
         setProducts,
         setIsDataLoading,
         setNoMoreData,
         products[products.length - 1] || null,
         'creado'
      )
   console.log(products[products.length - 1]);
   }
   useEffect(() => {
      products.length === 0 ? setIsDataLoading(true) : setIsDataLoading(false)
   }, [products.length])

   return (
      <div
         style={{
            textAlign: 'center',
            marginTop: '.25em',
            marginBottom: '.25em',
         }}
      >
         {isDataLoading ? (
            // if is fetching Data show the spinner
            <div style={{ height: '1.8em', position: 'relative' }}>
               {/* <Spinner /> */}
               <h4>loading data</h4>
            </div>
         ) : // else if...
         !isDataLoading && !noMoreData ? (
            <div style={{ textAlign: 'center' }}>
               <StyledButton
                  disabled={isDataLoading}
                  onClick={handlePagination}
               >
                  More Products!
               </StyledButton>
            </div>
         ) : (
            // else if...
            noMoreData && <h4>No more Products</h4>
         )}
      </div>
   )
}
