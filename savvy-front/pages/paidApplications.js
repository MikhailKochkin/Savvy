import PaidApplications from "../components/PaidApplications";
import React, { useState } from "react";
import { Query, Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import ChangeForum from "../components/lesson/forum/ChangeForum";

const CP_QUERY = gql`
  query CP_QUERY($id: ID!) {
    coursePage(where: { id: $id }) {
      id
      lessons {
        name
        id
        map
      }
      new_students {
        id
        name
        surname
        courseVisits {
          id
          coursePage {
            id
          }
        }
      }
    }
  }
`;

const CREATE_COURSE_VISIT_MUTATION = gql`
  mutation CREATE_COURSE_VISIT_MUTATION(
    $visitsNumber: Int
    $coursePage: ID
    $student: ID
  ) {
    createCourseVisit(
      visitsNumber: $visitsNumber
      coursePage: $coursePage
      student: $student
    ) {
      id
    }
  }
`;

// const paidApplications = () => {
//   return (
//     <div>
//       <Query
//         query={CP_QUERY}
//         fetchPolicy="network-only"
//         variables={{
//           id: "ck0pdit6900rt0704h6c5zmer",
//         }}
//       >
//         {({ data, loading, fetchMore }) => {
//           if (loading) return "...";
//           // console.log(data.coursePage);
//           return (
//             <>
//               {data.coursePage.new_students.map((s) => (
//                 <>
//                   <div>
//                     {s.name} {s.surname} {s.id}{" "}
//                     {
//                       s.courseVisits.filter(
//                         (c) => c.coursePage.id === "ck0pdit6900rt0704h6c5zmer"
//                       ).length
//                     }
//                   </div>
//                   {s.courseVisits.filter(
//                     (c) => c.coursePage.id === "ck0pdit6900rt0704h6c5zmer"
//                   ).length === 0 && (
//                     <Mutation
//                       mutation={CREATE_COURSE_VISIT_MUTATION}
//                       variables={{
//                         coursePage: "ck0pdit6900rt0704h6c5zmer",
//                         visitsNumber: 0,
//                         student: s.id,
//                       }}
//                     >
//                       {(createCourseVisit, { loading, error }) => (
//                         <>
//                           <>
//                             <button
//                               onClick={async (e) => {
//                                 createCourseVisit();
//                                 console.log("!");
//                               }}
//                             >
//                               {loading ? "Сохраняем..." : "Сохранить"}
//                             </button>
//                           </>
//                           <br />
//                         </>
//                       )}
//                     </Mutation>
//                   )}
//                 </>
//               ))}
//             </>
//           );
//         }}
//       </Query>
//     </div>
//   );
// };

// export default paidApplications;

// const CP_QUERY = gql`
//   query CP_QUERY {
//     notes {
//       id
//       text
//       next
//     }
//   }
// `;

// const UL_MUTATION = gql`
//   mutation UL_MUTATION($id: ID!, $next: Json) {
//     updateNote(id: $id, next: $next) {
//       id
//     }
//   }
// `;

// const paidApplications = () => {
//   const [next, setNext] = useState();

//   const change = (el) => {
//     let newNext = {
//       true: {
//         type: el && el.true ? Object.keys(el.true)[0] : null,
//         value: el && el.true ? Object.values(el.true)[0] : null,
//       },
//       false: {
//         type: el && el.false ? Object.keys(el.false)[0] : null,
//         value: el && el.false ? Object.values(el.false)[0] : null,
//       },
//     };
//     setNext(newNext);
//     console.log(el);
//     console.log(newNext);
//   };
//   return (
//     <div>
//       <Query query={CP_QUERY}>
//         {({ data, loading }) => {
//           if (loading) return "...";
//           const data2 = data.notes.filter((q) => q.next !== null);
//           console.log(data2);

//           return (
//             <>
//               {data2.map((el) => (
//                 <Mutation
//                   mutation={UL_MUTATION}
//                   variables={{
//                     id: el.id,
//                     next: next,
//                   }}
//                 >
//                   {(updateNote, { loading, error }) => (
//                     <>
//                       <p>
//                         {el.text} {el.next.true !== undefined ? "Да" : null}{" "}
//                         {el.next.false !== undefined ? "Да" : null}{" "}
//                       </p>
//                       <button
//                         onClick={async (e) => {
//                           const data0 = await change(el.next);
//                           setTimeout(function () {
//                             updateNote();
//                           }, 1500);
//                           console.log("!");
//                         }}
//                       >
//                         Update
//                       </button>
//                     </>
//                   )}
//                 </Mutation>
//               ))}
//             </>
//           );
//         }}
//       </Query>
//     </div>
//   );
// };

// export default paidApplications;

const FOR_MONEY_COURSE_PAGES_QUERY = gql`
  query FOR_MONEY_COURSE_PAGES_QUERY(
    $type: CourseType!
    $boolean: Boolean = true
  ) {
    coursePages(where: { courseType: $type, published: $boolean }) {
      id
      title
    }
  }
`;

const DynamicComponent = dynamic(import("../components/ActiveUsers"), {
  ssr: false,
});

const PaidApplicationsPage = () => (
  <>
    <DynamicComponent />
    <Query
      query={FOR_MONEY_COURSE_PAGES_QUERY}
      returnPartialData={true}
      fetchPolicy="cache-first"
      variables={{
        type: "FORMONEY",
      }}
    >
      {({ data, loading, error }) => {
        if (loading) return <p>Загрузка...</p>;
        if (error) return <p>Error: {error.message}</p>;
        return data.coursePages.map((coursePage) => (
          <PaidApplications id={coursePage.id} title={coursePage.title} />
        ));
      }}
    </Query>
  </>
);

export default PaidApplicationsPage;
