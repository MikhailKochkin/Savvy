import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import renderHTML from 'react-render-html';
import DeleteSingleTextEditor from '../delete/DeleteSingleTextEditor';
import User from '../User';

const Center = styled.div`
    padding-top: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TextBar = styled.div`
  width: 50%;
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
  font-family: Palatino,Palatino Linotype,Palatino LT STD,Book Antiqua,Georgia,serif;
  position: -webkit-sticky;
  position: sticky;
  padding: 0 2%;
  margin: 0 2% 0 -55%;
  background: white;
  top: 20px;
  border-right: 1px solid #C0D6DF;
  width: 50%;
  @media (max-width: 1000px) {
      margin: 0%;
      width: 100%;
      border: 1px solid #C0D6DF;
      border-radius: 10px;
    }
  @media (max-width: 500px) {
      width: 100%;
    }
`;

class SingleTextEditor extends Component {
        state = {
            shown: false,
            answer: "",
            found: 0,
            total: "",
            text: this.props.data.text
            //`
            //     <p>Philosophers from Aristotle to the Beatles have argued that money does not buy happiness. 
            //         But it seems to help. Since 2005 Gallup, a pollster, has asked a representative sample of 
            //         adults from countries across the world to rate their life satisfaction on a scale from 
            //         zero to ten. The <b> <span id='id' title='Перевод: заголовок'>headline </span></b>  result is clear: the richer the country, on average, the higher 
            //         the level of self-reported happiness. The simple correlation suggests that doubling GDP per
            //         person lifts life <b> <span id='id' title='Перевод: удовлетворение, удовольствие'> satisfaction </span></b> by about 0.7 points.
            //     </p>
            //     <p>Philosophers from Aristotle to the Beatles have argued that money does not buy happiness. 
            //         But it seems to help. Since 2005 Gallup, a pollster, has asked a representative sample of 
            //         adults from countries across the world to rate their life satisfaction on a scale from 
            //         zero to ten. The <b> <span id='id' title='Перевод: заголовок'>headline </span></b>  result is clear: the richer the country, on average, the higher 
            //         the level of self-reported happiness. The simple correlation suggests that doubling GDP per
            //         person lifts life <b> <span id='id' title='Перевод: удовлетворение, удовольствие'> satisfaction </span></b> by about 0.7 points.
            //     </p>
            //     <p>Philosophers from Aristotle to the Beatles have argued that money does not buy happiness. 
            //         But it seems to help. Since 2005 Gallup, a pollster, has asked a representative sample of 
            //         adults from countries across the world to rate their life satisfaction on a scale from 
            //         zero to ten. The <b> <span id='id' title='Перевод: заголовок'>headline </span></b>  result is clear: the richer the country, on average, the higher 
            //         the level of self-reported happiness. The simple correlation suggests that doubling GDP per
            //         person lifts life <b> <span id='id' title='Перевод: удовлетворение, удовольствие'> satisfaction </span></b> by about 0.7 points.
            //     </p>
            // `

        }
        onMouseClick= (e) => {
            this.setState({
                shown: true,
                answer: e.target.title,
            })
            if(e.target.className !== "Здесь все вроде бы в порядке.." && this.state.found < this.state.total) {
                this.setState(prevState => ({
                    found: prevState.found + 1
                }))
            }
        }
        onConceal = () => {
            this.setState({
                shown: false
            })
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
              {this.state.total !== "" && <p>Всего рисков: {this.state.total} </p>}
              {this.state.total !== "" && <p>Найдено рисков: {this.state.found} </p>}

              {this.state.shown &&
                  <Hint>
                      <div>{this.state.answer}</div>
                      <button onClick={this.onConceal}>Скрыть подсказку</button>
                  </Hint>
              }
              <EditText>
                  <div>{renderHTML(this.state.text)}</div>
              </EditText>
          </TextBar>
          { me && me.id === textEditor.user.id ?
                    <DeleteSingleTextEditor
                      id={this.props.data.id}
                      lessonId={this.props.lessonID}
                    />
                    :
                    null
         }  
        </Center>
    );
  }
}
  
  export default SingleTextEditor;

