import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import styled from 'styled-components';

const Styles = styled.div`
    background: white;
    width: 75%;
    font-size: 1.6rem;
    padding: 2%;
    margin: 1%;
    color: black;
`;

class Test extends Component {
    state = {
        answer: ''
    }

    onMouseClick = (e) => {
         console.log(e.target )
          this.setState({ answer: e.target.title })
          e.target.style.backgroundColor = '#ffa64d';
          e.target.style.padding = '0.8%';
          e.target.style.borderRadius = '8px';
        //   if(e.target.title !== "Здесь все вроде бы в порядке.." && this.state.found < this.state.total) {

        //   }
        console.log("!!!")
   


        // Для задач

        // console.log(e.target.nextSibling)
        // e.target.nextSibling.toggleAttribute("hidden")
        // element.toggleAttribute("hidden")
        // var div = document.createElement("DIV");   // Create a <button> element
        // div.innerHTML = e.target.title;                   // Insert text
        // e.target.parentElement.appendChild(div);
        // e.target.title  = "";
    
        // console.log(e.target.parentElement)
        // console.log(div)
        
        // this.setState({
        //     answer: e.target.title,
        // })
        
    }

    componentDidUpdate() {
        const elements = document.querySelectorAll("#id")
        // console.log(elements)
        elements.forEach(element => element.addEventListener('click', this.onMouseClick))
        
        // работает при условии componentDidMount

        // для задач
    //     const elements = document.querySelectorAll("#conceal")
    //     let div = document.createElement("DIV")
    //     elements.forEach(element => {
    //         element.setAttribute("hidden", "");
    //         div.innerHTML = element.getAttribute("data-text")
    //         div.addEventListener('click', this.onMouseClick)
    //         element.parentElement.insertBefore(div, element)
    // })}
    }

    render() {
        const { data } = this.props
        console.log(data)
        return (
            <Styles>
                <>
                    <p>Answer: {this.state.answer}</p>
                    {renderHTML(data)}
                </>
            </Styles>
        );
    }
}

export default Test;