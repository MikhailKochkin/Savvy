import React, { Component } from 'react';
import { NavButton, SubmitButton } from './styles/Button';

class FetchMore extends Component {
    render() {
        return (
            <>
               <NavButton onClick={this.props.onLoadMore}>Загрузить еще</NavButton> 
            </>
        );
    }
}

export default FetchMore;