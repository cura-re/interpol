import { Component, Dispatch, ReactNode } from "react";
import { Container } from 'reactstrap';
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/store";

type SidebarMenuProps = ConnectedProps<typeof connector>;

type Props  = SidebarMenuProps & {
  children: ReactNode
}

export class Layout extends Component<Props> {
  static displayName = Layout.name;

  render() {
    return (
      <>
        {
          <Container tag="main">
            {this.props.children}
          </Container>
        }
      </>
    );
  }
};

const mapStateToProps = (state: RootState) => ({

});

const mapDispatchToProps = () => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Layout);