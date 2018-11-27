import React, { Component } from 'react';
import Editor from './Editor';

const CreateCase = props => (
    <div>
        <p>Create your case Page</p>
        <p>You can either structure you case in a way you like
        or preferably use the IRAC model. Learn more about IRAC by clicking <a href='#'>this link</a>. </p>
        <Editor/>
    </div>
)

export default CreateCase;
