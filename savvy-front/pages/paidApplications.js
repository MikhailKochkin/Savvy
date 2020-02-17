import PaidApplications from "../components/PaidApplications";
import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import dynamic from "next/dynamic";

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
  ssr: false
});

const PaidApplicationsPage = () => (
  <>
    <DynamicComponent />
    <Query
      query={FOR_MONEY_COURSE_PAGES_QUERY}
      returnPartialData={true}
      fetchPolicy="cache-first"
      variables={{
        type: "FORMONEY"
      }}
    >
      {({ data, loading, error }) => {
        if (loading) return <p>Загрузка...</p>;
        if (error) return <p>Error: {error.message}</p>;
        return data.coursePages.map(coursePage => (
          <PaidApplications id={coursePage.id} title={coursePage.title} />
        ));
      }}
    </Query>
  </>
);

export default PaidApplicationsPage;
