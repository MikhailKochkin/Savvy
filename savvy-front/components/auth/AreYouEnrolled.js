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

const AreYouEnrolled = (props) =>
  props.open ? (
    props.children
  ) : (
    <Query query={CURRENT_USER_QUERY}>
      {({ data }, loading) => {
        if (loading) return <p>Loading...</p>;
        if (!data.me) return null;
        if (data.me) {
          if (
            !props.openLesson &&
            data.me.new_subjects.filter((sbj) => sbj.id == props.subject)
              .length == 0 &&
            data.me.coursePages.filter((c) => c.id == props.subject).length ==
              0 &&
            data.me.co_coursePages.filter((c) => c.id == props.subject)
              .length == 0 &&
            !data.me.permissions.includes("ADMIN")
          ) {
            return (
              <Styles>
                <Box>
                  <Title>
                    You are not enrolled. Please go to the course page to get
                    access to the course.
                  </Title>
                  <Link
                    legacyBehavior
                    href={{
                      pathname: "/coursePage",
                      query: { id: props.subject },
                    }}
                  >
                    <a>Go to course page</a>
                  </Link>
                </Box>
              </Styles>
            );
          }
        }
        return props.children;
      }}
    </Query>
  );

// const AreYouEnrolled = (props) => {
//   if (props.open) {
//     return props.children;
//   } else {
//     return (
//       <Styles>
//         <Box>
//           <Title>
//             You are not enrolled. Please go to the course page to get access to
//             the course.
//           </Title>
//           <Link
//             href={{
//               pathname: "/coursePage",
//               query: { id: props.subject },
//             }}
//           >
//             <a>Go to course page</a>
//           </Link>
//         </Box>
//       </Styles>
//     );
//   }
// };

export default AreYouEnrolled;
