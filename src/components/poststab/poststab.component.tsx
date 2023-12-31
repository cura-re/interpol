import { ChangeEvent, Component, FormEvent, Fragment } from "react";
import { Badge, Card, Col, Form, Image, Modal, Row } from "react-bootstrap";

import { ArrowsFullscreen, Chat, Rocket, Send } from "react-bootstrap-icons";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Comment } from "../../store/comment/comment.types";
import { Post } from "../../store/post/post.types";
import { AContainer, BadgeContainer, CardContainer, CommentContainer, ModalContainer, PostContainer, TextContainer } from "../../styles/post/post.styles";

interface IDefaultFormFields {
    commentValue: string;
    postContent: string;
    mediaLink: string;
    imageData: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
    showCreate: boolean;
    showDelete: boolean;
    postId: number | null;
};

export class PostsTab extends Component<any, IDefaultFormFields> {
    constructor(props: any) {
        super(props);
        this.state = {
            postContent: "",
            mediaLink: "",
            imageData: "",
            imageFile: null,
            show: false,
            showCreate: false,
            showDelete: false,
            commentValue: "",
            postId: null
        }

        this.handleLike = this.handleLike.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    postComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { commentValue, imageFile } = this.state;
        const { posts } = this.props;
        const postId = posts.singlePost?.postId ? posts.singlePost.postId : 0
        try {
            this.props.createComment(commentValue, imageFile, postId);
        } catch (error) {
            return error;
        }
    }

