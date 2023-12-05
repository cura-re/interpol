import styled from "styled-components";

export const AuthenticationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5rem;
  h2 {
    margin: 10px 0;
  }
`;

export const SignInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 380px;
  background-color: black;
  border: solid 1px white;
  border-radius: 1rem;
  .form-control {
    background-color: black; 
    color: white;
  }
  padding: 1rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  h2 {
    margin: 10px 0;
  }
  @media (max-width: 500px) {
    width: 80%;
    margin: auto;
  }
`;

export const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 380px;
  background-color: black;
  border: solid 1px white;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  .form-control {
    background-color: black; 
    color: white;
  }
  h2 {
    margin: 10px 0;
  }
  @media (max-width: 500px) {
    width: 80%;
    margin: auto;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;