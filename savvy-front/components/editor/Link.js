import React from 'react';
import styled from 'styled-components';

const A = styled.a`
    text-decoration: underline;
    color: #800000;
`;

const LinkMark = props => (
    <A property="link" href={props.href} target="_blank">
        {props.children}
    </A>
);

export default LinkMark;
