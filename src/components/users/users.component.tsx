import axios from "axios";
import { Component, Dispatch } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Row, Col, Image, Card } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";
import { MarauderFetchAllStart, MarauderFetchSingleStart, marauderFetchAllStart, marauderFetchSingleStart } from "../../store/marauder/marauder.action";
import { RootState } from "../../store/store";

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

type MarauderProps = ConnectedProps<typeof connector>;

async function getUser(userId: string): Promise<Array<IUser>> {
  const res = await fetch(
      `http://localhost:5274/users/${userId}`,
      {
          method: "GET",
          headers: {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          next: { revalidate: 10 }
      }
  )
  const data = await res.json();
  return data;
}

class Interpoler extends Component<MarauderProps, ISignIn> {
  public toggle: boolean = true;
  public title: string = "Change Me";
  constructor(props: MarauderProps) {
    super(props);
    this.state = {
      users: []
    };
  }
  async getUsers(): Promise<IUser[]> {
    const headers = {
      'Accept': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
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
    this.props.getAll();
  }

  render() {
    const { marauders } = this.props
    return (
      <>
      <h1>{this.title}</h1>
      <ResponsiveMasonry
        columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
      >
        <Masonry>
        {
          marauders?.map(({ userId, userName, firstName, about, imageData }, index: number) => {
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

const mapStateToProps = (state: RootState) => {
  return { 
    marauders: state.marauder.marauders,
    messages: state.message
  };
};

const mapDispatchToProps = (dispatch: Dispatch<MarauderFetchAllStart | MarauderFetchSingleStart>) => ({
  getAll: () => dispatch(marauderFetchAllStart()),
  getMarauder: (userId: string ) => dispatch(marauderFetchSingleStart(userId)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Interpoler);