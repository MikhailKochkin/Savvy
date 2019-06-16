import React, { Component } from 'react';
import HomePage from '../components/course/HomePage';

class Courses extends Component {
    render() {
        return (
            <HomePage page={parseFloat(this.props.query.page) || 1 }/>
        )    
    }
}


export default Courses;