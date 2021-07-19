import type { LoginInitialState, LoginErrors } from 'types/types'
import validator from 'validator'
export const validateLogin = (formValues: LoginInitialState) => {
   let errors: LoginErrors = {}
   // validaciones para el formulario login, se podria usar una libreria
   if(!formValues.email) {
      errors.email = 'El email es obligatorio'
   } else if(!validator.isEmail(formValues.email)) {
      errors.email = 'Email no valido'
   }

   if( !formValues.password ) {
      errors.password = 'La contraseña es obligatoria'
   } else if( formValues.password.length <= 6 ) {
      errors.password = 'La contraseña debe tener al menos 7 caracteres'
   }
   return errors
}