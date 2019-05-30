import React, { Component } from 'react';
import styled from 'styled-components';
import Course from './Course';

class CourseList extends Component {
    render() {
        let list = [];
        const data = this.props.courseList
        if(this.props.type === "FORMONEY"){
            data.map(course => (
                course.courseType === "FORMONEY" || course.courseType === "PRIVATE" ? list.push(course) : null
            ))
        } else if(this.props.type === "PUBLIC") {
            data.map(course => (
                course.courseType === "PUBLIC" ? list.push(course) : null
            ))
        }
        return (
            <>
                {list.map(coursePage => <Course key={coursePage.id} id={coursePage.id} coursePage={coursePage}/>) }
            </>
        );
    }
}

export default CourseList;