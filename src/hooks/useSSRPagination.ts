import { ProductContext } from "context/ProductsContext";
import { getProductId } from "helpers/getProductId";
import { useContext, useState, useEffect } from "react";

export const useSSRPagination = (result: any) => {
   const {products,setProducts} = useContext(ProductContext)
   const [last, setLast] = useState<any>('')

   useEffect(() => {
      setProducts([...result])
      return () => {}
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if(result.length > 1) {
         getProductId(result[result.length -1].id).then((product) => {
            setLast(product)
         })
         
      }
   }, [result]);
   return {
      products,
      last
   }
}
