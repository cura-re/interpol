import axios from "axios";
import { Component } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Row, Col, Image, Card } from "react-bootstrap";

interface IUser {
  userId: string;
  userName: string;
  firstName: string;
  about: string;
  imageData: Int32Array;
}

interface ISignIn {
  users: Array<IUser>;
}

class Index extends Component<{}, ISignIn> {
  public toggle: boolean = true;
  public title: string = "Change Me";
  constructor(props: {}) {
    super(props);
    this.state = {
      users: []
    };
    this.getUsers = this.getUsers.bind(this);
  }
  async getUsers(): Promise<IUser[]> {
    const headers = {
      'Accept': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const response = await axios({
      method: "GET",
      url: "http://localhost:5274/users",
      headers: headers,
      withCredentials: true
    });
    
    const result = await response.data;
    this.setState({
      users: result
    });
    return result;
  }
  
  componentDidMount(): void {
    this.getUsers();
  }

  render() {
    return (
      <>
      <h1>{this.title}</h1>
      <ResponsiveMasonry
        columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
      >
        <Masonry>
        {
          this.state.users.map(({ userId, userName, firstName, about, imageData }, index: number) => {
            return (
              <Card style={{ margin: '1rem' }} key={userId}>
                <Card.Img style={{ borderRadius: '.5rem'}} src={imageData ? `data:image/png;base64, ${imageData}` : "https://yt3.googleusercontent.com/ytc/AMLnZu-xCUtEweaqIDj8SYIBYyFWy4bKrRxhiiL9nfsw=s900-c-k-c0x00ffffff-no-rj"} />
                <Card.ImgOverlay>
                  <Card.Title>{userName}</Card.Title>
                  <Card.Body>
                    <Card.Text>{firstName}</Card.Text>
                    <Card.Text>{about}</Card.Text>
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
}

export default Index;