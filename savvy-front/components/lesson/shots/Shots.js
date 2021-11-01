import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import DeleteSingleShot from "../../delete/DeleteSingleShot";
import UpdateShots from "./UpdateShots";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { CURRENT_USER_QUERY } from "../../User";

const CREATE_SHOTRESULT_MUTATION = gql`
  mutation CREATE_SHOTRESULT_MUTATION(
    $answer: String!
    $lessonId: String
    $shotId: String
  ) {
    createShotResult(answer: $answer, lessonId: $lessonId, shotId: $shotId) {
      id
    }
  }
`;

const Commentary = styled.div`
  border-top: 1px solid #edefed;
  padding: 1% 2%;
  margin: 1% 0;
`;

const Text = styled.div`
  p {
    padding: 1% 2%;
    margin: 1% 0;
  }
  img {
    display: block;
    max-width: 600px;
    max-height: 50em;
    box-shadow: "0 0 0 2px blue;";
  }
  ins {
    text-decoration: none;
    background: #edffe7;
    /* padding: 0.5% 0.3%; */
  }
  del {
    background: #f29ca3;
    padding: 0.5% 0;
  }
  /* span {
    padding: 0.5% 0.3%;
  } */
  /* .true {
    background: #edffe7;
    border-radius: 10px;
  } */
  @media (max-width: 800px) {
    img {
      max-width: 95%;
    }
  }
`;

const Title = styled.div`
  margin: 10px 0;
  font-size: 1.6rem;
  span {
    font-weight: bold;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const SwitchButton = styled.div`
  background: white;
  border-radius: 5px;
  border: 1px solid #112a62;
  padding: 1%;
  margin-top: 5%;
  font-family: Montserrat;
  font-style: normal;
  font-size: 1.4rem;
  color: #112a62;
  width: 20%;
  cursor: pointer;
  outline: none;
  text-align: center;
  @media (max-width: 800px) {
    width: 50%;
  }
`;

const Styles = styled.div`
  border: 1px solid #edefed;
  box-shadow: rgba(118, 143, 255, 0.1) 0px 16px 24px 0px;
  margin: 30px 0;
  padding: 2%;
  width: ${(props) => props.width};
  .bar {
    width: 80%;
    height: 5px;
    background: #b6bce2;
  }
  @media (max-width: 800px) {
    width: 100%;
    .bar {
      width: 200px;
      height: 5px;
      background: #b6bce2;
    }
  }
`;

const Circle = styled.button`
  border: ${(props) =>
    props.color ? "1px solid #C4C4C4" : "1px solid #112a62"};
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  outline: 0;
  span {
    font-size: 1.8rem;
    color: ${(props) => (props.color ? "#C4C4C4" : "#112a62")};
  }
  &:active {
    border: ${(props) =>
      props.color ? "1px solid #C4C4C4" : "2px solid #112a62"};
    color: #112a62;
  }
`;

const Progress = styled.div`
  background: #3f51b5;
  width: ${(props) => props.progress};
  height: 5px;
  transition: all 0.5s;
`;

class Shots extends Component {
  state = {
    num: 1,
    page: "show",
  };
  plus = () => {
    if (this.state.num < this.props.parts.length) {
      this.setState((prev) => ({ num: prev.num + 1 }));
    }
  };
  minus = () => {
    if (this.state.num > 1) {
      this.setState((prev) => ({ num: prev.num - 1 }));
    }
  };
  switch = (e) => {
    e.preventDefault();
    const name = e.target.getAttribute("name");
    this.setState({ page: name });
  };
  render() {
    const { comments, parts, shotID, lessonID, me, shotUser, title, userData } =
      this.props;
    console.log(me.id);
    const visible = [];
    for (let i = 0; i < this.state.num; i++) {
      visible.push(parts[i]);
    }
    const data = userData
      .filter((result) => result.shot.id === shotID)
      .filter((result) => result.student.id === me.id);

    let width;
    if (this.props.problem) {
      width = "50%";
    } else if (this.props.story) {
      width = "50%";
    } else {
      width = "100%";
    }
    return (
      <Styles width={width}>
        {this.state.page === "show" && (
          <>
            <Title>
              <span>Решение:</span> {title}
            </Title>
            <>
              <Text>
                <div key={this.state.num - 1}>
                  {renderHTML(visible[this.state.num - 1])}
                </div>
              </Text>
              <Commentary>
                <>{renderHTML(comments[this.state.num - 1])}</>
                {console.log(
                  comments,
                  parts,
                  comments[this.state.num],
                  comments[this.state.num - 1],
                  this.state.num
                )}
              </Commentary>
            </>
            <Buttons>
              <Mutation
                mutation={CREATE_SHOTRESULT_MUTATION}
                variables={{
                  lessonId: lessonID,
                  shotId: shotID,
                  answer: "Looked through",
                }}
                refetchQueries={() => [
                  {
                    query: SINGLE_LESSON_QUERY,
                    variables: { id: this.props.lessonID },
                  },
                  {
                    query: CURRENT_USER_QUERY,
                  },
                ]}
              >
                {(createShotResult, { loading, error }) => (
                  <>
                    <Circle color={this.state.num < 2} onClick={this.minus}>
                      <span>&#8249;</span>
                    </Circle>
                    <div className="bar">
                      <Progress
                        className="progress"
                        progress={
                          parseInt((100 * this.state.num) / parts.length) + "%"
                        }
                      ></Progress>
                    </div>
                    <Circle
                      color={this.state.num === parts.length}
                      onClick={async (e) => {
                        // Stop the form from submitting
                        e.preventDefault();
                        // call the mutation
                        const res = await this.plus();
                        if (this.state.num + 1 === parts.length) {
                          const res2 = await createShotResult();
                        }
                      }}
                    >
                      <span>&#8250;</span>
                    </Circle>
                  </>
                )}
              </Mutation>
            </Buttons>
            {me && !this.props.story && (
              <DeleteSingleShot shotID={shotID} lessonID={lessonID} />
            )}
            {me && !this.props.story && (
              <SwitchButton name="update" onClick={this.switch}>
                Изменить
              </SwitchButton>
            )}
          </>
        )}
        {this.state.page === "update" && (
          <>
            {me && me.id === shotUser && (
              <>
                <UpdateShots
                  shotID={shotID}
                  lessonID={lessonID}
                  parts={parts}
                  comments={comments}
                  title={title}
                />
                <SwitchButton name="show" onClick={this.switch}>
                  Вернуться к раскадровке
                </SwitchButton>
              </>
            )}
          </>
        )}
      </Styles>
    );
  }
}

export default Shots;
