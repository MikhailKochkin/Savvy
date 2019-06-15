import React, { Component } from 'react';
import styled from 'styled-components';
import renderHTML from 'react-render-html';
import DeleteSingleProblem from '../delete/DeleteSingleProblem';

const TextBar = styled.div`
  width: 85%;
  font-size: 1.8rem;
  border-bottom: 1px solid #C0D6DF;
  padding-top: 2%;
  padding-bottom: 2%;
  margin-bottom: 2%;
  @media (max-width: 800px) {
    width: 100%;
    padding: 2%;
  }
  .hint {
      color: #333A8A;
      text-decoration: underline;
      cursor: pointer;
  }
  a {
    color: #800000;
    text-decoration: underline;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: 20em;
    box-shadow: '0 0 0 2px blue;'
  }
  iframe {
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
          width: 100%;
          height: auto;
      }
  }
  
`;

class SingleProblem extends Component {
    state={
        uploaded: false,
        num: 0
    }

    onMouseClick = (e) => {
       e.target.nextSibling.toggleAttribute("hidden")
   }

   componentDidMount(prevState) {
        const elements = document.querySelectorAll("#conceal")
        let p;
        elements.forEach(element => {
            p = document.createElement("P")
            p.innerHTML = element.getAttribute("data-text")
            p.setAttribute("class", "hint")
            element.setAttribute("hidden", "");
            element.parentElement.insertBefore(p, element)
            p.addEventListener('click', this.onMouseClick)
        })
    }

    render() {
  
      const { problem, me, lessonID } = this.props;

      const elements = document.querySelectorAll("#conceal")
        let p;
 
        elements.forEach(element => {
            p = document.createElement("P")
            p.innerHTML = element.getAttribute("data-text")
            element.setAttribute("hidden", "");
            element.parentElement.insertBefore(p, element)
            p.addEventListener('click', this.onMouseClick)
        })
      return (
                <>
                  <TextBar>
                    {renderHTML(problem.text)}
                  </TextBar>
                  { me && me.id === problem.user.id ?
                    <DeleteSingleProblem
                      id={problem.id}
                      lessonID={lessonID}
                    />
                    :
                    null
                  }
                </>  
                );
              }
            }
  
  export default SingleProblem;
  export { SINGLE_CASE_QUERY };

