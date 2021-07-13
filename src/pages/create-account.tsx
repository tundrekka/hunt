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
   nombre: 'ismael',
   email: 'test-user@gmail.com',
   password: '1234567',
}

export default function CreateAccount() {

   const [errorFirebase, setErrorFirebase] = useState<string | null>(null)

   const { formValues, errors, handleSubmit, handleInputChange, handleBlur } =
      useValidacion(initialFormState, validateCreateAccount, () => {
         crearCuenta(nombre, email, password, setErrorFirebase)
      })
      
   const { nombre, email, password } = formValues

   return (
      <div>
         <>
            <h2 style={{ textAlign: 'center' }}>Crear Cuenta</h2>
            <Formulario onSubmit={handleSubmit}>
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
               {errorFirebase && <Error>{errorFirebase}</Error>}
               <InputSubmit type="submit" value="Crear Cuenta" />
            </Formulario>
         </>
      </div>
   )
}
