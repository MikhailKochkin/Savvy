import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import Course from "../course/Course";
import LoadingDummy from "../course/LoadingDummy";

const COURSE_PAGES_QUERY = gql`
  query COURSE_PAGES_QUERY {
    coursePages(
      where: { published: { equals: true } }
      orderBy: { createdAt: desc }
    ) {
      id
      title
      description
      image
      tags
      lessons {
        id
        forum {
          id
          rating {
            id
            rating
          }
        }
      }
      user {
        id
        name
        surname
        image
        status
        company {
          id
          name
        }
        uni {
          id
          title
        }
      }
      authors {
        id
        name
        surname
        status
        company {
          id
          name
        }
        uni {
          id
          title
        }
      }
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 40px;
  @media (max-width: 800px) {
    width: 95%;
    padding: 20px 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (max-width: 800px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
`;

const Header = styled.div`
  /* font-weight: bold; */
  font-size: 2rem;
  font-weight: bold;
  margin: 30px 0 0 0;
  @media (max-width: 800px) {
    font-size: 2rem;
    margin: 0 0 30px 0;
  }
`;

const Message = styled.div`
  /* font-weight: bold; */
  font-size: 1.7rem;
  width: 75%;
  margin-bottom: 3%;
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const ShownCourses = (props) => {
  return (
    <Styles>
      <Header>Ваша программа:</Header>
      <Container>
        <Query query={COURSE_PAGES_QUERY}>
          {({ data, error, loading, fetchMore }) => {
            if (error) return <p>Error: {error.message}</p>;
            if (loading) return <LoadingDummy />;
            const coursePages = data.coursePages;
            let displayed = coursePages.filter((c) => c.tags.includes("Intro"));
            console.log(coursePages, displayed);
            return (
              <>
                {displayed.map((c) => (
                  <Course key={c.id} id={c.id} coursePage={c} me={props.me} />
                ))}
              </>
            );
          }}
        </Query>
      </Container>
    </Styles>
  );
};

export default ShownCourses;
