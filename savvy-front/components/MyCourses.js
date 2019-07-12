import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import MyCourse from './course/MyCourse';

const MY_COURSES_QUERY = gql`
  query MY_COURSES_QUERY($idList: [ID!]) {
    coursePages(where: { id_in: $idList}) { 
      id
      title
      user  {
          id
          name
      }
      description
      courseType
      image
      }
    }
`;

const MyCoursesStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CoursesStyles = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

class MyCourses extends Component {
    render() {
        return (
            <div>
                <Query
                    query={MY_COURSES_QUERY}
                    variables={{
                        idList: this.props.meData.subjects,
                    }}
                >
                {({ data, error, loading, fetchMore}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        return (
                            <MyCoursesStyles>
                                <h2>Список курсов, на которые вы зарегистрировались:</h2>
                                {data.coursePages == 0 ? 
                                <p>Вы пока еще не трированы ни на один курс. Выберите курс для себя на главной странице.</p>
                                :
                                <CoursesStyles>
                                {data.coursePages.map(coursePage => <MyCourse key={coursePage.id} id={coursePage.id} coursePage={coursePage}/>)}
                                </CoursesStyles>
                                }
                            </MyCoursesStyles>
                    )}}
                </Query>
            </div>
        );
    }
}

export default MyCourses;