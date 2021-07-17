// import { Button } from 'components/ui/Button'
// import { LoadPostsContext } from 'context/LoadPostsContext'
// import { PostContext } from 'context/PostContext'
import { ProductContext } from 'context/ProductsContext'
import { paginationNext } from 'hooks/useProducts'
// import { paginationNext } from 'helpers/loadPosts'
import { useContext, useState, useEffect } from 'react'
// import { Spinner } from './utils/Spinner'

export const PaginationData: React.FC = () => {
   const { products, noMoreData ,setProducts, setNoMoreData } = useContext(ProductContext)
   const [ isDataLoading, setIsDataLoading ] = useState(false)
   const handlePagination = () => {
      paginationNext(products, setProducts, setIsDataLoading, setNoMoreData)
   }
   useEffect(() => {
      (products.length === 0) ? setIsDataLoading(true) : setIsDataLoading(false)
   }, [products.length])
   
   return (
      <div style={{ textAlign: 'center', marginTop: '.25em', marginBottom: '.25em' }}>

         { isDataLoading 
            // if is fetching Data show the spinner
            ? (
            <div style={{height: '1.8em', position: 'relative'}}>
               {/* <Spinner /> */}
               <h4>loading data</h4>
            </div>
            ) 
            // else if...
            : (!isDataLoading && !noMoreData) 
            ? (
               <button disabled={isDataLoading} onClick={handlePagination}>
                  Load More Data!
               </button>
            )
            // else if...
            : (noMoreData) && (<h4>No more Data</h4>)
            
         }

      </div>
   )
}
