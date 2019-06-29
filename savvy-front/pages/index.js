import React, { Component } from 'react';
import HomePage from '../components/course/HomePage';
import User from '../components/User';

class Home extends Component {
    render() {
        return (
            <User>
              {({data: {me}}) => {
                  return (
                 <HomePage me = {me}/>
                  )} }
            </User>

        )    
    }
}


export default Home;