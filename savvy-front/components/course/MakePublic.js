import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const MAKE_PUBLIC_MUTATION = gql`
  mutation MAKE_PUBLIC_MUTATION(
    $id: ID!,
    $published: Boolean
  ) {
    updateCoursePage(
      id: $id,
      published: $published 
    ) {
      id
    }
  }
`;

const Button = styled.button`
    background-color: ${props => props.delete ? "red" : "#008CBA"};
    border: none;
    color: white;
    padding: 5px 10px;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    width: 135px;
    margin: 2px;
    font-size:1.4rem;
    cursor: pointer;
    &:hover {
        background-color: #003D5B;
    }
`

class MakePublic extends Component {
    state = {
        published: this.props.published
    }
    onClick = async (e, updateCoursePage) => {
        e.preventDefault();
        
        updateCoursePage({
            variables: {
                id: this.props.id,
                published: !this.state.published
            }
        })
        this.setState({ published: !this.state.published})

        alert("Статус курса изменён. Курс переместится в другую категорию после перезагрузки страницы.")
            
        }
    render() {
        return (
            <Mutation 
                mutation={MAKE_PUBLIC_MUTATION}
            >
                {(updateCoursePage) => (
                    <Button 
                        onClick={e => this.onClick(e, updateCoursePage)}>
                        {this.state.published ? "Отозвать" : "Опубликовать"}
                    </Button>
             )}
            </Mutation>
        )
    }
}

export default MakePublic;