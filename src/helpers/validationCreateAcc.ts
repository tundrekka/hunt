import type { CreateAccInitialState, CreateAccErrors } from 'types/types'
import validator from 'validator'
export const validateCreateAccount = (formValues: CreateAccInitialState) => {
   let errors: CreateAccErrors = {}
   // validaciones para el formulario, se podria usar una libreria
   if(!formValues.nombre) {
      errors.nombre = 'El nombre es obligatorio'
   }
   
   if(!formValues.email) {
      errors.email = 'El email es obligatorio'
   } else if(!validator.isEmail(formValues.email)) {
      errors.email = 'Email no valido'
   }

   if( !formValues.password ) {
      errors.password = 'La contrasenia es obligatoria'
   } else if( formValues.password.length <= 6 ) {
      errors.password = 'La contrasenia debe tener al menos 7 caracteres'
   }
   return errors
}