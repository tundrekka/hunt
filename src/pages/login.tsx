import { useContext, useState } from 'react'

import {
   Formulario,
   Campo,
   InputSubmit,
   Error,
} from 'components/ui/Formulario.styles'

import { validateLogin } from 'helpers/validationLogin'
import { useValidacion } from 'hooks/useValidacion'
import type { LoginInitialState } from 'types/types'
import { startLogin } from 'helpers/startLogin'
import { FirebaseContext } from 'firebase/index'
import router from 'next/router'

const initialFormState: LoginInitialState = {
   email: 'test-user@gmail.com',
   password: '1234567',
}

export default function Login() {

   const [errorFirebase, setErrorFirebase] = useState<string | null>(null)

   const { formValues, errors, handleSubmit, handleInputChange, handleBlur } =
      useValidacion(initialFormState, validateLogin, () => {
         startLogin(email, password, setErrorFirebase)
      })
      
   const { email, password } = formValues

   const { user } = useContext(FirebaseContext)

   if(user) {
      router.replace('/')
   }

   return (
      <div>
         <h2 style={{ textAlign: 'center' }}>Iniciar Sesion</h2>
            <Formulario onSubmit={handleSubmit}>

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
               <InputSubmit type="submit" value="Iniciar Sesion" />
            </Formulario>
      </div>
   )
}

