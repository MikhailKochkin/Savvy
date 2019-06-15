import React, { Component } from 'react';
import styled from 'styled-components';
import renderHTML from 'react-render-html';
import DeleteSingleTextEditor from '../delete/DeleteSingleTextEditor';
import Right from  './Right'

const Center = styled.div`
    padding-top: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TextBar = styled.div`
  width: 80%;
  font-size: 1.8rem;
  padding: 0 2%;
  border-radius: 5px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const EditText = styled.div`
  font-family: Palatino,Palatino Linotype,Palatino LT STD,Book Antiqua,Georgia,serif; 
`;

const Hint = styled.div`
  position: -webkit-sticky;
  position: sticky;
  padding: 0 2%;
  margin: 0 2% 0 0%;
  background: white;
  top: 20px;
  border: 1px solid #C0D6DF;
  border-radius: 10px;
  width: 100%;
  div {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
`;

class SingleTextEditor extends Component {
        state = {
            shown: false,
            mistakesShown: false,
            answer: "",
            found: 0,
            total: this.props.data.totalMistakes,
            text: this.props.data.text,
        }
        onMouseClick= (e) => {
          if(this.state.total !== null) {
            e.target.style.backgroundColor = '#ffa64d';
            e.target.style.padding = '0.8%';
            e.target.style.borderRadius = '8px';
            if(e.target.title !== "Здесь все вроде бы в порядке.." && this.state.found < this.state.total) {
                this.setState(prevState => ({
                    found: prevState.found + 1
                }))
            }
          }
          this.setState({
            shown: true,
            answer: e.target.title,
          })
        }

        onConceal = (e) => {
            this.setState({
                shown: false
            })
            e.currentTarget.style.textDecorationLine = null
        }

        onShow = () => {
          const mistakes = document.querySelectorAll("#id")
          this.setState(prevState => ({ mistakesShown:!prevState.mistakesShown}))
          if(!this.state.mistakesShown){
            mistakes.forEach(mistake => mistake.style.backgroundColor = '#ffa64d')
            mistakes.forEach(mistake => mistake.style.padding = '0.8%')
            mistakes.forEach(mistake => mistake.style.borderRadius = '8px')
          } else if(this.state.mistakesShown){
            mistakes.forEach(mistake => mistake.style = null);
          }
        }
  
        componentDidMount() {
            const elements = document.querySelectorAll("#id")
            elements.forEach(element => element.addEventListener('click', this.onMouseClick))
        }
        render() {
        const textEditor = this.props.data;
        const me = this.props.me;
        return (
            <Center>
            <TextBar>
              {this.state.shown &&
              <Hint>
                  <div>{this.state.answer}</div>
                  <button onClick={this.onConceal}>Скрыть подсказку</button>
              </Hint>
              }
              <EditText>
                  <div>{renderHTML(this.state.text)}</div>
                  {this.state.total !== null && <p><strong>Найдено рисков/ошибок:</strong> {this.state.found} </p>}
                  {this.state.total === this.state.found ? <Right>Задание выполнено!</Right> : null}
              </EditText>
          </TextBar>
          {this.state.total !== null && <button onClick={this.onShow}>{this.state.mistakesShown ? "Скрыть ошибки" : "Показать ошибки"}</button>}
          <br/>
          { me && me.id === textEditor.user.id ?
            <DeleteSingleTextEditor
              id={this.props.data.id}
            />
            :
            null
         }  
        </Center>
    );
  }
}
  
  export default SingleTextEditor;

