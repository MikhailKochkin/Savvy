import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const GET_GROWTH_AREAS = gql`
  query GetGrowthAreas {
    growthAreas {
      id
      name
      maxProgress
      marks
      userLevels {
        id
        level
        createdAt
        updatedAt
        user {
          id
          name
          email
        }
      }
      createdAt
      updatedAt
    }
  }
`;

const Container = styled.div`
  width: 90%;
  margin-left: 15px;
  margin-bottom: 30px;
  .growth-area {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    .growth-area-name {
      margin-right: 15px;
      width: 85px;
      font-size: 1.2rem;
      background: #fff;
    }
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 5px;
  background-color: #d9d9d9;
  position: relative;
`;

const ProgressBarInner = styled.div`
  height: 100%;
  background-color: #4caf50;
  width: ${({ percentage }) => percentage}%;
`;

const ProgressMark = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ position }) => position}%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  background-color: ${({ isReached }) => (isReached ? "#4caf50" : "#D9D9D9")};
  border-radius: 50%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ isReached }) => (isReached ? "#D9D9D9" : "#fff")};
  font-size: 12px;
`;
const ProgressBarLabel = styled.div`
  position: absolute;
  top: -30px;
  left: ${({ position }) => position}%;
  font-size: 12px;
  color: #000;
  transform: translateX(-50%);
`;

const MaxProgressLabel = styled.div`
  position: absolute;
  top: -30px;
  right: 0;
  font-size: 12px;
  color: #000;
`;

// const GET_USER_LEVEL = gql`
//   query GetUserLevel($id: ID!) {
//     userLevel(id: $id) {
//       id
//       level
//       myProgress
//       growthAreas {
//         id
//         name
//         maxProgress
//         marks
//       }
//     }
//   }
// `;

const UserLevelProgress = ({ me }) => {
  const { loading, error, data } = useQuery(GET_GROWTH_AREAS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  function categorizeItems(consumedContentList, growthAreas) {
    consumedContentList.forEach((item) => {
      item.tags.forEach((itemTag) => {
        growthAreas.forEach((area) => {
          if (area.tags.includes(itemTag)) {
            area.items.push(item);
          }
        });
      });
    });
  }

  let userLevel = {
    myProgress: [
      {
        name: "Legal English",
        progress: 135,
      },
      {
        name: "Law school",
        progress: 422,
      },
    ],
    consumedContent: [
      {
        id: "3",
        type: "post",
      },
    ],
    isProgressPublic: true,
    growthAreas: [
      {
        name: "Legal English",
        maxProgress: 1000,
        marks: [
          {
            level: 100,
            name: "⭐️",
            message: "⭐️",
          },
          {
            level: 300,
            name: "⭐️",
            message: "congrats 2",
          },
          {
            level: 600,
            name: "⭐️",
            message: "congrats 3",
          },
          {
            level: 999,
            name: "⭐️",
            message: "congrats 4",
          },
        ],
      },
      {
        name: "Law school",
        maxProgress: 1000,
        marks: [
          {
            level: 100,
            name: "⭐️",
            message: "⭐️",
          },
          {
            level: 300,
            name: "⭐️",
            message: "congrats 2",
          },
          {
            level: 600,
            name: "⭐️",
            message: "congrats 3",
          },
          {
            level: 999,
            name: "⭐️",
            message: "congrats 4",
          },
        ],
      },
    ],
  };

  let growthAreas = [
    {
      name: "Legal English",
      tags: ["english"],
      items: [],
    },
    {
      name: "Soft Skills",
      tags: ["soft"],
      items: [],
    },
  ];

  categorizeItems(me.level.consumedContent.consumedContentList, growthAreas);

  const calculateProgress = (items) => {
    return items.length * 5;
  };

  return (
    <Container className="user-level-progress">
      <h4>Навыки юриста:</h4>
      <div className="growth-areas">
        {growthAreas.map((area) => {
          let growthArea = data.growthAreas.find((g) => g.name == area.name);
          let progress = calculateProgress(area.items);

          return (
            <div key={area.name} className="growth-area">
              <div className="growth-area-name">{area.name}</div>
              <ProgressBar
                progress={progress}
                maxProgress={growthArea.maxProgress}
                marks={growthArea.marks}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

const ProgressBar = ({ progress, maxProgress, marks }) => {
  const percentage = (progress / maxProgress) * 100;

  return (
    <ProgressBarContainer>
      <ProgressBarInner percentage={percentage} />
      {marks.marksList.map((mark, index) => (
        <ProgressMark
          key={index}
          position={(mark.level / maxProgress) * 100}
          isReached={progress >= mark.level}
        >
          {mark.name}
        </ProgressMark>
      ))}
      <ProgressBarLabel position={percentage}>{progress}</ProgressBarLabel>
      <MaxProgressLabel>{maxProgress}</MaxProgressLabel>
    </ProgressBarContainer>
  );
};
export default UserLevelProgress;
