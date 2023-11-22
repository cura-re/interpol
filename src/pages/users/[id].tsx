import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import axios from "axios";
import { Component, Dispatch } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Row, Col, Image, Card } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";
import { MarauderFetchAllStart, MarauderFetchSingleStart, marauderFetchAllStart, marauderFetchSingleStart } from "../../store/marauder/marauder.action";
import { RootState } from "../../store/store";
import { Marauder } from '../../store/marauder/marauder.types';

export interface IUser {
    userId: string;
    userName: string;
    firstName: string;
    about: string;
    imageData: Int32Array;
}

type MarauderProps = ConnectedProps<typeof connector>;

interface ISignIn {
    users: Array<IUser>;
}

function Page({
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Card style={{ margin: '1rem' }} key={data?.userId}>
            <a href={`/users/${data?.userId}`}>
            <Card.Img style={{ borderRadius: '.5rem'}} src={data?.imageData ? `data:image/png;base64, ${data?.imageData}` : "https:yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
            </a>
            <Card.ImgOverlay>
            <Card.Title>{data?.userName}</Card.Title>
            <Card.Body>
                <Card.Text>{data?.firstName}</Card.Text>
                <Card.Text>{data?.about}</Card.Text>
            </Card.Body>
            </Card.ImgOverlay>
        </Card>
    )
}

export const getServerSideProps = (async (context) => {
    const { id } = context.query;
    const res = await fetch(
        `http://localhost:5274/users/id/${id}`,
        {
            method: "GET",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            next: { revalidate: 10 }
        }
        );
        const data = await res.json();

    if (!data) {
        return {
          notFound: true,
        }
    }

    return { props: { data }};
}) satisfies GetServerSideProps<{
    data: Array<IUser>
}>;

const mapStateToProps = (state: RootState) => {
    return { 
        marauders: state.marauder.singleMarauder,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<MarauderFetchSingleStart>) => ({
    getMarauder: () => dispatch(marauderFetchSingleStart()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Page);