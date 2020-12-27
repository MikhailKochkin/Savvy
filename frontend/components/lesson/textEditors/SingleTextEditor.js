import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import renderHTML from "react-render-html";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DeleteSingleTextEditor from "../../delete/DeleteSingleTextEditor";
import UpdateTextEditor from "./UpdateTextEditor";
import { CURRENT_USER_QUERY } from "../../User";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { withTranslation } from "../../../i18n";

const CREATE_TEXTEDITORRESULT_MUTATION = gql`
  mutation CREATE_TEXTEDITORRESULT_MUTATION(
    $attempts: Int
    $wrong: String!
    $correct: String!
    $guess: String!
    $lessonId: String
    $textEditorId: String
    $result: Boolean
  ) {
    createTextEditorResult(
      attempts: $attempts
      wrong: $wrong
      correct: $correct
      guess: $guess
      lessonId: $lessonId
      textEditorId: $textEditorId
      result: $result
    ) {
      id
    }
  }
`;

const TextBar = styled.div`
  width: 98%;
  font-size: 1.6rem;
  border-radius: 5px;
  @media (max-width: 800px) {
    width: 100%;
    font-size: 1.4rem;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: 20em;
    box-shadow: "0 0 0 2px blue;";
  }
  iframe {
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
      width: 100%;
      height: auto;
    }
  }
  table {
    width: 100%;
    border: 1px solid #edefed;
    border-collapse: collapse;
    tr {
      border: 1px solid #edefed;
    }
    thead {
      background: #f5f5f5;
      font-weight: bold;
    }
    th {
      border: 1px solid #edefed;
    }
    td {
      border: 1px solid #edefed;
      border-top: none;
      border-bottom: none;
      border-right: none;
      padding: 0% 2.5%;
      position: relative;
      width: 5%;
    }
  }
  .edit {
    background: red;
    width: 100%;
    font-size: 1.6rem;
    line-height: 1.8;
    font-family: Montserrat;
    border: none;
    background: none;
    outline: 0;
    resize: none;
    color: #393939;
    overflow: hidden;
    height: auto;
    background: #bef1ed;
    padding: 3px 3px;
  }
  .mini_button {
    color: #6d7578;
    border: 1px solid #6d7578;
    font-family: Montserrat;
    background: none;
    outline: 0;
    border-radius: 3px;
    padding: 4px 7px;
    margin: 0 5px;
    transition: all 0.3s ease;
    &:hover {
      color: white;
      background: #6d7578;
    }
  }
`;

const EditText = styled.div`
  color: rgb(17, 17, 17);
  width: ${(props) => (props.story ? "940px" : "740px")};
  background: rgb(255, 255, 255);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  padding: 5% 8%;
  margin: 55px auto 45px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

const Input = styled.input`
  margin-left: 10px;
  border: none;
  border-bottom: 1px solid #edefed;
  outline: 0;
  font-size: 1.6rem;
  font-family: Montserrat;
