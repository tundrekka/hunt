import { Formulario, Campo, InputSubmit, Error } from 'components/ui/Formulario.styles'
import { validateCreateAccount } from 'helpers/validationCreateAcc'
import { useValidacion } from 'hooks/useValidacion'
import type { CreateAccInitialState } from 'types/types'

const initialFormState: CreateAccInitialState = {
   nombre: '',
   email: '',
   password: '',
}
export default function CreateAccount() {
   const crearCuenta = () => {
      console.log('creando cuenta');
   }
   const {formValues, errors, handleSubmit, handleInputChange, handleBlur} = useValidacion(initialFormState, validateCreateAccount, crearCuenta)
   const { nombre, email, password } = formValues
   return (
      <div>
         <>
            <h2 style={{ textAlign: 'center' }}>Crear Cuenta</h2>
            <Formulario onSubmit={handleSubmit} >

               {errors.nombre && <Error>{errors.nombre}</Error>}
               <Campo>
                  <label htmlFor="nombre">Nombre</label>
                  <input
                     type="text"
                     value={nombre}
                     onChange={handleInputChange}
                     onBlur={handleBlur}
                     name="nombre"
                     id="nombre"
                     placeholder="tu nombre"
                  />
               </Campo>

               {errors.email && <Error>{errors.email}</Error>}
               <Campo>
                  <label htmlFor="email">Email</label>
                  <input
                     type="email"
                     value={email}
                     onChange={handleInputChange}
                     onBlur={handleBlur}
                     name="email"
                     id="email"
                     placeholder="tu email"
                  />
               </Campo>

               {errors.password && <Error>{errors.password}</Error>}
               <Campo>
                  <label htmlFor="password">Password</label>
                  <input
                     type="password"
                     value={password}
                     onChange={handleInputChange}
                     onBlur={handleBlur}
                     name="password"
                     id="password"
                     placeholder="tu password"
                  />
               </Campo>
               <InputSubmit type="submit" value="Crear Cuenta" />
            </Formulario>
         </>
      </div>
   )
}
