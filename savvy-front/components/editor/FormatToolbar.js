import React from 'react';

const FormatToolbarStyles = {
    display: 'flex',
    borderBottom:'solid 1.7px',
    padding: '10px 0',
    margin: '0 0 10px 0'
}


const FormatToolBar = (props) => (
    < div style={FormatToolbarStyles}>
        {props.children}
    </div>
);

export default FormatToolBar;