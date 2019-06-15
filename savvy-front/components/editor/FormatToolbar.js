import React from 'react';
import { withTheme } from 'styled-components';

const FormatToolbarStyles = {
    display: 'flex',
    // borderBottom:'solid 1.7px',
    background: 'white',
    padding: '2%',
    margin: '0 0 10px 0',
    position: '-webkit-sticky',
    position: 'sticky',
    top: '20px',
}


const FormatToolBar = (props) => (
    <div style={FormatToolbarStyles}>
        {props.children}
    </div>
);

export default FormatToolBar;