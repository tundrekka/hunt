import styled from 'styled-components'


const InputText = styled.input`
   border: 1px solid black;
   padding: 1rem;
   min-width: 200px;

`
const InputSubmit = styled.button`
   height: 2.5rem;
   width: 2.5rem;
   display: block;
   background-size: 4rem;
   position: absolute;
   top: .55rem;
   right: 1rem;

`


export const Searcher: React.FC = () => {
   return (
      <form
         style={{
            position: 'relative'
         }}
      >
         <InputText type="text" />
         <InputSubmit type="submit">s</InputSubmit>
      </form>
   )
}
