import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Card } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Post } from "../../store/post/post.types";
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
    <>
    <ResponsiveMasonry
      columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
    >
      <Masonry>
      {
        data?.map(({ postId, postContent, imageLink, dateCreated, imageData, user }: Post, index: number) => {
          return (
            <Card style={{ margin: '1rem' }} key={postId}>
              <a href={`/posts/${postId}`}>
                <Card.Img style={{ borderRadius: '.5rem'}} src={imageData != null ? `data:image/png;base64, ${imageData}` : "https://yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
              </a>
              <Card.ImgOverlay>
                <Card.Title>{postContent}</Card.Title>
                <Card.Body>
                  <Card.Text>{imageLink}</Card.Text>
                  <a href={`/users/${user.userId}`}>
                  <Card.Text>{user.userName}</Card.Text>
                  </a>
                </Card.Body>
              </Card.ImgOverlay>
            </Card>
          );
        })
      }
      </Masonry>
    </ResponsiveMasonry>
    </>
  );
}

export const getServerSideProps = (async (context) => {
    const { id } = context.query;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/posts`,
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