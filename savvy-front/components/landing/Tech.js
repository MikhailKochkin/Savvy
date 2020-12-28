import styled from "styled-components";
// import Icon from "react-icons-kit";
// import { ic_forum } from "react-icons-kit/md/ic_forum";
// import { ic_laptop_mac } from "react-icons-kit/md/ic_laptop_mac";
// import { withTranslation } from "../../i18n";

const Styles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5%;
`;

const Blue = styled.div`
  font-size: 2.2rem;
  background: #f6f6f6;
  height: 23vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 2%;
  div {
    text-align: center;
    width: 70%;
  }
  @media (max-width: 600px) {
    height: auto;
    min-height: 25vh;
    font-size: 1.5rem;
    padding: 22px 12px;
    text-align: center;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: auto;
  min-height: 25vh;
  width: 80%;
  @media (max-width: 900px) {
    width: 90%;
    min-height: 22vh;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    height: auto;
    min-height: 45vh;
  }
`;

const Element = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  &#left {
    margin-right: 3%;
    @media (max-width: 600px) {
      margin-bottom: 20px;
    }
  }
  .icon {
    flex-basis: 15%;
    text-align: center;
  }
  .text {
    flex-basis: 85%;
    padding: 0 3%;
    text-align: center;
    @media (max-width: 900px) {
      font-size: 1.5rem;
    }
  }
`;

const Tech = (props) => {
  return (
    <Styles>
      <Blue>
        <div>{props.t("tech1")}</div>
      </Blue>
      <Block>
        <Element id="left">
          <div className="icon">
            {/* <Icon size={60} icon={ic_laptop_mac} /> */}
          </div>
          <div className="text">{props.t("tech2")}</div>
        </Element>
        <Element id="right">
          <div className="icon">{/* <Icon size={60} icon={ic_forum} /> */}</div>
          <div className="text">{props.t("tech3")}</div>
        </Element>
      </Block>
    </Styles>
  );
};

// export default withTranslation("search")(Tech);
export default Tech;
