import { useState } from 'react'

import {
   Formulario,
   Campo,
   InputSubmit,
   Error,
} from 'components/ui/Formulario.styles'
import { crearCuenta } from 'helpers/createAccount'
import { validateCreateAccount } from 'helpers/validationCreateAcc'
import { useValidacion } from 'hooks/useValidacion'
import type { CreateAccInitialState } from 'types/types'

const initialFormState: CreateAccInitialState = {
   nombre: '',
   email: '',
   password: '',
}

export default function CreateAccount() {

   const [errorFirebase, setErrorFirebase] = useState<string | null>(null)
   const [submitting, setSubmitting] = useState(false)

   const { formValues, errors, handleSubmit, handleInputChange, handleBlur } =
      useValidacion(initialFormState, validateCreateAccount, async() => {
         setSubmitting(true)
         try {
            await crearCuenta(nombre, email, password, setErrorFirebase)
         } catch (error) {
            // eslint-disable-next-line no-console
            console.log('error creating account');
         } finally {
            setSubmitting(false)
         }
      })
      
   const { nombre, email, password } = formValues

   return (
      <div>
         <>
            <h2 style={{ textAlign: 'center' }}>Crear Cuenta</h2>
            <Formulario onSubmit={handleSubmit}>
               <Campo>
                  {errors.nombre && <Error>{errors.nombre}</Error>}
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

               <Campo>
                  {errors.email && <Error>{errors.email}</Error>}
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

               <Campo>
                  {errors.password && <Error>{errors.password}</Error>}
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
               {errorFirebase && <Error>{errorFirebase}</Error>}
               {
                  submitting ?
                  <InputSubmit disabled={submitting} type="text" value="Creating..." />
                  :
                  <InputSubmit disabled={submitting} type="submit" value="Crear Cuenta" />
               }
            </Formulario>
         </>
      </div>
   )
}
