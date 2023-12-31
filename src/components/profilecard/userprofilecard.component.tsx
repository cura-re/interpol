import { Component } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { Community } from "../../store/community/community.types";
import { AProfileCardContainer, MainContainer } from "../../styles/profile/profile.styles";

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
        const { about, imageData, userName, firstName, userId, communities } = this.props;
        return (
            <MainContainer>
            <Card className="bg-dark" key={"userId"}>
                <Card.Img style={{ borderRadius: '.5rem'}} src={imageData != null ? `data:image/png;base64, ${imageData}` : "https:yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
                <Card.Body>
                    <Row xs={2}>
                        <Col xs={9}>
                            <Card.Link style={{ textDecoration: 'none', color: 'white' }} href={`/profile/${userId}`}>
                                <Card.Title>{userName}</Card.Title>
                                <Card.Text>{firstName}</Card.Text>
                                <hr></hr>
                                <Card.Text>{about}</Card.Text>
                                {communities?.length != null && <hr></hr>}
                                <>
                                {
                                communities?.map(({ communityId, communityName, description, imageData }: Community) => (
                                    <AProfileCardContainer href={`/community/${communityId}`}>
                                    <Row>
                                        <Col xs={2}>
                                            <Image className="community-image" src={imageData != null ? `data:image/png;base64, ${imageData}` : "https:yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"}/>
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
            </MainContainer>
        );
    }
}