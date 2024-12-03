import { useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import * as _ from "lodash";
import Loading from "../../layout/Loading";
import SingleStudentDataRow from "../singleStudentFullStats/SingleStudentDataRow";
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
  border-bottom: 4px solid #f2f6f9;

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

const SimulatorAnalyticsMainComponent = (props) => {
  const { students, lesson } = props;
  const [isCustomResultsModeOn, setIsCustomResultsModeOn] = useState(false);
  const [customResults, setCustomResults] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const { loading, error, data } = useQuery(LESSON_RESULTS_QUERY, {
    variables: {
      lessonId: lesson.id,
    },
  });

  if (loading) return <Loading />;
  const results = data.lessonResults;

  const getSelectedStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(
        selectedStudents.filter((studentId) => studentId !== id)
      );
    } else {
      setSelectedStudents([
        ...selectedStudents,
        students.find((student) => student.id === id).id,
      ]);
    }
    setIsCustomResultsModeOn(true);
    const studentExists = customResults.some(
      (result) => result.student.id === id
    );
    console.log("studentExists", studentExists);
    if (studentExists) {
      let newCustomResults = [...customResults];
      newCustomResults = newCustomResults.filter(
        (result) => result.student.id !== id
      );
      setCustomResults(newCustomResults);
      if (newCustomResults.length === 0) {
        setIsCustomResultsModeOn(false);
      }
    } else {
      let newCustomResults = [...customResults];
      newCustomResults.push(
        ...results.filter((result) => result.student.id === id)
      );
      setCustomResults(newCustomResults);
    }
  };

  return (
    <Styles>
      <Header>
        <div className="lessonName">{lesson.name}</div>
      </Header>
      <HeaderStats
        students={selectedStudents.length > 0 ? selectedStudents : students}
        results={isCustomResultsModeOn ? customResults : results}
        lesson={lesson}
      />
      <SimulatorInsights
        lesson={lesson}
        students={students}
        selectedStudents={selectedStudents}
      />
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
            <SingleStudentDataRow
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

SimulatorAnalyticsMainComponent.propTypes = {
  lessons: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  coursePageID: PropTypes.string.isRequired,
};

export default SimulatorAnalyticsMainComponent;
