import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Card } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { User } from "../../store/user/user.types";
import { AContainer, BodyContainer, CardContainer, CardImageContainer, ImageContainer } from "../../styles/post/post.styles";

export interface IPost {
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
    <ResponsiveMasonry
      columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
    >
      <Masonry>
      {
        data?.map(({ postId, postContent, imageData, user }: IPost, index: number) => {
          return (
            <CardContainer key={index}>
            <Card key={postId}>
              <Card.Body>
                <BodyContainer>
                  <ImageContainer key="imageContainer">
                    <Card.Img style={{ borderRadius: '1rem', verticalAlign: 'middle' }} src={imageData != null ? `data:image/png;base64, ${user.imageData}` : "https://yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
                  </ImageContainer>
                  <AContainer key="aContainer" href={`/profile/${user.userId}`}>
                    {user.userName}
                  </AContainer>
                </BodyContainer>
              </Card.Body>
              <CardImageContainer key="cardImageContainer" href={`/posts/${postId}`}>
                <Card.Img style={{ borderRadius: '.5rem'}} src={imageData != null ? `data:image/png;base64, ${imageData}` : "https://yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
              </CardImageContainer>
              <Card.Title key="postContent">{postContent}</Card.Title>
            </Card>
            </CardContainer>
          );
        })
      }
      </Masonry>
    </ResponsiveMasonry>
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