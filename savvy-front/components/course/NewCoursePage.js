import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import dynamic from "next/dynamic";

import { useUser } from "../User";
import ATF from "./landingPageDesignBlocks/ATF";
import Syllabus from "./landingPageDesignBlocks/Syllabus";
import LearningMethodsAndResults from "./landingPageDesignBlocks/LearningMethodsAndResults";
import Teachers from "./landingPageDesignBlocks/Teachers";
import Reviews from "./landingPageDesignBlocks/Reviews";
import ActionLeads from "./landingPageDesignBlocks/ActionLeads";
import Prices from "./landingPageDesignBlocks/Prices";
import MobileAction from "./landingPageDesignBlocks/MobileAction";
import MobileLeads from "./landingPageDesignBlocks/MobileLeads";
import WhatToExpect from "./landingPageDesignBlocks/WhatToExpect";
import BottomLine from "./landingPageDesignBlocks/BottomLine";

import moment from "moment";

const DynamicAction = dynamic(import("./landingPageDesignBlocks/Action"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const DynamicMobileBuy = dynamic(
  import("./landingPageDesignBlocks/MobileBuy"),
  {
    loading: () => <p>...</p>,
    ssr: false,
  }
);

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(id: $id) {
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
  max-width: 1100px;
  width: 85%;
  @media (max-width: 800px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Main = styled.div`
  width: 70%;
  padding: 20px;
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
      {/* <BottomLine me={me} id={props.id} /> */}
      <ATF id={props.id} />

      <Container>
        {width < 880 && data && (
          <MobileAction
            promocode={props.promocode}
            me={me}
            coursePage={data.coursePage}
          />
        )}
        <Main>
          {data && !loading && (
            <>
              <WhatToExpect coursePage={data.coursePage} />
              <Syllabus
                id={props.id}
                lessons={data.coursePage.lessons}
                coursePageId={data.coursePage.id}
              />
              {/* {data.coursePage &&
                data.coursePage.reviews &&
                data.coursePage.reviews.reviews.length > 0 && (
                  <Reviews data={data.coursePage} />
                )} */}
              <LearningMethodsAndResults coursePage={data.coursePage} />
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
