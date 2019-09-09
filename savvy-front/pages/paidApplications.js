import PaidApplications from "../components/PaidApplications";
import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

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

const PaidApplicationsPage = () => (
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
);

export default PaidApplicationsPage;
