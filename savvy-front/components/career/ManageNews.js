import React, { Component } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import dynamic from 'next/dynamic';
import Link from 'next/link';


const CREATE_NEWS_MUTATION = gql`
  mutation CREATE_NEWS_MUTATION(
    $title: String!
    $synopsis: String!
    $link: String
    $careerTrackID: ID!
  ) {
    createNews(
      title: $name
      synopsis: $text 
      link: $doc
      careerTrackID: $coursePageID
    ) {
      id
    }
  }
`;

const ManageNewsStyle = styled.div`
    
`;

const ShowNews = styled.div`
    display: flex;
    flex-basis: 50%;
    flex-direction: column;
    background-color: white;
`;

const CreateNews = styled.div`
    display: flex;
    flex-basis: 50%;
    flex-direction: column;
    background-color: white;
`;

const Label = styled.label`
    display: grid;
    width: 80%;
    font-size: 1.8rem;
    grid-template-columns: 20% 80%;
    grid-template-rows: 100%;
    justify-items: center;
    align-items: center;
    .first {
        grid-area: first;
    }

    grid-template-areas:
        "first second";
    input {
        height: 50%;
        width: 80%;
        border: 1px solid #ccc;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
        border-radius: 3.5px;
        padding: 2%;
        font-size: 1.4rem;

    }
    select {
        font-size: 1.6rem;
    }
    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
    }
`;

const Width = styled.div`
  display: flex;
  background: white;
  border: 0.25px solid #F8F8F8;
  border-radius: 4px;
  padding: 2% 0;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 3%;
  /* ${SubmitButton} {
    margin-top: 3%;
  } */
`;

const CustomSelect = styled.div`

`;

const DynamicLoadedEditor = dynamic(
    import('../editor/Editor'),
    {
      loading: () => (<p>Загрузка...</p>),
      ssr: false
    }
  )

class ManageNews extends Component {
    state = {
        text: '',
        synopsis: '',
        careerTrackID: this.props.data[0].id,
    }
    myCallback = (dataFromChild) => {
        this.setState({ 
          text: dataFromChild
        });
      }
    handleName = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value});
      }
    render() {
        return (
            <ManageNewsStyle>
                <Width>
                    <Label className="title" htmlFor="title">
                    <p className="first">Название материала</p>
                        <input
                        type="text"
                        id="title"
                        name="title"
                        //   placeholder="Название урока"
                        value={this.state.title}
                        onChange={this.handleName}
                        />
                    </Label>
                    <Label className="title" htmlFor="title">
                      
                        <p className="first">Карьерный трек</p>
                        <select name="careerTrackID" value={this.state.careerTrackID} onChange={this.handleName}>
                        {this.props.data.map(track => 
                            <option value={track.id}>{track.name}</option>
                        )}                        
                        </select>
                       
                    </Label>
                </Width>
                <DynamicLoadedEditor getEditorText={this.myCallback}/>

                {/* <ShowNews>
                    Все новости
                </ShowNews>
                <CreateNews>
                    Создать новость
                </CreateNews> */}
            </ManageNewsStyle>
        );
    }
}

export default ManageNews;