    handleLike(postId: number, type: string): void {
        this.props.likePost(postId, type);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(postId: number): void {
        this.props.getPost(postId);
        this.props.getComments(postId);
        this.setState({
            show: !this.state.show
        });
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    showPreview(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
          const { files } = event.target;
          const selectedFiles = files as FileList;
          let imageFile = selectedFiles[0];
          const reader = new FileReader();
          reader.onload = x => {
            this.setState({
              ...this.state,
              imageFile,
              imageData: x.target?.result
            });
          }
          reader.readAsDataURL(imageFile);
        } else {
          this.setState({
              ...this.state,
              imageFile: null,
              imageData: null
          });
        }
    }

    componentDidMount(): void {
        if (this.props.marauderId != undefined) {
            this.props.getUserPosts(this.props.marauderId)
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void {
        // if (prevProps.marauderId != this.props.marauderId) {
        //     this.props.getUserPosts(this.props.marauderId);
        // }

        // if (this.props.posts.singlePost?.postId != prevProps.posts.singlePost?.postId) {
        //     this.props.getUserPosts(this.props.marauder.singleMarauder?.userId!);
        //     this.setState({
        //         commentValue: ""
        //     })
        // }

        // if (this.props.comments.comments?.length != prevProps.comments.comments?.length) {
        //     this.props.getComments(this.props.posts.singlePost?.postId!);
        //     this.setState({
        //         commentValue: ""
        //     })
        // }
    }

    render() {
        const { posts, comments } = this.props;
        const { show } = this.state;
        return (
        <Fragment>
        {
            posts?.length ?
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
            >
            <Masonry>
            {posts?.map(({ postId, postContent, comments, favorites, type, imageData }: Post, index: number) => {
                return <PostContainer key={index}>
                    <Card style={{ color: 'white', textAlign: 'center', background: 'black', border: '1px solid white' }} key={index}>
                        <Card.Img  src={imageData != null ? `data:image/png;base64, ${imageData}` : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                        <Card.ImgOverlay>
                            <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                            <BadgeContainer>
                                <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(postId)} size={15}/></Badge>
                            </BadgeContainer>
                            {
                                <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                    <Chat size={15}/>
                                    {` ${comments?.length > 0 ? comments?.length : ""}`}
                                    </Badge>
                                </BadgeContainer>
                            }
                            {
                                <BadgeContainer>
                                    <Badge style={{ color: 'black' }} bg="light">
                                    <Rocket style={{ cursor: 'pointer' }} onClick={() => this.handleLike(postId, type)} size={15}/>
                                    {` ${favorites?.length > 0 ? favorites?.length : ""}`}
                                    </Badge>
                                </BadgeContainer>
                            }
                            </div>
                        </Card.ImgOverlay>
                        <Card.Body>
                            <Card.Text>{`${postContent?.slice(0,10)}...`}</Card.Text>
                        </Card.Body>
                    </Card>
                </PostContainer>
            })}
            </Masonry>
        </ResponsiveMasonry> : 
        <Col xs={12}>
            <Card style={{ padding: '.5rem', color: 'white', textAlign: 'center', background: 'black', border: '1px solid white' }}>
                <Card.Title>"Currently no posts..."</Card.Title>
            </Card>
        </Col>
        
    }
        {/* <Modal 
            size="lg"
            show={show} 
            onHide={() => this.handleClose()}
        >
            <ModalContainer>
            <Modal.Header closeButton>
                <Modal.Title >Marauder Log</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={8}>
                    <Image
                        fluid
                        style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }}
                        src={posts.singlePost?.mediaLink ? posts.singlePost?.imageData : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} 
                    />
                    <Card style={{ marginTop: "1rem" }} className="bg-dark" key={posts.singlePost?.postId}>
                        <TextContainer style={{ color: 'white' }}>
                            <Row xs={2}>
                                <Col xs={1}>
                                <Card.Img style={{ width: '1rem', height: '1rem', objectFit: 'fill' }} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${posts.singlePost?.user.imageLink!}`}/>
                                </Col>
                                <Col>
                                <Card.Text style={{ marginBottom: '.5rem' }}>{posts.singlePost?.user.userName}</Card.Text>
                                </Col>
                            </Row>
                            {posts.singlePost?.postContent}
                        </TextContainer>
                    </Card>
                    </Col>
                    <Col>
                    <div>Comments</div>
                    <CommentContainer>
                    <div style={{ height: "65%", overflowY: "auto" }}>
                    {
                        comments?.map(({ commentId, commentValue, mediaLink, dateCreated, user }: Comment) => {
                            return <CardContainer>
                                <Card className="bg-dark" key={commentId}>
                                    <TextContainer>
                                        <AContainer href={`/profile/${user.userId}`}>
                                        <Row xs={2}>
                                            <Col xs={2}>
                                            <Card.Img style={{ width: '1rem', height: '1rem', objectFit: 'fill' }} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/images/${user.imageLink!}`}/>
                                            </Col>
                                            <Col>
                                            <Card.Text style={{ marginBottom: '.5rem' }}>{user.userName}</Card.Text>
                                            </Col>
                                            <Card.Text style={{ position: 'absolute', right: '-2rem' }}>{utcConverter(dateCreated)}</Card.Text> 
                                        </Row>
                                        </AContainer>
                                        <Card.Text>{commentValue}</Card.Text>
                                    </TextContainer>
                                </Card>
                            </CardContainer>
                        })
                    }
                    </div>
                        <Form style={{ margin: 'auto', position: "absolute", bottom: "0" }} key={posts.singlePost?.postId} onSubmit={this.postComment}>
                            <Row style={{ marginBottom: '3rem', justifyContent: 'center' }} xs={1}>
                                <Col xs={12}>
                                    <Row style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                                        <Col xs={12}>
                                            <Form.Group>
                                                <Form.Control style={{ height: '.5rem' }} name="commentValue" as="textarea" onChange={this.handleChange} placeholder=" Write your comment here" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row style={{ justifyContent: 'center' }}>
                                        <Col xs={12}>
                                            <Form.Group className="mb-3" controlId="formMedia">
                                                <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12}>
                                    <button style={{ textAlign: 'center', width: '100%', height: '100%'}} className="btn btn-light" type="submit">
                                        <Send/>
                                    </button>
                                </Col>                
                            </Row>
                        </Form>
                    </CommentContainer>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
            <button className="btn btn-dark" onClick={() => this.handleClose()}>
                Close
            </button>
                <a className="btn btn-dark" style={{ textDecoration: 'none', color: 'white' }} href={`/posts/${posts.singlePost?.postId}`}>
                    See post
                </a>
            </Modal.Footer>
            </ModalContainer>
        </Modal> */}
        </Fragment>
        );
    }
}

export default PostsTab;

