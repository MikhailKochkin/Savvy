import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import renderHTML from "react-render-html";
import styled from "styled-components";
import User from "../User";
import Error from "../ErrorMessage";
import ReactResizeDetector from "react-resize-detector";
import Course from "../course/Course";

const ARTICLE_QUERY = gql`
  query ARTICLE_QUERY($id: ID!) {
    article(where: { id: $id }) {
      id
      tag
      title
      img
      text
      user {
        id
        name
        description
      }
      coursePages {
        id
        title
        user {
          id
          name
          uni {
            id
            title
          }
        }
        image
        price
      }
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 65%;
  display: flex;
  flex-direction: row;
  @media (max-width: 1200px) {
    width: 85%;
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Main = styled.div`
  flex: 75%;
  padding: 4% 4% 1% 4%;
  .tag {
    font-size: 1.7rem;
    color: #112a62;
  }
  .title {
    font-size: 2.6rem;
    font-weight: 600;
    margin-bottom: 3%;
  }
  .text {
    font-size: 1.6rem;
    img {
      width: 100%;
      max-height: 300px;
      object-fit: cover;
    }
  }
  @media (max-width: 800px) {
    margin-top: 2%;
    padding: 0 4% 0 0;
  }
`;

const Side = styled.div`
  flex: 25%;
  padding: 10% 2%;
  .name {
    font-size: 1.8rem;
  }
  @media (max-width: 800px) {
    margin-top: 2%;
    padding: 0;
    margin-bottom: 5%;
  }
`;

const Recom = styled.div`
  border-top: 1px solid #c4c4c4;
  padding-top: 2%;
  div {
    font-weight: 600;
    font-size: 1.7rem;
  }
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Courses = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  justify-content: flex-start;
`;

class Article extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Query
            query={ARTICLE_QUERY}
            returnPartialData={true}
            variables={{
              id: this.props.id
            }}
          >
            {({ data, loading, error }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Загрузка</p>;

              const article = data.article;

              return (
                <Styles>
                  <Container>
                    <Main>
                      <div className="tag">{article.tag}</div>
                      <div className="title">{article.title}</div>
                      <div className="text">{renderHTML(article.text)}</div>
                      <Recom>
                        <div>Чем заняться дальше?</div>
                        <Courses>
                          {article.coursePages.map(coursePage => (
                            <Course
                              key={coursePage.id}
                              id={coursePage.id}
                              coursePage={coursePage}
                              me={me}
                            />
                          ))}
                        </Courses>
                      </Recom>
                    </Main>
                    <Side>
                      <div className="name">{article.user.name}</div>
                      <div className="desc">{article.user.description}</div>
                    </Side>
                  </Container>
                </Styles>
              );
            }}
          </Query>
        )}
      </User>
    );
  }
}

export default Article;
