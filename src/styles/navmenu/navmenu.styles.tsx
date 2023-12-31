import styled from 'styled-components';

export const PostContainer = styled.div`
  margin: .5rem;
  position: relative;
`;

export const PostDashContainer = styled.div`
  margin: 5rem .5rem -4.5rem .5rem;
`;

export const ModalContainer = styled.div`
  background: #212529;
  color: white;
  position: relative;
`;

export const CardContainer = styled.div`
  margin-top: 1rem;
`;

export const TextContainer = styled.div`
  padding: 1rem;
  color: white;
`;

export const CommentContainer = styled.div`
  margin: auto;
  position: relative; 
  height: 37.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  width: auto;
`;

export const FormContainer = styled.div`
    @media (min-width: 900px) {
      position: absolute;
      bottom: 0;
      text-align: center;
      color: white;
      margin-top: 3.5rem;
    }
    


    @media (max-width: 899px) {
      text-align: center;
      margin-left: 4rem;
      margin-bottom: 10rem;
      padding-right: 4rem;
      height: 15%;
      z-index: 5;
      .notifications {
          display: none;
      }
      .modalicons {
          margin-top: 1rem;
      }
      .modalIcon {
          font-size: 55px;
      }
    }
    
    @media (max-width: 500px) {
      margin-bottom: 10rem;
    }
`;

export const ModalPostContainer = styled.div`
  background: #212529;
`;

export const BadgeContainer = styled.div`
  margin: .5rem;
  &:hover {
    opacity: .5;
  }
`;

export const ChatContainer = styled.div`
  margin: .5rem;
  justify-content: space-evenly;
  position: relative;
`;

export const AContainer = styled.a`
  text-decoration: none;
  color: white;
  &:hover {
    cursor: pointer;
    color: gray;
  }
`;

export const NavContainer = styled.a`
  border: 1px solid transparent;
  padding: .2rem;
  text-decoration: none;
  margin-right: 1rem;
  color: white;
  &:hover {
    color: gray;
    background: rgb(255,83,73);
    border-radius: .2rem;
    padding: .2rem;
  }
  @media (max-width: 1139px) {
    display: none;
  } 
`;

export const SearchContainer = styled.div`
  @media (max-width: 992px) {
    visibility: hidden;
  } 
`;

export const ListContainer = styled.a`
  text-decoration: none;
  color: white;
  justify-content: center;
  padding-top: .8rem;
  margin-right: 1rem;
  margin-left: .5rem;
  border: 1px solid transparent;
  @media (max-width: 700px) {
    visibility: hidden;
  } 
  &:hover {
    color: gray;
    background: rgb(255,83,73);
    border-radius: .2rem;
  }
`;

export const NavmenuContainer = styled.div`
    // margin-right: -2rem;
    .brand {
        border: 1px solid transparent;
        padding: .2rem;
        @media (max-width: 686px) {
            margin-left: -3rem;
        }
    }
    .brand:hover {
        color: gray;
        background: rgb(255,83,73);
        border-radius: .2rem;
        padding: .2rem;
    }
    // .nav-hidden {
    //     @media (max-width: 992px) {
    //         display: none;
    //     }
    // }
    @media (max-width: 686px) {
        width: 100vw;
    }
`;

export const SelectShape = styled.div`
    cursor: pointer;
    color: white;
    z-index: 10;
    padding: .2rem;
    &:hover {
        background: rgb(255,83,73);
        border-radius: .2rem;
        // border: solid 1px white;
    }
`;