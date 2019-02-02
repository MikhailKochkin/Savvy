import React, { Component } from 'react';
import SingleProblem from './SingleProblem';
import styled from 'styled-components';

const GroupStyles = styled.div`
    display: ${props => props.unfolded ? "block" : "none"};
`;

class ProblemGroup extends Component {
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
                    {this.props.problems.map(problem => <SingleProblem key={problem.id} problem={problem} lessonID={this.props.lessonID}/>)}
                </GroupStyles>
            </>
        );
    }
}

export default ProblemGroup;