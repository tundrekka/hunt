import { createContext, SetStateAction } from "react";
import { ProductWithId } from 'types/types'
export interface IContext {
   products: ProductWithId[],
   setProducts: React.Dispatch<SetStateAction<ProductWithId[]>>,
   noMoreData: boolean,
   setNoMoreData: React.Dispatch<SetStateAction<boolean>>
}

export const ProductContext = createContext<IContext>({} as IContext)