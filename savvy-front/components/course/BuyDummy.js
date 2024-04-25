import styled from "styled-components";
import Modal from "styled-react-modal";

const Button = styled.button`
  background: #0846d8;
  border-radius: 5px;
  width: 95%;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:hover {
    background: rgba(8, 70, 216, 0.85);
  }
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
  &:disabled {
    &:hover {
      background-color: #84bc9c;
    }
  }
`;

class BuyDummy extends React.Component {
  state = {
    loading: false,
    isOpen: false,
    auth: "signin",
  };
  toggleModal = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };
  changeState = (dataFromChild) => {
    this.setState({
      auth: dataFromChild,
    });
  };
  render() {
    return (
      <>
        <Button onClick={this.toggleModal}>{this.props.children}</Button>
      </>
    );
  }
}

export default BuyDummy;
