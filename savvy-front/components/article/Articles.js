import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Carousel from "nuka-carousel";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import Article from "./ArticleCard";
import LoadingDummy from "../course/LoadingDummy";

const ENGLISH_ARTICLES_QUERY = gql`
  query ENGLISH_ARTICLES_QUERY($tag: String!) {
    articles(where: { tag: $tag }, orderBy: tag_DESC) {
      id
      title
      img
    }
  }
`;

const Circle = styled.button`
  border: 1px solid #112a62;
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  outline: 0;
  span {
    font-size: 1.8rem;
  }
  &:active {
    border: 2px solid #112a62;
    color: #112a62;
  }
`;

const ListStyle = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  @media (max-width: 700px) {
    margin-right: 0;
    justify-content: center;
  }
`;
const ArticlesGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 2% 0 5% 0;
  width: 100%;
  @media (max-width: 700px) {
    justify-content: flex-end;
  }
`;

const Group = styled.div``;

class Articles extends Component {
  state = {
    width: 1
  };
  onResize = width => {
    this.setState({ width });
  };
  render() {
    let slides;
    if (this.state.width < 1250 && this.state.width > 900) {
      slides = 3;
    } else if (this.state.width < 900 && this.state.width > 600) {
      slides = 2;
    } else if (this.state.width < 600) {
      slides = 1;
    }
    return (
      <>
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.onResize}
        />
        <Query
          query={ENGLISH_ARTICLES_QUERY}
          returnPartialData={true}
          variables={{
            tag: "Юридический английский"
          }}
        >
          {({ data: data1, loading, fetchMore }) => {
            if (loading) return <LoadingDummy />;
            // console.log(data1.articles);

            return (
              <Group data-tut="fourth-step">
                {this.state.width > 1000 && (
                  <ArticlesGroup>
                    {data1.articles.map(article => (
                      <Article article={article} />
                    ))}
                  </ArticlesGroup>
                )}
                {this.state.width < 1000 && (
                  <ListStyle>
                    <Carousel
                      slidesToShow={slides}
                      renderBottomCenterControls={false}
                      renderCenterLeftControls={({ previousSlide }) => (
                        <Circle onClick={previousSlide}>
                          <span>&#8249;</span>
                        </Circle>
                      )}
                      renderCenterRightControls={({ nextSlide }) => (
                        <Circle onClick={nextSlide}>
                          <span>&#8250;</span>
                        </Circle>
                      )}
                    >
                      {loading === false &&
                        data1.articles &&
                        data1.articles.map(article => (
                          <Article article={article} />
                        ))}
                    </Carousel>
                  </ListStyle>
                )}
              </Group>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Articles;
