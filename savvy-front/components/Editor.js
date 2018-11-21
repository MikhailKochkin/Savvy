import React, {Component} from 'react'

export default class Editor extends Component {
    constructor(props) {
      super(props)
      //Quill is tightly coupled to the browser at the moment
      //What could be done is to render only a <textarea> on server side. 
      //This should be easily accomplished in user code.
      if (typeof window !== 'undefined') {
        this.ReactQuill = require('react-quill')
      }
      this.state = {
        Case: "Share your experiences!"
      };
      this.handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
      };
    }
  
    render() {
      const ReactQuill = this.ReactQuill
      if (typeof window !== 'undefined' && ReactQuill) {
        return (
          <div>
            <form>
              <label htmlFor="title">
                  <textarea
                    type="text"
                    id="Case"
                    name="Case"
                    placeholder="Case"
                    required
                    value={this.state.Case}
                    onChange={this.handleChange}
                  />
              </label>
              <br/>
              <button type="submit">Submit</button>
            </form>
            <p>{this.state.Case}</p>
          </div>
          // <ReactQuill
          //   onChange={this.props.onChange}
          //   theme="bubble"
          //   value={this.props.value}
          // />
        )
      } else {
        return null;
      }
    }
  }