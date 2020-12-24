import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import Post from "./Post";
import renderHTML from "react-render-html";

const POSTS_QUERY = gql`
  query POSTS_QUERY {
    posts(orderBy: { createdAt: desc }) {
      id
      title
      text
      tags
      likes
      user {
        id
        name
        surname
      }
      createdAt
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Menu = styled.div`
  flex-basis: 20%;
  border-right: 1px solid #001f4e;
  font-size: 1.8rem;
  min-height: 500px;
  .logo {
    margin-top: 5%;
    font-size: 2rem;
    padding: 0 5%;
  }
  .color1,
  .color2 {
    width: 100%;
    height: 8px;
  }
  .color1 {
    background: #02b3e4;
  }
  .color2 {
    background: #02ccba;
  }
  .content {
    font-size: 1.4rem;
    text-align: left;
    padding: 0 5%;
    margin-top: 20px;
  }
  .header {
    font-weight: bold;
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

const Posts = styled.div`
  flex-basis: 50%;
  padding: 3% 4%;
  min-height: 500px;
  padding-top: 1%;
  @media (max-width: 1300px) {
    flex-basis: 60%;
  }
  @media (max-width: 800px) {
    margin: 5% 0;
    padding: 0 25px;
  }
`;

const Blank = styled.div`
  flex-basis: 30%;
  @media (max-width: 1300px) {
    margin: 5% 0;
    flex-basis: 20%;
  }
`;

const Blog = (props) => {
  return (
    <Styles>
      <Container>
        <Menu>
          <div className="color1"></div>
          <div className="color2"></div>
          <div className="logo">BeSavvy blog</div>
          <div className="content">
            <div className="header">Пишем про:</div>
            <div>Старт юридической карьеры</div>
            <div>Бизнес-ориентированность юриста</div>
            <div>Лайфхаки в учебе</div>
            <div>Изучение английского</div>
            <div>Способы быстрого освоения новых тем</div>
          </div>
          <div className="content">
            <div className="header">Социальные сети:</div>
            <div>
              <a href="https://www.vk.com/besavvylawyer/" target="_blank">
                Вконтакте
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/besavvylawyer/"
                target="_blank"
              >
                Инстаграм
              </a>
            </div>
            <div>
              <a href="https://t.me/BeSavvyLawyer" target="_blank">
                Телеграм
              </a>
            </div>
          </div>
        </Menu>
        <Posts>
          {props.me && props.me.permissions.includes("ADMIN") && (
            <CreatePost me={props.me} />
          )}
          <Query query={POSTS_QUERY}>
            {({ data, loading, fetchMore }) => {
              if (loading) return <p>Загрузка...</p>;
              return (
                <>
                  {data.posts.map((d, index) => (
                    <Post
                      id={d.id}
                      text={d.text}
                      likes={d.likes}
                      tags={d.tags}
                      createdAt={d.createdAt}
                      me={props.me}
                      index={index + 1}
                    />
                  ))}
                </>
              );
            }}
          </Query>
        </Posts>
        <Blank></Blank>
      </Container>
    </Styles>
  );
};

export default Blog;
export { POSTS_QUERY };
