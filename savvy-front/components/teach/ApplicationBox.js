import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import AcceptApplication from "./AcceptApplication";
import RejectApplication from "./RejectApplication";

const USER_QUERY = gql`
  query USER_QUERY($id: ID!) {
    users(where: { id: $id }) {
      subjects
    }
  }
`;

const Styles = styled.div`
  padding: 0 2%;
  width: 100%;
  display: flex;
  flex-direction: column;
  display: ${props => (props.hide ? "none" : "block")};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 28%;
  justify-content: space-between;
  @media (max-width: 1300px) {
    width: 50%;
  }
`;

const COURSEPAGE_QUERY = gql`
  query COURSEPAGE_QUERY($id: ID!) {
    coursePages(where: { id: $id }) {
      students
    }
  }
`;

class ApplicationBox extends Component {
  state = {
    accept: "no"
  };
  myCallback = dataFromChild => {
    this.setState({
      accept: dataFromChild
    });
  };
  render() {
    return (
      <Styles>
        <Query
          query={USER_QUERY}
          variables={{
            id: this.props.applicantId
          }}
          fetchPolicy="cache-first"
        >
          {({ data: userData, loading: userLoading }) => {
            if (userLoading) return <p>Loading...</p>;
            // if (error1) return <p>Error: {error1.message}</p>;

            const subjects = userData.users[0].subjects;
            return (
              <Query
                query={COURSEPAGE_QUERY}
                variables={{
                  id: this.props.coursePageId
                }}
                fetchPolicy="cache-first"
              >
                {({ data: courseData, loading: courseLoading }) => {
                  if (courseLoading) return <p>Loading...</p>;
                  // if (error1) return <p>Error: {error1.message}</p>;
                  const arr2 = [];
                  courseData.coursePages.map(course =>
                    arr2.push(course.students)
                  );
                  const students = courseData.coursePages[0].students;
                  return (
                    <>
                      <h3>{this.props.name}</h3>
                      <Buttons>
                        {this.state.accept === "no" && (
                          <>
                            <AcceptApplication
                              subjects={subjects}
                              students={students}
                              applicantId={this.props.applicantId}
                              coursePageId={this.props.coursePageId}
                              applicationId={this.props.applicationId}
                              getData={this.myCallback}
                            />
                            <RejectApplication
                              applicationId={this.props.applicationId}
                              getData={this.myCallback}
                            />
                          </>
                        )}
                        {this.state.accept === "accept" && (
                          <div>Заявка одобрена</div>
                        )}
                        {this.state.accept === "reject" && (
                          <div>Заявка отклонена</div>
                        )}
                      </Buttons>
                    </>
                  );
                }}
              </Query>
            );
          }}
        </Query>
      </Styles>
    );
  }
}

export default ApplicationBox;
