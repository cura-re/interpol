import { ConnectedProps, useDispatch, useSelector } from "react-redux";
import { marauderFetchSingleStart } from "../../store/marauder/marauder.action";
import { wrapper } from "../../store/store";
import { NextPage } from "next";
import { NextPageContext } from "next/types";
import { useEffect } from "react";
import { selectSingleMarauder } from "../../store/marauder/marauder.selector";
import { Card, Col, Row, Tab, Tabs } from "react-bootstrap";
import { UserProfileCard } from "../../components/profilecard/userprofilecard.component";
import { ProfileContainer } from "../../styles/profile/profile.styles";
import { IUser } from "../users";
import PostsTab from "../../components/poststab/poststab.component";

interface Context extends NextPageContext {
    props: {
        id: string;
    }
    data?: IUser;
}

const SingleProfile: NextPage<Context> = props => {
    const dispatch = useDispatch();
    const user = useSelector(selectSingleMarauder);
    console.log(user)
    useEffect(() => {
        dispatch(marauderFetchSingleStart(props.props.id));
    }, [dispatch]);

    return(
        <ProfileContainer>
            <Row lg={2}>
                <Col style={{ marginBottom: '2rem' }}lg={4}>
                    <UserProfileCard about={user?.about!} imageData={user?.imageData!} userName={user?.userName!} userId={user?.userId!} />
                </Col>
                <Col lg={8}>                
                <Tabs
                    defaultActiveKey="posts"
                    justify
                    className='mb-5 tabscolor'
                    variant='pills'
                >
                    <Tab eventKey="posts" title="Posts">
                        <PostsTab posts={user?.posts} { ...props } />
                    </Tab>
                    <Tab eventKey="chats" title="Chats">
                        {/* <UserChatsTab marauderId={id} { ...props } /> */}
                    </Tab> 
                    <Tab eventKey="communities" title="Communities">
                        {/* <UserCommunitiesTab marauderId={id} { ...props } /> */}
                    </Tab>
                    <Tab eventKey="gltfs" title="Gltfs">
                        {/* <UserGltfsTab marauderId={id} { ...props } /> */}
                    </Tab>
                </Tabs>
                </Col>
            </Row>
        </ProfileContainer>
    );
}

SingleProfile.getInitialProps = wrapper.getInitialPageProps(store => async (context) => {
    const { id } = context.query;
    if (typeof id == "string") {
        await store.dispatch(marauderFetchSingleStart(id));
    }
  
    // if (!store.getState().placeholderData) {
    //   store.dispatch(loadData())
    //   store.dispatch(END)
    // }
  
    // await store.sagaTask.toPromise()
    return { props: { id } };
});

export default wrapper.withRedux(SingleProfile);