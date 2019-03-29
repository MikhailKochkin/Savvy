import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import Course from './Course';
import Pagination from '../pagination/CoursesPagination';
import { CoursePerPage } from '../../config';
import { Tags } from '../../config';

const Center = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const PaginationCenter = styled.div`
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CasesStyles = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: 800px) {
        flex-direction: column;
        align-items: center;
    }
`;

const CustomSelect = styled.div`

`;

const ChooseTag = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    select {
        width: 30%;
        font-size: 1.4rem;
        margin-top: 5%;
        margin: 3%;
    }
    ${CustomSelect} {
        width: 30%;
        border-radius: 3px;
    }
    ${CustomSelect} select {
        width: 100%;
        border: none;
        box-shadow: none;
        background: #0878C6;
        color: white;
    }
    ${CustomSelect} select:focus {
        outline: none;
    }
    @media (max-width: 800px) {
        select {
            width: 100%;
        }
        ${CustomSelect} {
            width: 70%;
            border-radius: 3px;
        }
    }
`;

const ALL_COURSE_PAGES_QUERY = gql`
  query ALL_COURSE_PAGES_QUERY($skip: Int = 0, $first: Int = ${CoursePerPage}) {
    coursePages(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      description
      image
      tags
      courseType
      students
      price
      pointsA {
          id
      }
      applications {
          id
          applicantId
      }
      user {
          id
          name
      }
    }
  }
`;

const ALL_COURSEBYTAGS_PAGES_QUERY = gql`
  query ALL_COURSEBYTAGS_PAGES_QUERY {
    coursePages {
      id
      title
      description
      image
      tags
      courseType
      students
      price
      pointsA {
          id
      }
      applications {
          id
          applicantId
      }
      user {
          id
          name
      }
    }
  }
`;

class Courses extends Component {
    state = {
        tag: "Корпоративное право"
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value});
      };
    render() {
        return (
            <Center>
                <PaginationCenter>
                    <Pagination page={this.props.page} />
                </PaginationCenter>
                    <h1>Курсы</h1>
                    <Query 
                        query={ALL_COURSE_PAGES_QUERY} 
                        fetchPolicy="cache-first"
                        variables={{
                            skip: this.props.page * CoursePerPage - CoursePerPage
                    }}>
                    {({ data, error, loading }) => {
                        if (error) return <p>Error: {error.message}</p>;
                        return <CasesStyles>
                            {loading ? 
                            <ReactLoading type={'spin'} color={'#13214D'} height={60} width={60} />
                            :
                            data.coursePages.map(coursePage => <Course key={coursePage.id} id={coursePage.id} coursePage={coursePage}/>)}
                            </CasesStyles>  
                    }}
                   </Query>
                   <ChooseTag>
                    <h2> Рекомендуем для тех, кого интересует: {this.state.tag} </h2>
                    <CustomSelect>
                        <select name="tag" value={this.state.tag} onChange={this.handleChange}>
                                {Tags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                        </select>
                    </CustomSelect>
                   </ChooseTag>
                   <Query 
                    query={ALL_COURSEBYTAGS_PAGES_QUERY} 
                    fetchPolicy="cache-first"
                    variables={{
                        skip: this.props.page * CoursePerPage - CoursePerPage,
                        // first: 4,
                    }}>
                    {({ data, error, loading }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        const tagged = data.coursePages.filter(course => course.tags.includes(this.state.tag))
                        tagged.length === 0
                        return (
                            <CasesStyles>
                                {tagged.length === 0 ? 
                                <p>По этому тэгу пока еще нет курсов. Но мы это скоро исправим. Напишите нам, 
                                если у вас есть предложение по тому, как это сделать.</p>
                                :
                                tagged.map(coursePage => 
                                    <Course 
                                        key={coursePage.id}
                                        id={coursePage.id} 
                                        coursePage={coursePage}
                                />)
                                }
                            </CasesStyles>
                        )
                    }}
                   </Query>
                {/* <Pagination page={this.props.page}/> */}
            </Center>
        );
    }
}

export default Courses;
export {ALL_COURSE_PAGES_QUERY};