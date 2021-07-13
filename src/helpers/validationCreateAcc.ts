import type { CreateAccInitialState, CreateAccErrors } from 'types/types'

export const validateCreateAccount = (formValues: CreateAccInitialState) => {
   let errors: CreateAccErrors = {}
   // validaciones para el formulario, se podria usar una libreria
   if(!formValues.nombre) {
      errors.nombre = 'El nombre es obligatorio'
   }
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