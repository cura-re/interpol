import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Card } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { User } from "../../store/user/user.types";
import { AContainer, BodyContainer, CardContainer, CardImageContainer, ImageContainer, TextContainer } from "../../styles/post/post.styles";
import { wrapper } from "../../store/store";

export interface ICommunity {
  communityId: number;
  communityName: string | null;
  communityDescription: string | null;
  imageData: Int32Array | null;
  imageLink: string;
  dateCreated: Date;
  user: User;
}

function Communities({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) { 
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
    >
      <Masonry>
      {
        data?.map(({ communityId, communityName, communityDescription, imageData, user }: ICommunity, index: number) => {
          return (
            <CardContainer key={index}>
            <Card.Body>
              <BodyContainer>
                <ImageContainer key="imageContainer">
                  <Card.Img style={{ borderRadius: '1rem' }} src={imageData != null ? `data:image/png;base64, ${user.imageData}` : "https://yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
                </ImageContainer>
                <AContainer key="aContainer" href={`/profile/${user.userId}`}>
                  {user.userName}
                </AContainer>
              </BodyContainer>
            </Card.Body>
            <Card className="bg-dark" key={communityId}>
              <CardImageContainer key="cardImageContainer" href={`/community/${communityId}`}>
                <Card.Img style={{ borderRadius: '.5rem'}} src={imageData != null ? `data:image/png;base64, ${imageData}` : "https://yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
              </CardImageContainer>
            </Card>
            <TextContainer key="communityName">{communityName}</TextContainer>
            <TextContainer key="communitDescription">{communityDescription}</TextContainer>
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
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/communities`,
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

// Communities.getInitialProps = wrapper.getInitialPageProps(store => async (context) => {
//     await store.dispatch(marauderFetchSingleStart());
//     // const communities = 
  
//     // if (!store.getState().placeholderData) {
//     //   store.dispatch(loadData())
//     //   store.dispatch(END)
//     // }
  
//     // await store.sagaTask.toPromise()
//     return { props: { id } };
// });

export default wrapper.withRedux(Communities);