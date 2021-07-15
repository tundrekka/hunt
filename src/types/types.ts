

// create account form
export type CreateAccInitialState = { nombre: string; email: string; password: string }
export interface CreateAccErrors {
   nombre?: string
   email?: string
   password?: string
}

// login form
export type LoginInitialState = { email: string, password: string }
export interface LoginErrors {
   email?: string
   password?: string
}

// create product form
export type NewProductForm = {
   nombre: string,
   empresa: string,
   imagen: string,
   url: string,
   descripcion: string
}
export interface NewProductErrors {
   nombre?: string,
   empresa?: string,
   imagen?: string,
   url?: string,
   descripcion?: string
}


// 
type Comentario = {
   mensaje: string,
   userId: string | null | undefined,
   userNombre: string | null | undefined
}


export type Product = NewProductForm & {
   votos: number,
   comentarios: Array<Comentario>,
   creado: string | number
   creador: {
      id: string,
      nombre: string | null
   },
   haVotado: string[]

}

// final Product
export type ProductWithId = Product & {id: string}

export type IOrderBy = | 'votos' | 'creado'