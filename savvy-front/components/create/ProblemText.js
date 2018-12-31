import React, { Component } from 'react';

class ProblemText extends Component {
    state = {
        text: ''
    }
    handleChange = e => {
        const { name, type, value } = e.target;
        // const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: value});
        this.props.getEditorText(this.state.text);
      };
    render() {
        return (
            <div>
                <label htmlFor="text">
                      <input
                        type="text"
                        id="text"
                        name="text"
                        placeholder="Текст задачи.."
                        value={this.state.text}
                        onChange={this.handleChange}
                      />
                </label>
            </div>
        );
    }
}

export default ProblemText;