import React, { Component } from 'react';
import HomePage from '../components/course/HomePage';

class Home extends Component {
    render() {
        return (
            <HomePage page={parseFloat(this.props.query.page) || 1/>
        )    
    }
}


export default Home;