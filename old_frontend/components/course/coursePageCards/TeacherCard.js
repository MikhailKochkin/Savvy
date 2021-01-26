import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import MakePublic from "../MakePublic";
import { withTranslation } from "../../../i18n";

const Payment = styled.div`
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 10px;
  width: 270px;
  min-height: 290px;
  padding: 2% 4%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Header = styled.div`
  font-size: 2rem;
  text-align: center;
  padding-bottom: 6%;
  padding-top: 4%;
  line-height: 1.4;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background: ${(props) => props.theme.green};
  border-radius: 5px;
  width: 200px;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
`;

const Button2 = styled.button`
  background: white;
  border: 1px solid #112a62;
  border-radius: 5px;
  width: 200px;
  height: 38px;
  color: #112a62;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  margin-top: 10px;
  &:active {
    background-color: #f4f4f4;
  }
`;

class TeacherCard extends Component {
  switch = () => {
    this.props.getPage();
  };
  render() {
    const { id, coursePage } = this.props;
    return (
      <Payment>
        <Header>{this.props.t("tools")}</Header>
        <Buttons>
          <Link
            href={{
              pathname: "/createLesson",
              query: { id: this.props.id },
            }}
          >
            <a>
              <Button>{this.props.t("create")}</Button>
            </a>
          </Link>
          <Link
            href={{
              pathname: "/updateCoursePage",
              query: { id },
            }}
          >
            <a>
              <Button>{this.props.t("change")}</Button>
            </a>
          </Link>
          <MakePublic published={coursePage.published} id={coursePage.id} />
          <Link
            href={{
              pathname: "/analytics",
              query: {
                id,
                name: "stats",
              },
            }}
          >
            <a>
              <Button2>{this.props.t("results")}</Button2>
            </a>
          </Link>
        </Buttons>
      </Payment>
    );
  }
}

export default withTranslation("course")(TeacherCard);
