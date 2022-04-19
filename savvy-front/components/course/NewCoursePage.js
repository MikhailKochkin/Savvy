import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

import { useUser } from "../User";
import ATF from "./coursePageBlocks/ATF";
import Details from "./coursePageBlocks/Details";
import Syllabus from "./coursePageBlocks/Syllabus";
import SellingPoints from "./coursePageBlocks/SellingPoints";
import Teachers from "./coursePageBlocks/Teachers";
import Reviews from "./coursePageBlocks/Reviews";
import Action from "./coursePageBlocks/Action";
import Goal from "./coursePageBlocks/Goal";
import QA from "./coursePageBlocks/QA";
import BottomLine from "./coursePageBlocks/BottomLine";
import { programs } from "./programs";

import moment from "moment";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      image
      news
      price
      discountPrice
      video
      audience
      result
      tags
      tariffs
      methods
      reviews
      subscriptionPrice
      subscription
      promocode
      published
      user {
        id
      }
      orders {
        id
        user {
          id
        }
      }
      lessons {
        id
        name
        number
        type
        open
        description
        structure
        # forum {
        #   id
        #   rating {
        #     id
        #     rating
        #   }
        # }
        published
        coursePage {
          id
        }
        user {
          id
        }
        # lessonResults {
        #   id
        #   visitsNumber
        #   lessonID
        #   progress
        #   student {
        #     id
        #   }
        # }
      }
      description
      courseType
      students
      # applications {
      #   id
      #   applicantId
      # }
      new_students {
        id
      }
      user {
        id
        name
        surname
        image
        description
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
        surname
        image
        description
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
    }
  }
`;

const NewCoursePage = (props) => {
  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });
  const student_list = [];
  if (data) {
    data.coursePage.new_students.map((ns) => student_list.push(ns.id));
  }
  const me = useUser();
  const router = useRouter();

  router.locale == "ru" ? moment.locale("ru") : moment.locale("en");

  let prog = programs.find((x) => x.id === props.id);
  return (
    <div>
      <ATF data={prog} />
      <div>
        <Details data={prog} />
        <Goal data={prog} />
        <BottomLine data={prog} />
        {!loading && data ? (
          <Syllabus
            id={props.id}
            lessons={data.coursePage.lessons}
            coursePageId={data.coursePage.id}
            student_list={student_list}
          />
        ) : (
          <p>Загружаем программу курса ...</p>
        )}
        {/* {!loading && data && (
          <Action me={me} coursePage={data.coursePage} data={prog} />
        )} */}
        <SellingPoints data={prog} />
        <Teachers data={prog} />
        {prog.reviews.length > 0 && <Reviews data={prog} />}
        {!loading && data && (
          <Action me={me} coursePage={data.coursePage} data={prog} />
        )}

        <QA data={prog} />
      </div>
    </div>
  );
};

export default NewCoursePage;
