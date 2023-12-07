import styled from "styled-components";

export const AContainer = styled.a`
    text-decoration: none;
    color: white;
    vertical-align: middle;
    margin-bottom: .5rem;
    width: 10px;
    &:hover {
        cursor: pointer;
        color: gray;
    }
`;

export const BadgeContainer = styled.div`
  margin: .5rem;
  &:hover {
    opacity: .5;
  }
`;

export const BodyContainer = styled.div`
    display: flex;
    flex-direction: row;
    line-height: 5em;
`;

export const CardContainer = styled.div`
    margin: 1rem;
    color: white;
`;

export const CardImageContainer = styled.a`

`;

export const CommentContainer = styled.div`
  margin: auto;
  position: relative; 
  height: 37.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  width: auto;
`;

export const ImageContainer = styled.div`
    vertical-align: middle; 
    width: 2rem;
    height: 2rem;
    object-fit: cover;
    margin-right: 1rem;
    border-radius: 1rem;
`;

export const ModalContainer = styled.div`
  background: #212529;
  color: white;
  position: relative;
`;

export const PostContainer = styled.div`
  margin: .5rem;
  position: relative;
`;

export const TextContainer = styled.div`
  padding: 1rem;
  color: white;
`;