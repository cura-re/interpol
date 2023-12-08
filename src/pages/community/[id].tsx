import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Card } from "react-bootstrap";
import { AContainer, BodyContainer, CardContainer, CardImageContainer, ImageContainer, TextContainer } from "../../styles/post/post.styles";
import { ICommunity } from ".";

function Community({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) { 
    return (
        <CardContainer key={data?.index}>
            <Card.Body>
              <BodyContainer>
                <ImageContainer key="imageContainer">
                  <Card.Img style={{ borderRadius: '1rem' }} src={data?.imageData != null ? `data:image/png;base64, ${data?.user.imageData}` : "https://yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
                </ImageContainer>
                <AContainer key="aContainer" href={`/profile/${data?.user.userId}`}>
                  {data?.user.userName}
                </AContainer>
              </BodyContainer>
            </Card.Body>
            <Card className="bg-dark" key={data?.communityId}>
              <CardImageContainer key="cardImageContainer" href={`/community/${data?.communityId}`}>
                <Card.Img style={{ borderRadius: '.5rem'}} src={data?.imageData != null ? `data:image/png;base64, ${data?.imageData}` : "https://yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
              </CardImageContainer>
            </Card>
            <TextContainer key="communityName">{data?.communityName}</TextContainer>
            </CardContainer>
    );
}

export const getServerSideProps = (async (context) => {
    const { id } = context.query;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/communities/details/${id}`,
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
    data: Array<ICommunity>
}>;

export default Community;