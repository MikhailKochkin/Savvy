import React, { Component } from "react";
import styled from "styled-components";
import parse from "html-react-parser";

import { v4 as uuidv4 } from "uuid";

const Styles = styled.div`
  width: 98%;
  font-size: 1.4rem;
  line-height: 1.8;
  border-radius: 5px;
  img {
    width: 100%;
  }
  .edit {
    background: red;
    width: 100%;
    font-size: 1.4rem;
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
    e.target.previousSibling.previousSibling.innerHTML =
      e.target.previousSibling.previousSibling.getAttribute("data-initial");
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

    let el = document.getElementById(this.state.chosenElement);

    e.target.innerHTML = "Checking...";

    const r = await fetch("https://arcane-refuge-67529.herokuapp.com/checker", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (
          !e.target.nextSibling ||
          (e.target.nextSibling && e.target.nextSibling.innerHTML !== "Show")
        ) {
          let button2 = document.createElement("button");
          button2.innerHTML = "Show";
          button2.className = "mini_button";
          button2.addEventListener("click", this.show);
          e.target.after(button2);
        }
        if (parseFloat(res.res) > 69) {
          this.setState({ result: true });
          el.style.background = "#D9EAD3";
          e.target.pointerEvents = "auto";
          e.target.innerHTML = "Check";
        } else {
          this.setState({ result: false });
          el.style.background = "#FCE5CD";
          e.target.innerHTML = "Check";

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
    let id = uuidv4();

    z.contentEditable = true;
    z.innerHTML = e.target.innerHTML;
    z.className = "edit";
    z.setAttribute("data-initial", e.target.getAttribute("data"));
    z.setAttribute("id", id);

    z.addEventListener("input", this.changeState);
    let n = e.target.parentNode.replaceChild(z, e.target);

    let button = document.createElement("button");
    button.innerHTML = "Check";
    button.className = "mini_button";
    button.tabIndex = 0;
    button.addEventListener("click", this.check);
    z.after(button);

    this.setState({
      answer: "",
      // correct_option: e.target.getAttribute("data"),
      chosenElement: id,
    });
  };
  render() {
    return (
      <Styles
        className="article"
        onClick={async (e) => {
          if (e.target.getAttribute("data")) {
            this.setState({ correct_option: e.target.getAttribute("data") });
          }
          if (e.target.getAttribute("type") === "error") {
            const res2 = this.onMouseClick(e);
          }
        }}
      >
        {parse(this.props.option)}
      </Styles>
    );
  }
}

export default Article;
