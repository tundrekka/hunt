

// create account form
export type CreateAccInitialState = { nombre: string; email: string; password: string }
export interface CreateAccErrors {
   nombre?: string
   email?: string
   password?: string
}