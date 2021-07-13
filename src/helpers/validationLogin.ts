import type { LoginInitialState, LoginErrors } from 'types/types'

export const validateLogin = (formValues: LoginInitialState) => {
   let errors: LoginErrors = {}
   // validaciones para el formulario login, se podria usar una libreria
   if(!formValues.email) {
      errors.email = 'El email es obligatorio'
   }
   if( !formValues.password ) {
      errors.password = 'La contrasenia es obligatoria'
   } else if( formValues.password.length <= 6 ) {
      errors.password = 'La contrasenia debe tener al menos 7 caracteres'
   }
   return errors
}