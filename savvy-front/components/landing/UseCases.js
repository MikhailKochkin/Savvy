import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

const Styles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .usecases_container {
    width: 70%;
  }
  .usecases_header {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .landing_main_image {
      height: 500px;
    }
  }
  .name {
    width: 70%;
    text-align: center;
    font-size: 2rem;
  }
  @media (max-width: 800px) {
    margin-top: 40px;
    .usecases_container {
      width: 100%;
    }
    .usecases_header {
      .landing_main_image {
        height: auto;
        width: 100%;
      }
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: nowrap;
  align-items: flex-start;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
  }
`;

const Example = styled.div`
  width: 280px;
  border-radius: 15px;
  border: 1px solid #ecebea;
  padding: 10px 15px;
  margin-bottom: 25px;
  margin-right: 15px;
  /* background: #fafaf9; */
  background-color: ${(props) => (props.background ? "#fff" : "#FAFAF9")};
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 1px 0px rgba(199, 199, 199, 1);
  -moz-box-shadow: 0px 0px 1px 0px rgba(199, 199, 199, 1);
  box-shadow: 0px 0px 1px 1px #f4f3f3;
  transition: 0.3s;
  display: flex; /* Add this line */
  flex-direction: column; /* Add this line */
  align-self: stretch; /* Add this line to make the height stretch */
  &:hover {
    background: #fff;
  }
  .example_main {
    font-weight: 600;
    font-size: 2.4rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 10px;
    div {
      line-height: 1.2;
    }
    .icon {
      width: 22px;
    }
  }
  .example_details {
    line-height: 1.4;
    font-size: 1.4rem;
  }
  @media (max-width: 800px) {
    margin-bottom: 15px;
    margin-right: 0;

    width: 95%;
    height: auto;
    .example_main {
      font-size: 1.8rem;
      justify-content: flex-start;
      align-items: center;

      .icon {
        width: 22px;
      }
    }
    .example_details {
      font-size: 1.2rem;
    }
  }
`;

const ColoredSquare = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 5px;
  margin-right: 5px;
  width: 28px;
  height: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Search = styled.div`
  margin-top: 40px;
  border-radius: 15px;
  width: 70%;
  margin-bottom: 50px;
  .landing_image {
    width: 100%;
    border: 1px solid #ecebea;
    border-radius: 15px;
  }
  @media (max-width: 800px) {
    margin-top: 0px;

    width: 95%;
    margin-bottom: 10px;

    .landing_image {
      object-fit: cover;
    }
  }
`;

const UseCases = () => {
  const [currentImage, setCurrentImage] = useState("landing_image_3.png");
  const { t } = useTranslation("landing");

  return (
    <Styles>
      <div className="usecases_container">
        <div className="usecases_header">
          <img
            className="landing_main_image"
            src={`/static/Person-At-Standing-Desk.png`}
          />
        </div>
        <Row>
          <Example
            onClick={(e) => setCurrentImage("landing_image_1.png")}
            onMouseEnter={() => setCurrentImage("landing_image_1.png")}
            background={currentImage == "landing_image_1.png"}
          >
            <div className="example_main">
              <ColoredSquare color="#E4ECF2">
                <img className="icon" src="/static/write-svgrepo-com.svg" />
              </ColoredSquare>
              <div>{t("writing_and_drafting")}</div>
            </div>
            <div className="example_details">{t("teach_to_draft")}</div>
          </Example>
          <Example
            onClick={(e) => setCurrentImage("landing_image_3.png")}
            onMouseEnter={() => setCurrentImage("landing_image_3.png")}
            background={currentImage == "landing_image_3.png"}
          >
            <div className="example_main">
              <ColoredSquare color="#EDE1F7">
                <img className="icon" src="/static/question-square.svg" />
              </ColoredSquare>
              <div>{t("problem_solving")}</div>
            </div>
            <div className="example_details">{t("teach_to_solve")}</div>
          </Example>
          <Example
            onClick={(e) => setCurrentImage("landing_image_5.png")}
            onMouseEnter={() => setCurrentImage("landing_image_5.png")}
            background={currentImage == "landing_image_5.png"}
          >
            <div className="example_main">
              <ColoredSquare color="#F9EAE8">
                <img className="icon" src="/static/navigation.svg" />
              </ColoredSquare>
              <div>{t("advocacy")}</div>
            </div>
            <div className="example_details">{t("teach_to_communicate")}</div>
          </Example>
          <Example
            onClick={(e) => setCurrentImage("landing_image_4.png")}
            onMouseEnter={() => setCurrentImage("landing_image_4.png")}
            background={currentImage == "landing_image_4.png"}
          >
            <div className="example_main">
              <ColoredSquare color="#FDF6D9">
                <img className="icon" src="/static/analyze-svgrepo-com.svg" />
              </ColoredSquare>
              <div>{t("analysis")}</div>
            </div>
            <div className="example_details">{t("teach_to_spot_errors")}</div>
          </Example>
        </Row>
      </div>
      <Search>
        {" "}
        <img className="landing_image" src={`/static/${currentImage}`} />
      </Search>
    </Styles>
  );
};

export default UseCases;
