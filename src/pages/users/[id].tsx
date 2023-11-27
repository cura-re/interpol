import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Card } from "react-bootstrap";

export interface IUser {
    userId: string;
    userName: string;
    firstName: string;
    about: string;
    imageData: Int32Array;
}

function Page({
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Card style={{ margin: '1rem' }} key={data?.userId}>
            <a href={`/profile/${data?.userId}`}>
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
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/users/id/${id}`,
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
    data: IUser
}>;

export default Page;