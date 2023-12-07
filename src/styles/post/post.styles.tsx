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

export const CardContainer = styled.div`
    margin: 1rem;
    color: white;
`;

export const BodyContainer = styled.div`
    display: flex;
    flex-direction: row;
    line-height: 5em;
`;

export const ImageContainer = styled.div`
    vertical-align: middle; 
    width: 2rem;
    height: 2rem;
    object-fit: cover;
    margin-right: 1rem;
    border-radius: 1rem;
`;

export const CardImageContainer = styled.a`

`;