import React from 'react';
import styled from 'styled-components';

const Span = styled.a`
    color: #006400;
`;

const TranslationStyle = props => (
    <Span id="id" title={props.title} >
        {props.children}
    </Span>
);

export default TranslationStyle;