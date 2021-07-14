

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

export type Product = NewProductForm & {
   votos: number,
   comentarios: Array<any>,
   creado: string | number
}