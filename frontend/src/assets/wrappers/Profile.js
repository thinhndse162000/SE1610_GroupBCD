import styled from 'styled-components'

const Wrapper = styled.section`
.form-profile{
display: :grid;
display: grid;
grid-template-columns: auto auto;
gap: 30px;
}
input[type=text] {
  width: 99%;

}input[type=date] {
  width: 99%;


}
.form-profile button {
    cursor: pointer;
    align-self: end   ;
    width: 75px;
    
  }


  .form-profile button :hover {
    background: var(--black);
  }
  form-profile button:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }


`
export default Wrapper
