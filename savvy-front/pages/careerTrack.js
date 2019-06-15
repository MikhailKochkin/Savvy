import React, { Component } from 'react';
import CareerTrack from '../components/career/CareerTrack';

class manageCareer extends Component {
    render() {
        return (
            <CareerTrack id={this.props.query.id} />
        );
    }
}

export default manageCareer;