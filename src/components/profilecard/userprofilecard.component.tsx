import { Component } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { Community } from "../../store/community/community.types";
import { AProfileCardContainer } from "../../styles/profile/profile.styles";
// import { SingleProfileProps } from "../../pages/profile/[id]";
// import { Community } from "../../store/community/community.types";
// import { AContainer } from "../../styles/poststab/poststab.styles";

interface IInterpolUser {
    userId?: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    about?: string;
    communities?: Community[];
    imageData?: Int32Array;
    emailAddress?: string;
    dateOfBirth?: string;
    password?: string;
    imageLink?: string;
    imageSource?: string | ArrayBuffer | null | undefined;
    imageFile?: any;

}
export class UserProfileCard extends Component<IInterpolUser> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { about, imageData, userName, userId, communities } = this.props;
        return (
            <Card style={{ color: 'white', background: 'black', border: '.1rem solid white' }} key={"userId"}>
                <Card.Img style={{ borderRadius: '.5rem'}} src={imageData != null ? `data:image/png;base64, ${imageData}` : "https:yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
                <Card.Body>
                    <Row xs={2}>
                        <Col xs={9}>
                            <Card.Link style={{ textDecoration: 'none', color: 'white' }} href={`/profile/${userId}`}>
                                <Card.Title>{userName}</Card.Title>
                                <hr></hr>
                                <Card.Text>{about}</Card.Text>
                                {communities?.length != null && <hr></hr>}
                                <>
                                {
                                communities?.map(({ communityId, communityName, description, imageSource }: Community) => (
                                    <AProfileCardContainer href={`/communities/${communityId}`}>
                                    <Row>
                                        <Col xs={2}>
                                            <Image style={{ width: '2rem', height: '2rem', objectFit: 'cover' }} src={imageSource}/>
                                        </Col>
                                        <Col>
                                            <Card.Text key={communityId}>{communityName}</Card.Text>
                                        </Col>
                                    </Row>
                                    </AProfileCardContainer>
                                ))
                                }
                                </>
                            </Card.Link>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '1rem' }} xs={2}>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}