import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useUser } from "../User";
import Headline from "./coursePageBlocks/Headline";
import Details from "./coursePageBlocks/Details";
import Syllabus from "./coursePageBlocks/Syllabus";
import SellingPoints from "./coursePageBlocks/SellingPoints";
import Teachers from "./coursePageBlocks/Teachers";
import Reviews from "./coursePageBlocks/Reviews";
import C2A from "./coursePageBlocks/C2A";
import Goal from "./coursePageBlocks/Goal";
import QA from "./coursePageBlocks/QA";
import BottomLine from "./coursePageBlocks/BottomLine";

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
  console.log(me);
  return (
    <div>
      <Headline />
      <div>
        <Details />
        <Goal />
        <BottomLine />
        {!loading && data && (
          <Syllabus
            id={props.id}
            lessons={data.coursePage.lessons}
            coursePageId={data.coursePage.id}
            student_list={student_list}
          />
        )}
        <SellingPoints />
        <Teachers />
        <Reviews />
        {!loading && data && <C2A me={me} coursePageId={data.coursePage.id} />}
        <QA />
      </div>
    </div>
  );
};

export default NewCoursePage;
