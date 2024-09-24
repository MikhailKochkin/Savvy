import { useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import * as _ from "lodash";
import Loading from "../Loading";
import StudentData from "./StudentData";
import SimulatorInsights from "./SimulatorInsights";
import HeaderStats from "./headerNumbers/HeaderStats"; // Import the new HeaderStats component

const LESSON_RESULTS_QUERY = gql`
  query LESSON_RESULTS_QUERY($lessonId: String!) {
    lessonResults(where: { lessonId: { equals: $lessonId } }) {
      id
      visitsNumber
      progress
      checked
      lesson {
        id
        name
        structure
        published
        type
        number
        forum {
          id
        }
      }
      student {
        id
        email
      }
      createdAt
      updatedAt
    }
  }
`;

const Styles = styled.div`
  width: 80%;
  background-color: #fff;
  border: 2px solid #f2f6f9;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  margin: 50px 0;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.8rem;
  /* background: #edefed; */
  padding: 0.5% 2%;
  padding-top: 8px;
  margin: 0;
  margin-top: -2px;
  margin-bottom: 5px;
  /* border-bottom: 3px solid #f2f6f9; */
  .lessonName {
    font-size: 2.8rem;
    font-weight: 600;
    margin: 15px 15px;
  }
  .header_block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
  }
  .header_circle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 1.6;
    font-size: 3.4rem;
    border-radius: 50%;
    border: 4px solid #f2f6f9;
    width: 110px;
    height: 110px;
  }
  .header_comment {
    width: 70%;
    margin-top: 10px;
    text-align: center;
    font-size: 1.4rem;
    line-height: 1.5;
    color: #a5a5a5;
  }
`;

const UserAnalytics = (props) => {
  const { students, lesson } = props;
  const [number, setNumber] = useState(25);
  const [isCustomResultsModeOn, setIsCustomResultsModeOn] = useState(false);
  const [customResults, setCustomResults] = useState([]);

  const { loading, error, data } = useQuery(LESSON_RESULTS_QUERY, {
    variables: {
      lessonId: lesson.id,
    },
  });

  if (loading) return <Loading />;
  const results = data.lessonResults;

  const getSelectedStudent = (id) => {
    setIsCustomResultsModeOn(true);
    const studentExists = customResults.some(
      (result) => result.student.id === id
    );
    if (studentExists) {
      console.log(1);
      let newCustomResults = [...customResults];
      newCustomResults = newCustomResults.filter(
        (result) => result.student.id !== id
      );
      setCustomResults(newCustomResults);
      if (newCustomResults.length === 0) {
        setIsCustomResultsModeOn(false);
      }
    } else {
      console.log(2);

      let newCustomResults = [...customResults];
      newCustomResults.push(results.find((result) => result.student.id === id));
      setCustomResults(newCustomResults);
    }
  };

  return (
    <Styles>
      <Header>
        <div className="lessonName">{lesson.name}</div>
      </Header>
      <HeaderStats
        students={students}
        results={isCustomResultsModeOn ? customResults : results}
        lesson={lesson}
      />
      <SimulatorInsights lesson={lesson} students={students} />
      {[...students]
        .sort((a, b) => {
          const resultA = results.find((res) => res.student.id === b.id);
          const resultB = results.find((res) => res.student.id === a.id);

          if (!resultA || !resultB) {
            return 0; // or handle this case differently
          }

          return new Date(resultA.createdAt) - new Date(resultB.createdAt);
        })
        .map((student) => {
          return (
            <StudentData
              me={props.me}
              student={student}
              lessons={[lesson]}
              results={results.filter((r) => r.student.id === student.id)}
              type="lesson_analytics"
              passSelectedStudent={getSelectedStudent}
            />
          );
        })}
    </Styles>
  );
};

UserAnalytics.propTypes = {
  lessons: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  coursePageID: PropTypes.string.isRequired,
};

export default UserAnalytics;
