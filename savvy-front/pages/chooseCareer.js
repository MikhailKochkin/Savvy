import React, { Component } from 'react';
import ChooseCareer from '../components/career/ChooseCareer';
import User from '../components/User';

class chooseCareer extends Component {
    render() {
        return (
            <User>
                {({data: {me}}) => (  
                <ChooseCareer me={me} />
            )}
            </User>
        );
    }
}

export default chooseCareer;