import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import dynamic from "next/dynamic";

import { useUser } from "../User";
import ATF from "./coursePageBlocks/ATF";
import Syllabus from "./coursePageBlocks/Syllabus";
import SellingPoints from "./coursePageBlocks/SellingPoints";
import Teachers from "./coursePageBlocks/Teachers";
import Reviews from "./coursePageBlocks/Reviews";
import ActionLeads from "./coursePageBlocks/ActionLeads";
import Prices from "./coursePageBlocks/Prices";
import MobileAction from "./coursePageBlocks/MobileAction";
import MobileLeads from "./coursePageBlocks/MobileLeads";
import Goal from "./coursePageBlocks/Goal";
import BottomLine from "./coursePageBlocks/BottomLine";

import moment from "moment";

const DynamicAction = dynamic(import("./coursePageBlocks/Action"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const DynamicMobileBuy = dynamic(import("./coursePageBlocks/MobileBuy"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      price
      prices
      promotionId
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
              {width < 880 && (
                <MobileAction
                  promocode={props.promocode}
                  me={me}
                  coursePage={data.coursePage}
                />
              )}
              <Goal coursePage={data.coursePage} />
              <Syllabus
                id={props.id}
                lessons={data.coursePage.lessons}
                coursePageId={data.coursePage.id}
              />
              {data.coursePage &&
                data.coursePage.reviews &&
                data.coursePage.reviews.reviews.length > 0 && (
                  <Reviews data={data.coursePage} />
                )}
              <SellingPoints coursePage={data.coursePage} />
              {data.coursePage.prices &&
                data.coursePage.prices.prices.length > 0 && (
                  <Prices coursePage={data.coursePage} />
                )}
              {/* {width < 880 &&
                (props.form == "lead" ? (
                  <MobileLeads me={me} coursePage={data.coursePage} />
                ) : (
                  <DynamicMobileBuy
                    coursePage={data.coursePage}
                    me={me}
                    promocode={props.promocode}
                  />
                ))} */}
              <Teachers coursePage={data.coursePage} />
            </>
          )}
        </Main>
        <Money>
          {!loading && data && width > 880 && (
            <DynamicAction
              promocode={props.promocode}
              me={me}
              coursePage={data.coursePage}
            />
          )}
        </Money>
      </Container>
    </Styles>
  );
};

export default NewCoursePage;
