import { Campo, Error, Formulario, InputSubmit } from "components/ui/Formulario.styles"
import { restablecerPassword } from "helpers/restablecerContrasenia"
import { useValidacion } from "hooks/useValidacion"
import { useState } from "react"
import validator from "validator"

type IFormInitState = {
   email: string
}
type IFormErrors = {
   email?: string
}

const validateEmail = (formValues: IFormInitState) => {
   let errors: IFormErrors = {}
   if(!validator.isEmail(formValues.email)) {
      errors.email = 'Email no valido'
   }
   return errors
}

const initialFormState: IFormInitState = {
   email: '',
}

const RestablecerContrasenia: React.FC = () => {

   const [errorFirebase, setErrorFirebase] = useState<string | null>(null)
   console.log(errorFirebase)
   const { formValues, errors, handleSubmit, handleInputChange, handleBlur } =
      useValidacion(initialFormState, validateEmail, () => {
         restablecerPassword(formValues.email, setErrorFirebase)
      })
   return (
      <div>
         <Formulario onSubmit={handleSubmit}>
            <Campo>
               {errors.email && <Error>{errors.email}</Error>}
               <label htmlFor="email">Email</label>
               <input
                  type="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  name="email"
                  id="email"
                  placeholder="tu email"
               />
            </Campo>
            {errorFirebase && <Error>{errorFirebase}</Error>}
            <InputSubmit type="submit" value="Enviar"></InputSubmit>
         </Formulario>
      </div>
   )
}

export default RestablecerContrasenia

// firebase.auth().sendPasswordResetEmail(email)
//   .then(() => {
//     // Password reset email sent!
//     // ..
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ..
//   });