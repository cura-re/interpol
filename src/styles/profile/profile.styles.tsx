import styled from "styled-components";

export const ProfileContainer = styled.div`
    padding-top: 5rem;
    position: relative;
`;

export const AProfileCardContainer = styled.a`
    text-decoration: none;
    color: white;
    vertical-align: middle;
    margin-bottom: .5rem;
    width: 10px;
    &:hover {
        cursor: pointer;
        color: gray;
    }
    .community-image {
        width: 2rem;
        height: 2rem;
        object-fit: cover;
        border-radius: 2rem;
    }
`;

export const MainContainer = styled.div`
    color: white;
    background: black;
    border: .1rem solid white;
`;