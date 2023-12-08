import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Card } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Marauder } from "../../store/marauder/marauder.types";
import { AProfileContainer, ProfileRouteContainer, UserCardContainer } from "../../styles/user/user.styles";

export interface IUser {
  userId: string;
  userName: string;
  firstName: string;
  about: string;
  imageData: Int32Array;
}

function Interpoler({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) { 
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
    >
      <Masonry>
      {
        data?.map(({ userId, userName, firstName, about, imageData }: Marauder, index: number) => {
          return (
            <UserCardContainer>
              <ProfileRouteContainer href={`/profile/${userId}`}>{userName}</ProfileRouteContainer>
              <Card key={userId} className="bg-dark my-3">
                <AProfileContainer href={`/profile/${userId}`}>
                  <Card.Img style={{ borderRadius: '.5rem'}} src={imageData != null ? `data:image/png;base64, ${imageData}` : "https://yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
                </AProfileContainer>
              </Card>
              <Card.Body>
                <Card.Text>{about}</Card.Text>
              </Card.Body>
            </UserCardContainer>
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
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/users`,
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

export default Interpoler;