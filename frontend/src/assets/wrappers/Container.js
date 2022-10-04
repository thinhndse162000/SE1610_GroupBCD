import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 1rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;
export default Wrapper;
