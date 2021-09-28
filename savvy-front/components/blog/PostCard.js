import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Styles = styled.div`
  width: 46%;
  display: flex;
  background: #fff;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 50px;
  @media (max-width: 900px) {
    width: 100%;
  }
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  .title {
    font-size: 2.6rem;
    font-weight: 600;
    line-height: 1.4;
    height: 105px;
    text-align: left;
    width: 100%;
    margin-bottom: 20px;
    cursor: pointer;
    a {
      cursor: pointer;
      transition: 0.15s ease-in;

      &:hover {
        color: #4679d8;
      }
    }
  }
  .description {
    text-align: left;
    width: 90%;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #6b7280;
    line-height: 1.7;
    cursor: pointer;
  }
  .author {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.7rem;
    margin-top: 20px;
    color: #252f3f;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50px;
      margin-right: 20px;
    }
  }
  @media (max-width: 900px) {
    padding-top: 30px;
  }
`;

const PostCard = (props) => {
  const { author, id, title, summary, image } = props;
  return (
    <Styles>
      <div>
        <div className="title">
          <Link
            href={{
              pathname: "/post",
              query: {
                id: id,
              },
            }}
          >
            <a>{title}</a>
          </Link>
        </div>
        <img src={image} />
        <Link
          href={{
            pathname: "/post",
            query: {
              id: id,
            },
          }}
        >
          <div className="description">{summary}</div>
        </Link>
      </div>
      <div className="author">
        <img src={author.image} />
        <div className="name">
          {" "}
          {author.name} {author.surname}
        </div>
      </div>
    </Styles>
  );
};

export default PostCard;
