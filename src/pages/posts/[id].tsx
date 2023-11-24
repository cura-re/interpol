import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Card } from "react-bootstrap";
import { User } from "../../store/user/user.types";

interface IPost {
    postId: number;
    postContent: string | null;
    imageData: Int32Array | null;
    imageLink: string;
    type: string;
    dateCreated: Date;
    user: User,
    comments: Comment[];
}

function Posts({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) { 
    return (
        <Card style={{ margin: '1rem' }} key={data?.postId}>
            <Card.Img style={{borderRadius: '.5rem'}} src={data?.imageData ? `data:image/png;base64, ${data?.imageData}` : "https://yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
            <Card.ImgOverlay>
                <Card.Title>{data?.postContent}</Card.Title>
                <Card.Body>
                <Card.Text>{data?.imageLink}</Card.Text>
                <a href={`/profile/${data?.user.userId}`}>
                <Card.Text>{data?.user.userName}</Card.Text>
                </a>
                </Card.Body>
            </Card.ImgOverlay>
        </Card>
    );
}

export const getServerSideProps = (async (context) => {
    const { id } = context.query;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/posts/details/${id}`,
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
    data: Array<IPost>
}>;

export default Posts;