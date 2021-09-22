import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  width: 50%;
  display: flex;
  background: #fff;
  flex-direction: column;

  justify-content: center;
  border: 1px solid blue;
  .title {
    font-size: 2.6rem;
    font-weight: 600;
    line-height: 1.4;
    text-align: left;
    width: 100%;
    margin-bottom: 20px;
  }
  .description {
    text-align: left;
    width: 90%;
    margin-bottom: 20px;
  }
  .author {
  }
  @media (max-width: 900px) {
    padding-top: 30px;
  }
`;

const PostCard = (props) => {
  return (
    <Styles>
      <div className="title">
        Defensive Calendaring: A Method For Controlling Your Time
      </div>
      <div className="description">
        Your calendar shouldn't give you the Sunday Scaries. Taking some evasive
        actions and being deliberate about defending your time can start to put
        the control back in your hands.
      </div>
      <div className="author">
        <img />
        <div>{props.description}</div>
      </div>
    </Styles>
  );
};

export default PostCard;
