import React, { Component } from "react";
import styled from "styled-components";
import Router from "next/router";

const Card = styled.div`
  width: 245px;
  margin-left: 5%;
  border: 1px solid #c4c4c4;
  border-radius: 20px;
  cursor: pointer;
  img {
    object-fit: cover;
    width: 100%;
    max-height: 250px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  div {
    padding: 0 15px 10px 15px;
  }
  &:hover {
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 950px) {
    margin-left: 16%;
    width: 230px;
    img {
      max-height: 200px;
    }
  }
`;

class Article extends Component {
  move = () => {
    Router.push({
      pathname: "/article",
      query: { id: this.props.article.id }
    });
  };
  render() {
    const { article } = this.props;
    return (
      <Card onClick={this.move}>
        {article !== undefined && (
          <>
            <img src={article.img} />
            <div>{article.title}</div>
          </>
        )}
      </Card>
    );
  }
}

export default Article;
