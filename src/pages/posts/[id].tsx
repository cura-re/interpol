import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Card } from "react-bootstrap";
import { AContainer, BodyContainer, CardContainer, CardImageContainer, ImageContainer } from "../../styles/post/post.styles";
import { IPost } from ".";
import { wrapper } from "../../store/store";

function Posts({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) { 
  return (
    <CardContainer style={{ margin: 'auto', width: '50%' }} key={data?.index}>
        <Card key={data?.postId}>
          <Card.Body>
            <BodyContainer>
              <ImageContainer key="imageContainer">
                <Card.Img style={{ borderRadius: '1rem', verticalAlign: 'middle' }} src={data?.imageData != null ? `data:image/png;base64, ${data?.user.imageData}` : "https://yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
              </ImageContainer>
              <AContainer key="aContainer" href={`/profile/${data?.user.userId}`}>
                {data?.user.userName}
              </AContainer>
            </BodyContainer>
          </Card.Body>
          <CardImageContainer key="cardImageContainer" href={`/posts/${data?.postId}`}>
            <Card.Img style={{ borderRadius: '.5rem', objectFit: 'cover' }} src={data?.imageData != null ? `data:image/png;base64, ${data?.imageData}` : "https://yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
          </CardImageContainer>
          <Card.Title key="postContent">{data?.postContent}</Card.Title>
        </Card>
    </CardContainer>
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

export default wrapper.withRedux(Posts);