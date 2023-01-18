import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";

import { useUser } from "../User";
import ATF from "./coursePageBlocks/ATF";
import Details from "./coursePageBlocks/Details";
import Syllabus from "./coursePageBlocks/Syllabus";
import SellingPoints from "./coursePageBlocks/SellingPoints";
import Teachers from "./coursePageBlocks/Teachers";
import Reviews from "./coursePageBlocks/Reviews";
import Action from "./coursePageBlocks/Action";
import ActionLeads from "./coursePageBlocks/ActionLeads";
import Prices from "./coursePageBlocks/Prices";

import MobileAction from "./coursePageBlocks/MobileAction";
import MobileLeads from "./coursePageBlocks/MobileLeads";
import MobileBuy from "./coursePageBlocks/MobileBuy";

import Goal from "./coursePageBlocks/Goal";
import QA from "./coursePageBlocks/QA";
import BottomLine from "./coursePageBlocks/BottomLine";

import moment from "moment";
import renderHTML from "react-render-html";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      price
      discountPrice
      video
      audience
      result
      tags
      tariffs
      prices
      currency
      methods
      reviews
      installments
      subscriptionPrice
      subscription
      promocode
      published
      user {
        id
      }
      # orders {
      #   id
      #   user {
      #     id
      #   }
      # }
      lessons {
        id
        name
        number
        type
        open
        description
        structure
        published
        coursePage {
          id
        }
        user {
          id
        }
      }
      description
      courseType
      # students
      # applications {
      #   id
      #   applicantId
      # }
      # new_students {
      #   id
      # }
      goals
      nextStart
      user {
        id
        name
        description
        surname
        image
        description
        work
        status
        uni {
          id
          title
        }
        company {
          id
          name
        }
      }
      authors {
        id
        name
        description
        surname
        image
        description
        status
        work
        uni {
          id
          title
        }
        company {
          id
          name
        }
      }
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

const NewCoursePage = (props) => {
  const [width, setWidth] = useState(0);
  const onResize = (width, height) => {
    setWidth(width);
  };
  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });

  const me = useUser();
  const router = useRouter();

  router.locale == "ru" ? moment.locale("ru") : moment.locale("en");
  return (
    <Styles>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <BottomLine me={me} id={props.id} />
      <Container>
        <Main>
          <ATF id={props.id} />
          {data && !loading && (
            <>
              {width < 880 &&
                (props.form == "lead" ? (
                  <MobileLeads me={me} coursePage={data.coursePage} />
                ) : (
                  <MobileBuy coursePage={data.coursePage} me={me} />
                ))}
              {width < 880 && <MobileAction coursePage={data.coursePage} />}
              <Goal coursePage={data.coursePage} />
              <Syllabus
                id={props.id}
                lessons={data.coursePage.lessons}
                coursePageId={data.coursePage.id}
              />
              <Teachers coursePage={data.coursePage} />
              <SellingPoints coursePage={data.coursePage} />
              {data.coursePage.prices && (
                <Prices coursePage={data.coursePage} />
              )}
              {/* {prog && prog.reviews && prog.reviews.length > 0 && (
                <Reviews data={prog} />
              )} */}
              <QA />
            </>
          )}
        </Main>
        <Money>
          {!loading &&
            data &&
            width > 880 &&
            (props.form == "lead" ? (
              <ActionLeads me={me} coursePage={data.coursePage} />
            ) : (
              <Action me={me} coursePage={data.coursePage} />
            ))}
        </Money>
      </Container>
    </Styles>
  );
};

export default NewCoursePage;

// Идеи. Отдельно в ленивом формате подгружать статистические данные
// Отдельнно подгружать первые элементы страницы, чтобы ускорить время первого взаимодействия студента с курсом
