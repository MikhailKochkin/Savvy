import React, { Component } from 'react';
import SingleTest from './SingleTest';
import styled from 'styled-components';

const GroupStyles = styled.div`
    display: ${props => props.unfolded ? "block" : "none"};
`;

class TestGroup extends Component {
    state = {
        shown: false
    }
    onShow = () => this.setState((prevState) => ({
        shown: !prevState.shown
    })) 
    render() {
        return (
            <>
                <button 
                    onClick = {this.onShow}
                >
                  {this.state.shown ? "Свернуть" : "Развернуть"}
                </button>
                <GroupStyles unfolded={this.state.shown}>
                    {this.props.tests.map(test => <SingleTest key={test.id} test={test} lessonID={this.props.lessonID}/>)}
                </GroupStyles>
            </>
        );
    }
}

export default TestGroup;