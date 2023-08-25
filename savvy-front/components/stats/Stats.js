import { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
// import Applications from "./applications/Applications";
import Exercises from "./Exercises";
import Loading from "../Loading";
import Lessons from "./lessons/Lessons";
import Money from "./Money";
import StudentsData from "./StudentsData";

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

  /* .menu {
    flex: 15%;
    display: flex;
    flex-direction: column;
    margin-top: 3.5%;
    font-size: 1.8rem;
    button {
      margin-bottom: 5px;
      cursor: pointer;
      outline: 0;
      width: 75%;
      background: none;
      border: none;
      font-size: 1.8rem;
    }
    .header {
      margin-bottom: 20px;
    }
    .button {
      cursor: pointer;
      margin-bottom: 4%;
      text-align: right;
      margin-left: 4%;
      margin-right: 20px;
      &:hover {
        border-left: 1px solid #122a62;
      }
    }
  } */
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

const Stats = (props) => {
  const [page, setPage] = useState("student_results");
  return (
    <>
      <div id="root" />
      <Styles>
        <Container>
          {/* <div className="menu">
            <div
              className="button"
              name="student_results"
              onClick={(e) => setPage("student_results")}
            >
              Students
            </div>
            <div
              className="button"
              name="leads"
              onClick={(e) => setPage("leads")}
            >
              Лиды{" "}
            </div>
            <div
              className="button"
              name="exercises_results"
              onClick={(e) => setPage("exercises_results")}
            >
              Tasks
            </div>
            <div
              className="button"
              name="applications"
              onClick={(e) => setPage("lessons")}
            >
              Visits
            </div>
            <div
              className="button"
              name="applications"
              onClick={(e) => setPage("money")}
            >
              Payment
            </div>
          </div> */}
          <div className="data">
            {page === "student_results" && <StudentsData id={props.id} />}
            {/* {page === "student_results" && <LeadsData id={props.id} />} */}

            {/* {page === "exercises_results" && (
              <Exercises
                lessons={coursePage.lessons}
                students={coursePage.new_students}
              />
            )}*/}
            {page === "lessons" && <Lessons id={props.id} />}
            {page === "money" && <Money id={props.id} />}
          </div>
        </Container>
      </Styles>
    </>
  );
};

Stats.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Stats;
