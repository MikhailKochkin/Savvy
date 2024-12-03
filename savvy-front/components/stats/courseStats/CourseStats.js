import { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
// import Applications from "./applications/Applications";
import AllEnrolledStudentsData from "./AllEnrolledStudentsData";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f6f9;
  padding: 50px 0;
  min-height: 80vh;
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  background-color: #fff;

  .data {
    /* flex: 85%; */
    width: 100%;
  }
  @media (max-width: 950px) {
    flex-direction: column;
    width: 95%;
    .menu {
      flex-direction: row;
    }
    .data {
    }
  }
`;

const CourseStats = (props) => {
  return (
    <>
      <div id="root" />
      <Styles>
        <Container>
          <div className="data">
            <AllEnrolledStudentsData id={props.id} />
          </div>
        </Container>
      </Styles>
    </>
  );
};

CourseStats.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CourseStats;
