import React, { Component } from 'react';

class FetchMore extends Component {
    render() {
        return (
            <>
               <button onClick={this.props.onLoadMore}>Загрузить</button> 
            </>
        );
    }
}

export default FetchMore;