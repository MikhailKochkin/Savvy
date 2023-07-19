import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import moment from "moment";
import dynamic from "next/dynamic";

import { useUser } from "../User";
import ProgramATF from "./coursePageBlocks/ProgramATF";
import Details from "./coursePageBlocks/Details";
import ProgramSyllabus from "./coursePageBlocks/ProgramSyllabus";
import SellingPoints from "./coursePageBlocks/SellingPoints";
import ProgramTeachers from "./coursePageBlocks/ProgramTeachers";
import Reviews from "./coursePageBlocks/Reviews";
import MobileAction from "./coursePageBlocks/MobileAction";
import ActionLeads from "./coursePageBlocks/ActionLeads";
import ProgramMobileLeads from "./coursePageBlocks/ProgramMobileLeads";
import Goal from "./coursePageBlocks/Goal";
import QA from "./coursePageBlocks/QA";
import ProgramBottomLine from "./coursePageBlocks/ProgramBottomLine";
import Loading from "../Loading";

const SINGLE_PROGRAM_QUERY = gql`
  query SINGLE_PROGRAM_QUERY($id: String!) {
    program(where: { id: $id }) {
      id
      title
      price
      discountPrice
      video
      promotionId
      audience
      result
      tags
      months
      tariffs
      methods
      reviews
      installments
      promocode
      coursePages {
        id
        title
        numInCareerTrack
        user {
          id
          name
          surname
          image
          work
          description
        }
        authors {
          id
          name
          surname
          image
          work
          description
        }
        lessons {
          id
          name
          description
          number
          type
        }
      }
      #   published
      #   user {
      #     id
      #   }
      # orders {
      #   id
      #   user {
      #     id
      #   }
      # }
      description
      goals
      nextStart
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  /* justify-content: center;
  align-items: center; */
`;

const Main = styled.div`
  width: 70%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Money = styled.div`
  width: 30%;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;

  z-index: 4;
  /* @media (max-width: 800px) {
    position: relative;
  } */
  /* display: flex;
  flex-direction: column; */
  /* align-items: center; */
  /* justify-content: center; */
  /* background: #1c1d1f; */
`;

const DynamicAction = dynamic(import("./coursePageBlocks/ProgramAction"), {
  loading: () => <p>...</p>,
  ssr: false,
});
const DynamicProgramMobileBuy = dynamic(
  import("./coursePageBlocks/ProgramMobileBuy"),
  {
    loading: () => <p>...</p>,
    ssr: false,
  }
);

const NewCoursePage = (props) => {
  const { loading, error, data } = useQuery(SINGLE_PROGRAM_QUERY, {
    variables: { id: props.id },
  });
  const [width, setWidth] = useState(0);
  const onResize = (width, height) => {
    setWidth(width);
  };
  const me = useUser();
  const router = useRouter();
  if (loading) return <Loading />;

  router.locale == "ru" ? moment.locale("ru") : moment.locale("en");
  return (
    <Styles>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <ProgramBottomLine me={me} id={props.id} />
      <Container>
        <Main>
          <ProgramATF id={props.id} />
          {data && !loading && (
            <>
              {width < 880 &&
                (props.form == "lead" ? (
                  <ProgramMobileLeads
                    me={me}
                    coursePage={data.program.coursePages[0]}
                    program={data.program}
                  />
                ) : (
                  <DynamicProgramMobileBuy program={data.program} me={me} />
                ))}
              {width < 880 && <MobileAction coursePage={data.program} />}

              <Goal coursePage={data.program} />
              <ProgramSyllabus id={props.id} program={data.program} />
              {data.program &&
                data.program.reviews &&
                data.program.reviews.reviews.length > 0 && (
                  <Reviews data={data.program} />
                )}
              <SellingPoints coursePage={data.program} />
              <ProgramTeachers program={data.program} />

              {/* <QA /> */}
            </>
          )}
        </Main>
        <Money>
          {!loading &&
            data &&
            width > 880 &&
            (props.form == "lead" ? (
              <ActionLeads
                me={me}
                coursePage={data.program.coursePages[0]}
                program={data.program}
              />
            ) : (
              <DynamicAction
                promocode={props.promocode}
                me={me}
                program={data.program}
              />
            ))}
        </Money>
      </Container>
    </Styles>
  );
};

export default NewCoursePage;

// Идеи. Отдельно в ленивом формате подгружать статистические данные
// Отдельнно подгружать первые элементы страницы, чтобы ускорить время первого взаимодействия студента с курсом
