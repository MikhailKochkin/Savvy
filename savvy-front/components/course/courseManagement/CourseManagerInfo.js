import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import {
  ActionButton,
  SecondaryButton,
  Buttons,
} from "../../lesson/styles/DevPageStyles";
import { SINGLE_COURSEPAGE_QUERY } from "./UpdateCoursePage";

const CREATE_COURSE_ACCESS_CONTROL_MUTATION = gql`
  mutation changeCourseAccessControl(
    $coursePageId: String!
    $role: CourseRole!
    $changeScope: ChangeScope!
    $areAllLessonsAccessible: Boolean!
    $accessibleLessons: [String!]!
    $email: String!
  ) {
    changeCourseAccessControl(
      coursePageId: $coursePageId
      role: $role
      changeScope: $changeScope
      areAllLessonsAccessible: $areAllLessonsAccessible
      accessibleLessons: $accessibleLessons
      email: $email
    ) {
      id
      user {
        id
        name
        surname
        email
      }
      role
      changeScope
      areAllLessonsAccessible
      accessibleLessons
    }
  }
`;

const DELETE_COURSE_ACCESS_CONTROL_MUTATION = gql`
  mutation deleteCourseAccessControl($id: String!) {
    deleteCourseAccessControl(id: $id) {
      id
    }
  }
`;

const CourseManagerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  input,
  select {
    margin: 0;
  }
  margin-bottom: 8px;
  .courseManagerRow_Email {
    width: 20%;
    margin-right: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .courseManagerRow_Role {
    width: 18%;
    margin-right: 8px;
    select {
      width: 100%;
    }
  }
  .courseManagerRow_Permission {
    width: 15%;
    margin-right: 8px;
  }
  .courseManagerRow_AreAllLessonsAccessible {
    width: 12%;
    margin-right: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .courseManagerRow_Button {
    width: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
`;

const CourseManagerInfo = (props) => {
  const [role, setRole] = useState(props.role ? props.role : "Choose");
  const [permissions, setPermissions] = useState(
    props.changeScope ? props.changeScope : "Choose"
  );
  const [email, setEmail] = useState(props.email ? props.email : "");
  const [areAllLessonsAccessible, setAreAllLessonsAccessible] = useState(
    props.areAllLessonsAccessible
  );
  const [accessibleLessons, setAccessibleLessons] = useState(
    props.accessibleLessons && props.accessibleLessons.length > 0
      ? props.accessibleLessons
      : []
  );
  const [changeCourseAccessControl, { loading }] = useMutation(
    CREATE_COURSE_ACCESS_CONTROL_MUTATION,
    {
      refetchQueries: [
        {
          query: SINGLE_COURSEPAGE_QUERY,
          variables: { id: props.coursePageId },
        },
      ],
    }
  );

  const [deleteCourseAccessControl] = useMutation(
    DELETE_COURSE_ACCESS_CONTROL_MUTATION,
    {
      refetchQueries: [
        {
          query: SINGLE_COURSEPAGE_QUERY,
          variables: { id: props.coursePageId },
        },
      ],
    }
  );

  const handleUpdate = async () => {
    const res = await changeCourseAccessControl({
      variables: {
        coursePageId: props.coursePageId,
        role,
        changeScope: permissions,
        areAllLessonsAccessible: areAllLessonsAccessible,
        accessibleLessons: accessibleLessons,
        email: email.toLowerCase(),
      },
    });
    console.log(res);
    props.addAccessControl(res.data.changeCourseAccessControl);
    setEmail("");
    setRole("Choose");
    setPermissions("Choose");
    setAreAllLessonsAccessible(true);
  };

  const revokePermission = async (e, id) => {
    e.preventDefault();
    const res = await deleteCourseAccessControl({
      variables: {
        id: id,
      },
    });
    props.removeAuthor(id);
    alert("Permission revoked");
  };

  return (
    <>
      <CourseManagerRow>
        <div className="courseManagerRow_Email">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="courseManagerRow_Role">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="CHOOSE">Choose</option>
            <option value="AUTHOR">Author</option>
            <option value="MENTOR">Mentor</option>
          </select>
        </div>
        <div className="courseManagerRow_Permission">
          <select
            value={permissions}
            onChange={(e) => setPermissions(e.target.value)}
          >
            <option value="CHOOSE">Choose</option>
            <option value="EDIT">Can edit</option>
            <option value="COMMENT">Can only comment</option>
          </select>
        </div>
        <div className="courseManagerRow_AreAllLessonsAccessible">
          <input
            type="checkbox"
            style={{ transform: "scale(1.2)" }}
            checked={areAllLessonsAccessible}
            onChange={(e) => {
              setAreAllLessonsAccessible(e.target.checked ? true : false);
              if (e.target.checked) {
                setAccessibleLessons([]);
              }
            }}
          />
        </div>
        <div className="courseManagerRow_Button">
          <Buttons gap="10px" margin="0">
            <ActionButton onClick={handleUpdate} disabled={loading}>
              {loading ? "..." : props.action ? props.action : "Update"}
            </ActionButton>
            {!props.action && (
              <SecondaryButton
                onClick={(e) => revokePermission(e, props.id)}
                disabled={loading}
              >
                Revoke
              </SecondaryButton>
            )}
          </Buttons>
        </div>
      </CourseManagerRow>
      {!areAllLessonsAccessible &&
        props.lessons.length > 0 &&
        [...props.lessons]
          .sort((a, b) => (a.number > b.number ? 1 : -1))
          .map((l) => (
            <CourseManagerRow>
              <div>{l.name}</div>
              <div className="courseManagerRow_AreAllLessonsAccessible">
                <input
                  type="checkbox"
                  style={{ transform: "scale(1.2)" }}
                  checked={accessibleLessons.includes(l.id)}
                  onChange={(e) =>
                    e.target.checked
                      ? setAccessibleLessons((prev) => [...prev, l.id])
                      : setAccessibleLessons((prev) =>
                          prev.filter((id) => id !== l.id)
                        )
                  }
                />
              </div>
            </CourseManagerRow>
          ))}
    </>
  );
};

export default CourseManagerInfo;
