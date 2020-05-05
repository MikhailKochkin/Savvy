import PaidApplications from "../components/PaidApplications";
import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import dynamic from "next/dynamic";

const CP_QUERY = gql`
  query CP_QUERY($id: ID!) {
    coursePage(where: { id: $id }) {
      id
      lessons {
        name
        id
        map
      }
    }
  }
`;

const UL_MUTATION = gql`
  mutation UL_MUTATION($id: ID!, $structure: Json) {
    updateLesson(id: $id, structure: $structure) {
      id
    }
  }
`;

const paidApplications = () => {
  return (
    <div>
      <Query
        query={CP_QUERY}
        variables={{
          id: "ck89zsn5200790701jcpqxmiu",
        }}
      >
        {({ data, loading, fetchMore }) => {
          if (loading) return "...";
          // console.log(data1.articles);
          console.log(data.coursePage.lessons);
          // return <p>!</p>;
          return data.coursePage.lessons.map((l) => {
            console.log(l);
            let arr2 = [];
            if (l.map && l.map.length > 0) {
              l.map[0].map((el) => {
                let obj = new Object();
                obj.type = Object.keys(el)[0];
                obj.id = Object.values(el)[0];
                arr2.push(obj);
              });
            }
            console.log(arr2);
            // return <p>!</p>;
            return (
              <Mutation
                mutation={UL_MUTATION}
                variables={{
                  id: l.id,
                  structure: arr2,
                }}
              >
                {(updateLesson, { loading, error }) => (
                  <>
                    <>
                      {l.name} – {l.map.length > 0 ? "Есть карта" : "Нет карты"}
                      {/* {console.log("sddsd", l.map.length > 0)} */}
                      <button
                        onClick={async (e) => {
                          // Stop the form from submitting
                          e.preventDefault();
                          // call the mutation
                          console.log(l);
                          if (l.map) {
                            const res = await updateLesson();
                          }
                        }}
                      >
                        {loading ? "Сохраняем..." : "Сохранить"}
                      </button>
                    </>
                    <br />
                  </>
                )}
              </Mutation>
            );
          });
        }}
      </Query>
    </div>
  );
};

export default paidApplications;

// const FOR_MONEY_COURSE_PAGES_QUERY = gql`
//   query FOR_MONEY_COURSE_PAGES_QUERY(
//     $type: CourseType!
//     $boolean: Boolean = true
//   ) {
//     coursePages(where: { courseType: $type, published: $boolean }) {
//       id
//       title
//     }
//   }
// `;

// const DynamicComponent = dynamic(import("../components/ActiveUsers"), {
//   ssr: false
// });

// const PaidApplicationsPage = () => (
//   <>
//     <DynamicComponent />
//     <Query
//       query={FOR_MONEY_COURSE_PAGES_QUERY}
//       returnPartialData={true}
//       fetchPolicy="cache-first"
//       variables={{
//         type: "FORMONEY"
//       }}
//     >
//       {({ data, loading, error }) => {
//         if (loading) return <p>Загрузка...</p>;
//         if (error) return <p>Error: {error.message}</p>;
//         return data.coursePages.map(coursePage => (
//           <PaidApplications id={coursePage.id} title={coursePage.title} />
//         ));
//       }}
// //     </Query>
// //   </>
// // );

// export default PaidApplicationsPage;
