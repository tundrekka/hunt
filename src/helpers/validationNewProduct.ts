import type { NewProduct, NewProductErrors } from 'types/types'

export const validateNewProduct = (formValues: NewProduct) => {
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
      errors.url = 'La url es obligatoria'
   } 

   if(!formValues.descripcion) {
      errors.descripcion = 'Agreaga una descripcion de tu producto'
   }
   return errors
}