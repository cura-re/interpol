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
    // <>
    // <Card style={{ position: 'relative', color: 'white'}}>
    // <Tabs
    //     defaultActiveKey="messages"
    //     justify
    //     className='tabscolor'
    //     variant='pills'
    //     style={{ zIndex: '100', position: 'absolute', top: '4rem', right: '0%' }}
    // >
    //     <Tab eventKey="messages" title="Messages">
    //         <CommunityChannelsContainer>
    //         <CommunityChannels communityId={id} {...props} />
    //         <MembersChannel communityId={id} {...props} />
    //         <FormChannel communityId={id} {...props} />
    //         </CommunityChannelsContainer>
    //     </Tab>
    //     <Tab eventKey="posts" title="Posts">
    //     <SelectShape onClick={openModal} style={{ zIndex: '100', position: 'fixed', width: '', right: '2%', top: '10rem', cursor: 'pointer' }} className="btn btn-outline-light">
    //         <Plus size={25}/>
    //     </SelectShape>
    //     <ResponsiveMemoryContainer style={{ position: 'fixed', top: '5rem', width: '100%'}}>
    //         <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3, 1050: 4 }}>
    //             <Masonry>
    //                 {getPosts()}
    //             </Masonry>
    //         </ResponsiveMasonry>
    //     </ResponsiveMemoryContainer>
    //     <Modal
    //         size="lg"
    //         show={show} 
    //         onHide={() => handleClose}
    //         variant={'dark'}
    //         className="deviceModal"
    //     >
    //         <ModalContent show={show} handleClose={handleClose} { ...props }/>
    //         <Modal.Footer style={{ background: 'black', border: 'white solid 1px' }} >
    //         <button className="btn btn-dark" onClick={() => handleClose()}>
    //             Close
    //         </button>
    //         <button className="btn btn-dark" >
    //             <a style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }} href={`/communitypost/${post?.communityPostId!}`}>
    //             {`See post`}
    //             </a>
    //         </button>
    //         </Modal.Footer>
    //     </Modal>
    //     <Modal className="deviceModal" show={showModal} onHide={() => handleModalClose()}>
    //         <ModalPostContainer>
    //         <Modal.Header closeButton>
    //         <Modal.Title>Data Log</Modal.Title>
    //         </Modal.Header>
    //         <Form autoComplete="off" onSubmit={handleSubmit}>
    //         <Modal.Body>
    //             <Form.Group className="mb-3" controlId="formPostValue">
    //             <Form.Control
    //                 onChange={handleChange}
    //                 name="postValue"
    //                 value={formFields.postValue}
    //                 type="postValue"
    //                 as="input"
    //                 placeholder="Post"
    //                 autoFocus
    //                 />
    //             </Form.Group>
    //             <Form.Group
    //             className="mb-3"
    //             controlId="formFile"
    //             >
    //             <Form.Control 
    //                 as="input"
    //                 name="mediaLink"
    //                 onChange={showPreview}
    //                 accept="image/*"
    //                 type="file" 
    //                 placeholder="Media"
    //             />
    //             </Form.Group>
    //         </Modal.Body>
    //         <Modal.Footer>
    //         <button type="submit" className="btn btn-light">
    //             Log
    //         </button>
    //         </Modal.Footer>
    //         </Form>
    //         </ModalPostContainer>
    //     </Modal>
    //     </Tab>
    // </Tabs>
    // <Card.Img style={{ position: 'absolute', top: '4.5rem', borderRadius: '.2rem', width: '100%', height: '5rem', objectFit: 'cover'}} src={ community?.mediaLink ? community.imageSource : "https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}/>
    // <Card.ImgOverlay>
    // {/* <div style={{ position: "absolute", top: '7rem', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', alignItems: 'center', fontSize: '200%'}}> */}
    // <ImageOverlayContainer style={{ height: '5rem', position: "absolute", top: '7rem', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', alignItems: 'center', fontSize: '200%', borderRadius: '0rem' }}>
    //     <ExploreFontContainer style={{ fontSize: '200%', borderRadius: '.2rem' }}>
    //     {community?.communityName ? community?.communityName : 'Marauders'}
    //     </ExploreFontContainer>
    // </ImageOverlayContainer>
    // {/* </div> */}
    // </Card.ImgOverlay>
    // </Card>
    // </>
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