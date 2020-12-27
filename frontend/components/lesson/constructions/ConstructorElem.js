import React, { Component } from 'react';
import styled from 'styled-components';

const Zone = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 2%;
`;

const DocBlock = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid #C0D6DF;
    flex: 1 45%;
    margin-right: 2%;
    margin-bottom: 1%;
`;

const VarList = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 45%;
`;

const Element = styled.div`
    width: 80%;
    height: auto;
    margin: 1%;
    padding: 2%;
    background: #F0F8FF;
    border-radius: 5px;
    /* border-bottom: 1px solid #C0D6DF; */
`;

const Message = styled.p`
    background-color: #00FF7F;
    font-size: 1.8rem;
    padding: 1% 2%;
    border-radius: 10px;
    width: 70%;
`;

const Contract = styled.div`
    font-size: 1.6rem;
`;



class ConstructorElem extends Component {
    state = { 
        pos1vars: [
            {
              pos: this.props.data.pos,
              right: true,
              answer: this.props.data.right1,
              tip: this.props.data.tip1
            },
            {
              pos: this.props.data.pos,
              right: false,
              answer: this.props.data.wrong11,
              tip: this.props.data.tip1
            },
            {
              pos: this.props.data.pos,
              right: false,
              answer: this.props.data.wrong12,
              tip: this.props.data.tip1
            },
          ],
        pos1: [],
        draggedVar: {},
        mistake: false,
    }
    shuffle = (array) => {
        var m = array.length, t, i;
      
        // While there remain elements to shuffle…
        while (m) {
      
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
      
          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
      
        return array;
    }
    
    onDrag = (e, variant) => {
            event.preventDefault();
            this.setState({
                draggedVar: variant
            });
            // console.log(this.state.draggedVar)
    }
    onDragOver = (event) => {
        event.preventDefault();
      }
    onDrop = (event) => {
        event.preventDefault();
        const { pos1, draggedVar, pos1vars } = this.state;
        if(draggedVar.right && draggedVar.pos === this.state.pos1vars[0].pos) {
        this.setState({
          pos1: [draggedVar],
          pos1vars: pos1vars.filter(variant => variant.answer !== draggedVar.answer),
          draggedVar: {},
          mistake: false
        });
        } else if(!draggedVar.right) {
            this.setState({ mistake: true})
        }
    } 
    render() {
        const { pos1vars, pos1, pos2} = this.state;
        const pos2vars = this.shuffle(pos1vars)
        return (
            <>
            
            <Zone>
                <DocBlock>
                    <p>Пункт {this.props.data.pos}.</p>
                    {this.state.mistake && pos1vars[0].tip !== "" ? <Message>{pos1vars[0].tip}</Message> : null}
                    {pos2vars.map(variant =>
                    <>
                        <Element
                            key={variant.answer}
                            draggable
                            onDrag={(event) => this.onDrag(event, variant)}
                        >
                        {variant.answer}
                        </Element>
                    </>
                    )}
                </DocBlock>
                <VarList
                    onDrop={event => this.onDrop(event)}
                    onDragOver={(event => this.onDragOver(event))}
                    className="done"
                >
                    {pos1.map((variant) =>
                        <Contract
                            key={variant.answer}
                        >
                        {this.props.data.pos}. {variant.answer}
                        </Contract>
                    )}
                </VarList>
                <br/>
            </Zone>
            </>
        )}};

export default ConstructorElem;

