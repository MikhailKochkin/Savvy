import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AvgRating from "./AvgRating";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  justify-content: space-between;
  font-size: 1.8rem;
  padding: 20px 2%;
  margin: 0;
  margin-top: -2px;
  margin-bottom: 5px;
  position: sticky;
  top: 0;
  border-bottom: 4px solid #f2f6f9;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
`;

const HeaderCircle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.6;
  font-size: 2.6rem;
  border-radius: 50%;
  border: 4px solid #f2f6f9;
  width: 85px;
  height: 85px;
`;

const HeaderComment = styled.div`
  width: 70%;
  margin-top: 10px;
  text-align: center;
  font-size: 1.4rem;
  line-height: 1.5;
  color: #a5a5a5;
`;

const HeaderStats = ({ students, results, lesson }) => {
  const calculateAverageCompletionTime = (results) => {
    // 1. Filter results where progress equals lesson.structure.length
    const filteredResults = results.filter(
      (result) => result.progress === result.lesson.structure.lessonItems.length
    );

    // 2. Keep unique user IDs and select the earliest result for each user
    const uniqueResults = {};
    filteredResults.forEach((result) => {
      const { id, createdAt, updatedAt, student } = result;
      if (
        !uniqueResults[student.id] ||
        new Date(createdAt) < new Date(uniqueResults[student.id].createdAt)
      ) {
        uniqueResults[student.id] = result;
      }
    });

    // Convert object values to an array
    const finalResults = Object.values(uniqueResults);

    // 3. Calculate completion time and filter out values with more than 3-hour difference or less than 5 minutes
    const timeDifferences = finalResults
      .map((result) => {
        const createdAt = new Date(result.createdAt);
        const updatedAt = new Date(result.updatedAt);
        const difference = (updatedAt - createdAt) / (1000 * 60); // Difference in minutes

        // Exclude values with more than 3 hours difference or less than 5 minutes
        if (difference <= 180 && difference >= 5) {
          return difference;
        }
        return null;
      })
      .filter((time) => time !== null);

    // 4. Calculate the average time
    const averageTime =
      timeDifferences.length > 0
        ? timeDifferences.reduce((sum, time) => sum + time, 0) /
          timeDifferences.length
        : 0; // Return 0 if no valid time differences

    return averageTime;
  };

  const calculateUnfinishedPercentage = (results) => {
    // Step 1: Filter results to get the maximum progress per user
    const userProgressMap = {};

    results.forEach((result) => {
      const { student, progress, lesson } = result;
      const lessonLength = lesson.structure.lessonItems.length;

      // Store the highest progress for each user
      if (
        !userProgressMap[student.id] ||
        progress > userProgressMap[student.id].progress
      ) {
        userProgressMap[student.id] = { progress, lessonLength };
      }
    });

    // Step 2: Count unique results and unfinished results
    const totalUniqueResults = Object.keys(userProgressMap).length;

    const unfinishedCount = Object.values(userProgressMap).filter(
      ({ progress, lessonLength }) => progress < lessonLength
    ).length;

    // Step 3: Calculate percentage
    const unfinishedPercentage =
      totalUniqueResults > 0 ? (unfinishedCount / totalUniqueResults) * 100 : 0; // Avoid division by zero

    return unfinishedPercentage;
  };
  const unfinishedPercentage = calculateUnfinishedPercentage(results);

  return (
    <Header>
      <HeaderBlock>
        <HeaderCircle>{students.length}</HeaderCircle>
        <HeaderComment>total number of users</HeaderComment>
      </HeaderBlock>
      <HeaderBlock>
        <HeaderCircle>
          {results?.length > 0
            ? calculateAverageCompletionTime(results).toFixed(0)
            : 0}
        </HeaderCircle>
        <HeaderComment>avg completion time (mins)</HeaderComment>
      </HeaderBlock>
      <HeaderBlock>
        <HeaderCircle>{100 - unfinishedPercentage.toFixed(0)}%</HeaderCircle>
        <HeaderComment>average completion rate</HeaderComment>
      </HeaderBlock>
      <HeaderBlock>
        <HeaderCircle>
          {lesson?.forum && <AvgRating lesson={lesson} type="mean" />}
        </HeaderCircle>
        <HeaderComment>average student rating</HeaderComment>
      </HeaderBlock>
      <HeaderBlock>
        <HeaderCircle>
          {lesson?.forum && <AvgRating lesson={lesson} type="mode" />}
        </HeaderCircle>
        <HeaderComment>most frequent rating</HeaderComment>
      </HeaderBlock>
    </Header>
  );
};

HeaderStats.propTypes = {
  students: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
  unfinishedPercentage: PropTypes.number.isRequired,
  lesson: PropTypes.object.isRequired,
};

export default HeaderStats;
