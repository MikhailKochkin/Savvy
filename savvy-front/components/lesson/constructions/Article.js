import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import { withTranslation } from "../../../i18n";

const Styles = styled.div`
  width: 98%;
  font-size: 1.6rem;
  border-radius: 5px;
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

// this.setState({ shown: false });

class Article extends Component {
  state = {
    correct_option: "",
    answer: "",
    result: false,
  };

  changeState = (e) => {
    this.setState({ answer: e.target.innerHTML });
  };

  show = (e) => {
    console.log(e.target.previousSibling.previousSibling);
    e.target.previousSibling.previousSibling.innerHTML = `
    ${
      e.target.previousSibling.previousSibling.innerHTML
    } (${e.target.previousSibling.previousSibling.getAttribute("data-initial")})
    `;
    e.target.style.pointerEvents = "none";
    e.target.previousSibling.style.display = "none";
    e.target.style.display = "none";
    e.target.previousSibling.previousSibling.contentEditable = false;
    e.target.previousSibling.previousSibling.style.pointerEvents = "none";
  };

  check = async (e) => {
    let data = {
      answer1: this.state.correct_option.toLowerCase(),
      answer2: this.state.answer.toLowerCase(),
    };
    console.log(data);
    let el = document
      .getElementById("answers")
      .querySelectorAll(`[data-initial='${this.state.correct_option}']`)[0];
    console.log(document.getElementById("answers"), el);
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
            e.target.nextSibling.innerHTML !== this.props.t("show"))
        ) {
          let button2 = document.createElement("button");
          button2.innerHTML = this.props.t("show1");
          button2.className = "mini_button";
          button2.addEventListener("click", this.show);
          e.target.after(button2);
        }
        if (parseFloat(res.res) > 69) {
          this.setState({ result: true });
          el.style.background = "#D9EAD3";
        } else {
          this.setState({ result: false });
          el.style.background = "#FCE5CD";
          if (res.comment) {
            alert(res.comment);
          }
          setTimeout(() => (el.style.background = "#bef1ed"), 3000);
        }
      })
      .catch((err) => console.log(err));
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

    // this.setState({
    //   answer: "",
    //   wrong_option: e.target.innerHTML,
    // });
  };
  render() {
    return (
      <Styles
        className="article"
        onClick={async (e) => {
          if (e.target.getAttribute("data")) {
            this.setState({ correct_option: e.target.getAttribute("data") });
          }
          if (e.target.id === "id") {
            console.log(e.target.id);
            const res2 = this.onMouseClick(e);
          }
        }}
      >
        {renderHTML(this.props.option)}
      </Styles>
    );
  }
}

export default withTranslation("tasks")(Article);
