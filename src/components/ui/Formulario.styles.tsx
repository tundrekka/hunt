import styled from 'styled-components'

export const Formulario = styled.form`
   max-width: 600px;
   width: 95%;
   margin: 0 auto;
`

export const Campo = styled.div`
   margin-bottom: 2em;
   display: flex;
   align-items: center;
   flex-wrap: wrap;

   label {
      flex: 0 0 90px;
      font-size: 1.8rem;
   }
   input {
      flex: 1;
      font-size: 1.7rem;
      padding: 0.25em;
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
   padding: 1rem;
   font-weight: 700;
   font-size: 1.4rem;
   text-align: center;
   text-transform: uppercase;
   margin: 1rem 0;
`
