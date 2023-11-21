import axios from "axios";
import { Component } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Row, Col, Image, Card } from "react-bootstrap";
import UsersComponent from "../components/users/users.component";


class Index extends Component {
  render() {
    return (
      <UsersComponent/>
    )
  }
}

export default Index;