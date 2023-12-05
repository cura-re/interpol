import { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthenticationContainer, ButtonsContainer, SignInContainer } from "../../styles/authentication/authentication.styles";
import SignInForm from "../../components/signin/signin.component";
import SignUpForm from "../../components/signup/signup.component";


interface IToggle {
    signIn: boolean;
    name: string;
}

class Authentication extends Component<{}, IToggle> {
    public signIn: boolean = true;
    public name: string = "Make An Account";
    constructor(props: {}) {
        super(props);
        this.toggleSignIn = this.toggleSignIn.bind(this);
    }

    state = {
        signIn: true,
        name: "Make An Account"
    }

    toggleSignIn() {
        this.setState({
            signIn: !this.state.signIn,
            name: this.state.name == "Make An Account" ? "Have An Account?" : "Make An Account"
        })
    }
    
    render() {
        // const { signIn, name } = this.state;
        return (
            <AuthenticationContainer>
                <Row xs={1}>
                    <Col xs={12}>
                        {this.signIn ? <SignInForm/>
                        : <SignUpForm/>}
                        <div className="d-grid mt-3">
                            <SignInContainer>
                                <ButtonsContainer>
                                    <button className="btn btn-outline-light btn-lg" type="button" onClick={this.toggleSignIn}>{this.name}</button>
                                </ButtonsContainer>
                            </SignInContainer>
                        </div>
                    </Col>
                </Row>
            </AuthenticationContainer>
        );
    }
}

export default Authentication;