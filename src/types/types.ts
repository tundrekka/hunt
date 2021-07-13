

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