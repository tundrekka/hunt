import styled from "styled-components"

const Container = styled.div`
   position: relative;
   /* background-color: #ffffff3c; */
   padding: 4px;
   width: 40px;
   height: 28px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
`
const Line = styled.div`
   height: 2px;
   width: 100%;
   border-radius: 2px;
   background: white;
`

export const HamburguerIcon: React.FC = () => {
   return (
      <Container >
         <Line></Line>
         <Line></Line>
         <Line></Line>
      </Container>
   )
}