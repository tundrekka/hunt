import styled from 'styled-components'

export const Formulario = styled.form`
   max-width: 600px;
   width: 95%;
   margin: 0 auto;

   fieldset {
      margin: 1.5rem 0;
      border: 1px solid #c0c0c0;
      font-size: 2rem;
      padding: 1.5rem;
   }

`

export const Campo = styled.div`
   margin-bottom: 2.5em;
   @media (max-width: 385px) {
      margin-bottom: 1.8em;

   }
   display: flex;
   align-items: center;
   flex-wrap: wrap;
   position: relative;

   label {
      flex: 0 0 90px;
      font-size: 1.8rem;
   }
   input, textarea {
      flex: 1;
      font-size: 1.7rem;
      padding: 0.25em;
   }
   input[type="file"] {
      width: 50%;
      white-space: pre-wrap;
   }
   textarea {
      height: 200px;
      width: 100%;
      flex: 1 1 100%;
   }
`

export const InputSubmit = styled.input`
   background-color: orangered;
   width: 100%;
   padding: 1.5rem;
   text-align: center;
   color: #fff;
   font-size: 1.8rem;
   text-transform: uppercase;
   border: none;
   cursor: pointer;
   font-family: sans-serif, 'Geneva', 'Lucida Sans Regular', 'Lucida Grande',
      'Lucida Sans Unicode', Verdana, sans-serif;
`

export const Error = styled.p`
   background-color: #ca1515f9;
   border-radius: 2px;
   top: 100%;
   left: 50%;
   transform: translateX(-50%);
   width: 100%;
   position: absolute;
   padding: .2rem;
   font-weight: 700;
   font-size: 1.1rem;
   text-align: center;
   text-transform: uppercase;
   margin: .5rem 0;
`

export const UploadingMsg = styled.p`
   margin: 0;
   flex: 0 1 100%;
   font-size: 1.3rem;
   color: limegreen;
`
