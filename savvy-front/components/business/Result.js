import styled from "styled-components";
import { withTranslation } from "../../i18n";

const Styles = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  background: white;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 800px) {
    height: auto;
  }
`;

const Container = styled.div`
  height: 100%;
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  #header {
    width: 50%;
    font-size: 2.4rem;
    font-weight: bold;
    text-align: left;
  }
  #container {
    height: 60%;
  }
  img {
    height: 100%;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    #container {
      height: 300px;
      width: 100%;
      img {
        width: 100%;
      }
    }
    #header {
      width: 90%;
      font-size: 2.2rem;
      line-height: 1.6;
      text-align: center;
      margin-bottom: 20px;
    }
  }
`;
const Result = (props) => {
  return (
    <Styles>
      <Container>
        <div id="header">{props.t("result")}</div>
        <div id="container">
          <img src="../../static/result.svg" />
        </div>
      </Container>
    </Styles>
  );
};

export default withTranslation("business")(Result);
