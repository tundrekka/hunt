import type { NewProductForm, NewProductErrors } from 'types/types'
import validator from 'validator'
export const validateNewProduct = (formValues: NewProductForm) => {
   let errors: NewProductErrors = {}
   // validaciones para el formulario de new Product, se podria usar una libreria
   // validando el nombre del producto
   if( !formValues.nombre ) {
      errors.nombre = 'El nombre es obligatorio'
   }
   // validando el campo empresa
   if( !formValues.empresa ) {
      errors.empresa = 'El empresa es obligatorio'
   }

   if( !formValues.url ) {
      errors.url = 'La url del sitio del producto es obligatoria'
   } else if(!validator.isURL(formValues.url)) {
      errors.url = 'Url invalida'
   }

   if(!formValues.descripcion) {
      errors.descripcion = 'Agrega una descripcion de tu producto'
   }
   return errors
}