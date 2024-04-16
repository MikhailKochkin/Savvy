import { Query } from "@apollo/client/react/components";
import { CURRENT_USER_QUERY } from "../User";
import Link from "next/link";
import styled from "styled-components";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  padding: 2%;
  border: 1px solid #edefed;
  border-radius: 10px;
  @media (max-width: 600px) {
    width: 90%;
    padding: 3%;
  }
  a {
    margin-top: 3%;
    border: 1px solid #112a62;
    border-radius: 5px;
    padding: 1% 3%;
    color: #112a62;
    &:hover {
      border: 2px solid #112a62;
    }
    @media (max-width: 600px) {
      text-align: center;
    }
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  text-align: center;
  @media (max-width: 600px) {
    width: 90%;
  }
`;

const AreYouEnrolled = (props) => (
  <Styles>
    <Box>
      <Title>
        You don't have access to this simulator. Please go to the course page to
        get access.
      </Title>
      <Link
        legacyBehavior
        href={{
          pathname: "/coursePage",
          query: { id: props.coursePageId },
        }}
      >
        <a>Go to course page</a>
      </Link>
    </Box>
  </Styles>
);

export default AreYouEnrolled;
