import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";
import Modal from "styled-react-modal";
import { useRouter } from "next/router";

import { Row, ActionButton } from "../../../lesson/styles/DevPageStyles";
import UpdateCoursePage from "../UpdateCoursePage";
import MakePublic from "../MakePublic";

const CREATE_LESSON_MUTATION = gql`
  mutation CREATE_LESSON_MUTATION(
    $name: String!
    $number: Int
    $text: String!
    $coursePageID: String!
  ) {
    createLesson(
      name: $name
      number: $number
      text: $text
      coursePageID: $coursePageID
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  background: #ffffff;
  width: 270px;
  min-height: 290px;
  padding: 2% 4%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Header = styled.div`
  font-size: 2rem;
  text-align: center;
  padding-bottom: 6%;
  padding-top: 4%;
  line-height: 1.4;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const SecondaryButton = styled.button`
  background-color: white;
  color: #333;
  width: 100%;
  border: 1px solid #e8e8e8;
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 12px;
  font-family: Montserrat;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin-right: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f2f2f2;
  }
`;

const TeacherCard = (props) => {
  const { id, coursePage } = props;
  const { t } = useTranslation("create");
  const [isOpen, setIsOpen] = useState(false);
  const [isCourseUpdateModalOpen, setIsCourseUpdateModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const toggleModal = (e) => setIsOpen(!isOpen);
  const toggleCourseUpdateModal = (e) =>
    setIsCourseUpdateModalOpen(!isCourseUpdateModalOpen);
  const router = useRouter();

  const [createLesson, { data, loading, error }] = useMutation(
    CREATE_LESSON_MUTATION
  );

  return (
    <Styles>
      <Header>{t("Tools")}</Header>
      <Buttons>
        <SecondaryButton onClick={(e) => toggleModal(true)}>
          Create lesson
        </SecondaryButton>

        <SecondaryButton onClick={(e) => toggleCourseUpdateModal(true)}>
          Update course
        </SecondaryButton>
        {/* <MakePublic published={coursePage.published} id={coursePage.id} /> */}
        <Link
          legacyBehavior
          href={{
            pathname: "/stats",
            query: {
              id,
              name: "stats",
            },
          }}
        >
          <SecondaryButton>{t("Stats")}</SecondaryButton>
        </Link>
      </Buttons>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <Row>
          <div className="description">Name</div>
          <div className="action_area">
            <input
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
              placeholder="Untitled"
            />
          </div>
        </Row>
        <Row>
          <div className="description">Number</div>
          <div className="action_area">
            <input
              type="number"
              id="number"
              name="number"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        </Row>
        <ActionButton
          onClick={async (e) => {
            e.preventDefault();
            const res = await createLesson({
              variables: {
                coursePageID: id,
                name: name,
                text: "",
                number: parseInt(number),
              },
            });
            router.push(`lesson?id=${res.data.createLesson.id}&type=regular`);
          }}
        >
          {loading ? t("Creating") : t("Create")}
        </ActionButton>
      </StyledModal>
      <StyledModalCourseUpdate
        isOpen={isCourseUpdateModalOpen}
        onBackgroundClick={toggleCourseUpdateModal}
        onEscapeKeydown={toggleCourseUpdateModal}
      >
        <UpdateCoursePage id={id} />
      </StyledModalCourseUpdate>
    </Styles>
  );
};

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  width: 580px;
  padding: 2%;
`;

const StyledModalCourseUpdate = Modal.styled`
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  height: 800px;
  width: 640px;
  padding: 2%;
      overflow-y: scroll;

  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

export default TeacherCard;
