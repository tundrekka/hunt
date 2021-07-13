import { Formulario, Campo, InputSubmit } from 'components/ui/Formulario.styles'
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
   // const {} = useValidacion(initialFormState, validateCreateAccount, crearCuenta)
   const {formValues, errors} = useValidacion(initialFormState, validateCreateAccount, crearCuenta)
   return (
      <div>
         <>
            <h2 style={{ textAlign: 'center' }}>Crear Cuenta</h2>
            <Formulario>
               <Campo>
                  <label htmlFor="nombre">Nombre</label>
                  <input
                     type="text"
                     name="nombre"
                     id="nombre"
                     placeholder="tu nombre"
                  />
               </Campo>
               <Campo>
                  <label htmlFor="email">Email</label>
                  <input
                     type="email"
                     name="email"
                     id="email"
                     placeholder="tu email"
                  />
               </Campo>
               <Campo>
                  <label htmlFor="password">Password</label>
                  <input
                     type="password"
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
