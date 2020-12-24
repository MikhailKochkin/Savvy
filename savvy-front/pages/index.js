import React, { Component } from "react";
import Courses from "../components/course/Courses";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withTranslation } from "../i18n";

const GET_DATA = gql`
  query coursePages {
    coursePages {
      id
      title
    }
  }
`;

const Index = () => {
  return (
    <Query query={GET_DATA}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        console.log(data);
        return <Courses />;
      }}
    </Query>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: ["common", "footer"],
});

export default withTranslation("common")(Index);
