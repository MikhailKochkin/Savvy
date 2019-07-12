import React, { Component } from 'react';
import styled from 'styled-components';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import renderHTML from 'react-render-html';
import DeleteSingleProblem from '../delete/DeleteSingleProblem';

const CREATE_PROBLEMRESULT_MUTATION = gql`
  mutation CREATE_PROBLEMRESULT_MUTATION(
    $answer: String
    $revealed: [String!]
    $lessonID: ID
    $problemID: ID
  ) {
    createProblemResult(
      answer: $answer
      revealed: $revealed
      lessonID: $lessonID
      problemID: $problemID
    ) {
      id
    }
  }
`;

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
    @media (max-width: 750px) {
        width: 100%;
        height: auto;
    }
  }
  
`;

const Button = styled.button`
    padding: 1% 2%;
    background: #F79101;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    font-size: 1.6rem;
    margin: 2%;
    width: 40%;
    cursor: pointer;
    &:hover {
        background: #F26915;;
    }
    @media (max-width: 750px) {
        margin: 2%;
    }
`;

const Form  = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
    textarea {
      width: 80%;
      padding: 1%;
      margin: 2%;
      font-size: 1.8rem;
      height: 100px;
      @media (max-width: 750px) {
        width: 95%;

        height: auto;
    }
    }
`;

class SingleProblem extends Component {
    state={
        num: 0,
        upload: false,
        answer: '',
        revealAnswer: false,
        revealed: []
    }

    handleChange = e => {
      e.preventDefault();
      const { name, value } = e.target;
      this.setState({[name]: value});
    }

    onCheck = (data) => {
      if(!this.state.revealed.includes(data)){
      this.setState(prevState => ({
          revealed: [...prevState.revealed, data]
        }))
    }}

    onMouseClick = (e) => {
      if(e.target.innerHTML.toLowerCase() !== "ответ" || this.state.revealAnswer === true){
        e.target.nextSibling.toggleAttribute("hidden")
      } else {
        console.log('Запрещено')
      }
      this.onCheck(e.target.innerHTML);
   }

   componentDidMount() {
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
      const { problem, me, userData } = this.props;
      const data = this.props.userData.filter(result => result.problem.id === this.props.problem.id)
      return (
                <>
                  <TextBar>
                    {renderHTML(problem.text)}
              
                  </TextBar>
                  {data.length > 0 && 
                  <>
                  <p>Работа уже сдана.</p>
                  <Button onClick={
                        async e => {
                            // Stop the form from submitting
                            e.preventDefault();
                            // call the mutation
                           
                            const res2 = await this.setState({ revealAnswer: true })
                            // change the page to the single case page
                            
                            }
                      }>
                      Открыть ответ
                      </Button>
                  </>
                }
                {!this.state.revealAnswer && data.length < 1 &&
                  <Form>
                    {this.state.revealAnswer && <p>Теперь вы можете посмотреть ответ.</p>}
                    <textarea
                        rows={4}
                        id="answer"
                        name="answer"
                        placeholder="Ответ..."
                        required
                        value={this.state.answer}
                        onChange={this.handleChange}
                    />
      
                  <Mutation 
                    mutation={CREATE_PROBLEMRESULT_MUTATION} 
                    variables={{
                          lessonID: this.props.lessonID,
                          answer: this.state.answer,
                          revealed: this.state.revealed,
                          problemID: this.props.problem.id
                    }}
                  >
                    {(createProblemResult, {loading, error}) => (
                      <Button onClick={
                        async e => {
                            // Stop the form from submitting
                            e.preventDefault();
                            // call the mutation
                            const res = await createProblemResult();
                            const res2 = await this.setState({ revealAnswer: true })  
                            }
                      }>
                      {loading ? "В процессе" : "Сдать задачу"}
                      </Button>
                  )}
                  </Mutation>
                </Form>}
            
                  { me && me.id === problem.user.id ?
                    <DeleteSingleProblem
                      id={this.props.problem.id}
                      lessonId={this.props.lessonId}
                    />
                    :
                    null
                  }
                </>  
                );
              }
            }
  
  export default SingleProblem;

