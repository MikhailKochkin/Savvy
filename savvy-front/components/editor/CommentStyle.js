import React from 'react';
import styled from 'styled-components';

const Span = styled.a`
    color: #333A8A;
`;

const CommentStyle = props => (
    <Span id="id" title={props.title} >
        {props.children}
    </Span>
);

export default CommentStyle;