`;

const StyledButton = withStyles({
  root: {
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none",
    maxHeight: "40px",
  },
})(Button);

class SingleTextEditor extends Component {
  state = {
    shown: false,
    mistakesShown: false,
    answer: "",
    correct_option: "",
    wrong_option: "",
    show: false,
    attempts: 0,
    total: this.props.textEditor.totalMistakes,
    text: this.props.textEditor.text,
    update: false,
    result: false,
    inputColor: "#c0d6df",
    open: true,
    recieved: [],
  };

  check = async (e) => {
    this.setState({ shown: true });
    let data = {
      answer1: this.state.correct_option.toLowerCase(),
      answer2: this.state.answer.toLowerCase(),
    };
    let el = document.querySelectorAll(
      `[data-initial='${this.state.correct_option}']`
    )[0];
    e.target.innerHTML = this.props.t("checking");
    e.target.pointerEvents = "none";
    const r = await fetch("https://arcane-refuge-67529.herokuapp.com/checker", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (
          !e.target.nextSibling ||
          (e.target.nextSibling &&
            e.target.nextSibling.innerHTML !== this.props.t("show1"))
        ) {
          let button2 = document.createElement("button");
          button2.innerHTML = this.props.t("show1");
          button2.className = "mini_button";
          button2.addEventListener("click", this.show);
          e.target.after(button2);
        }
        if (parseFloat(res.res) > 69) {
          this.setState({
            result: true,
          });
          el.style.background = "#D9EAD3";
          e.target.innerHTML = this.props.t("check");
          e.target.pointerEvents = "auto";
        } else {
          this.setState({
            result: false,
          });
          el.style.background = "#FCE5CD";
          e.target.innerHTML = this.props.t("check");
          e.target.pointerEvents = "auto";

          if (res.comment) {
            alert(res.comment);
          }
          setTimeout(() => (el.style.background = "#bef1ed"), 3000);
        }
      })
      .catch((err) => console.log(err));

    this.setState({ shown: false });
  };

  onTest = (e) => {
    this.setState((prevState) => ({
      attempts: prevState.attempts + 1,
    }));
  };

  onMouseClick = (e) => {
    let z = document.createElement("span");
    z.contentEditable = true;
    z.innerHTML = e.target.innerHTML;
    z.className = "edit";
    z.setAttribute("data-initial", e.target.getAttribute("data"));
    z.addEventListener("input", this.changeState);
    let n = e.target.parentNode.replaceChild(z, e.target);

    let button = document.createElement("button");
    button.innerHTML = this.props.t("check");
    button.className = "mini_button";
    button.tabIndex = 0;
    button.addEventListener("click", this.check);
    z.after(button);

    this.setState({
      answer: "",
      correct_option: e.target.getAttribute("data"),
      wrong_option: e.target.innerHTML,
    });
  };

  changeState = (e) => {
    this.setState({ answer: e.target.innerHTML });
  };

  onReveal = (e) => {
    let span = document.createElement("span");
    span.innerHTML = ` (${e.target.getAttribute("data")})`;
    if (
      e.target.nextSibling == null ||
      (e.target.nextSibling &&
        span.innerHTML !== e.target.nextSibling.innerHTML)
    ) {
      e.target.className = "edit";
      e.target.after(span);
      span.className = "edit";
    }
  };

  show = (e) => {
    e.target.previousSibling.previousSibling.innerHTML = e.target.previousSibling.previousSibling.getAttribute(
      "data-initial"
    );
    e.target.style.pointerEvents = "none";
    e.target.previousSibling.style.display = "none";
    e.target.style.display = "none";
    e.target.previousSibling.previousSibling.contentEditable = false;
    e.target.previousSibling.previousSibling.style.pointerEvents = "none";
  };

  onShow = () => {
    const elements = document
      .getElementById(this.props.textEditor.id + 1)
      .querySelectorAll("#id");
    if (this.state.mistakesShown) {
      elements.forEach((element) => {
        element.classList.remove("edit");
      });
    } else {
      elements.forEach((element) => {
        element.className = "edit";
      });
    }
    this.setState((prev) => ({ mistakesShown: !prev.mistakesShown }));
  };

  render() {
    const { textEditor, me, userData, lessonID, story } = this.props;
    let data;
    me
      ? (data = userData
          .filter((result) => result.textEditor.id === textEditor.id)
          .filter((result) => result.student.id === me.id))
      : (data = [""]);

    return (
      <div id={textEditor.id + 1}>
        {!this.state.update && (
          <>
            <TextBar id={textEditor.id}>
              <EditText story={story}>
                <Mutation
                  mutation={CREATE_TEXTEDITORRESULT_MUTATION}
                  variables={{
                    lessonId: this.props.lessonID,
                    textEditorId: this.props.textEditor.id,
                    attempts: this.state.attempts,
                    correct: this.state.correct_option,
                    wrong: this.state.wrong_option,
                    guess: this.state.answer,
                    result: this.state.result,
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
                  {(createTextEditorResult, { loading, error }) => (
                    <div
                      onClick={async (e) => {
                        const res1 = this.onTest();
                        if (e.target.getAttribute("data-initial")) {
                          this.setState({
                            correct_option: e.target.getAttribute(
                              "data-initial"
                            ),
                          });
                        }
                        if (e.target.id === "id") {
                          if (this.state.total > 0) {
                            const res2 = await this.onMouseClick(e);
                          } else if (
                            this.state.total == 0 ||
                            this.state.total == null
                          ) {
                            const res3 = await this.onReveal(e);
                          }
                        }
                        if (this.state.shown) {
                          setTimeout(() => {
                            console.log("Save");
                            const res2 = createTextEditorResult();
                            console.log(res2);
                          }, 3000);
                        }
                      }}
                    >
                      {renderHTML(this.state.text)}
                    </div>
                  )}
                </Mutation>
              </EditText>
            </TextBar>
            <Buttons>
              <StyledButton
                onClick={this.onShow}
                variant="contained"
                color="primary"
              >
                {this.state.mistakesShown
                  ? this.props.t("close2")
                  : this.props.t("open2")}
              </StyledButton>
              {me && me.id === textEditor.user.id && !story ? (
                <DeleteSingleTextEditor
                  id={this.props.textEditor.id}
                  lessonID={this.props.lessonID}
                />
              ) : null}
              {me && me.id === textEditor.user.id && !story && (
                <StyledButton
                  onClick={(e) =>
                    this.setState((prev) => ({ update: !prev.update }))
                  }
                >
                  {this.props.t("update")}
                </StyledButton>
              )}
            </Buttons>
          </>
        )}
        {this.state.update && (
          <UpdateTextEditor
            lessonID={lessonID}
            id={this.props.textEditor.id}
            text={this.state.text}
            totalMistakes={this.state.total}
          />
        )}
      </div>
    );
  }
}

SingleTextEditor.propTypes = {
  lessonID: PropTypes.string.isRequired,
  textEditor: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
};

export default withTranslation("tasks")(SingleTextEditor);
