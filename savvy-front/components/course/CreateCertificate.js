import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import dayjs from "dayjs";

const CREATE_CERT_MUTATION = gql`
  mutation CREATE_CERT_MUTATION($coursePageId: String!, $studentId: String!) {
    createCertificate(coursePageId: $coursePageId, studentId: $studentId) {
      id
    }
  }
`;

const Outer = styled.div`
  width: 100%;
  height: 600px;
  margin: 50px 0;
  display: flex;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  align-items: center;
  justify-content: center;
  /* border: 2px solid #393939; */
  @media (max-width: 800px) {
    padding: 50px 0;
  }
`;

const Inner = styled.div`
  width: 95%;
  height: 92%;
  display: flex;
  opacity: 1;
  /* border: 2px solid #393939; */
  background: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .bookmark {
    height: 60px;
    width: 50px;
    padding: 0px;
    margin-top: 10px;
    -webkit-transform: rotate(0deg) skew(0deg);
    transform: rotate(0deg) skew(0deg);
    border-left: 25px solid #ee7752;
    border-right: 25px solid #ee7752;
    border-bottom: 25px solid transparent;
  }
  h2 {
    font-size: 5rem;
  }
  .name {
    font-weight: 600;
    font-size: 2.6rem;
    padding: 0px 50px;
    margin-bottom: 20px;
    border-bottom: 1px solid black;
  }
  .course {
    font-weight: 600;
    font-size: 2.4rem;
    margin-bottom: 20px;
    border-bottom: 1px solid grey;
    padding: 0px 50px;
  }
  @media (max-width: 800px) {
    padding: 50px 0;
  }
`;

const Data = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 10px;

  .left {
    width: 50%;
    font-style: italic;
  }
  .right {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    font-style: italic;
  }
  @media (max-width: 800px) {
    padding: 50px 0;
  }
`;

const CreateCertificate = (props) => {
  const [createCertificate, { data, loading, error }] =
    useMutation(CREATE_CERT_MUTATION);
  const { t } = useTranslation("course");

  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        const res = await createCertificate({
          variables: {
            coursePageId: props.coursePageId,
            studentId: props.studentId,
          },
        });

        Router.push({
          pathname: "/certificate",
          query: {
            id: res.data.createCertificate.id,
          },
        });
      }}
    >
      Get my certificate
    </button>
  );
};

export default CreateCertificate;
