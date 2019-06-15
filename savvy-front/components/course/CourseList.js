import React, { Component } from 'react';
import styled from 'styled-components';
import Course from './Course';

class CourseList extends Component {
    render() {
        let list = [];
        const { me, courseList } = this.props;
        
        if(this.props.type === "FORMONEY"){
            courseList.map(course => (
                course.courseType === "FORMONEY" ? list.push(course) : null
            ))
        } else if(this.props.type === "PUBLIC") {
            courseList.map(course => (
                course.courseType === "PUBLIC" || course.courseType === "PRIVATE" ? list.push(course) : null
            ))
        }
        return (
            <>
                {list.map(coursePage => <Course me={me} key={coursePage.id} id={coursePage.id} coursePage={coursePage}/>) }
            </>
        );
    }
}

export default CourseList;