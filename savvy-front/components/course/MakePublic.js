import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";

const MAKE_PUBLIC_MUTATION = gql`
  mutation MAKE_PUBLIC_MUTATION($id: String!, $published: Boolean) {
    publishCourse(id: $id, published: $published) {
      id
    }
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.green};
  border-radius: 5px;
  width: 200px;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
`;

class MakePublic extends Component {
  state = {
    published: this.props.published,
  };
  onClick = async (e, updateCoursePage) => {
    e.preventDefault();

    updateCoursePage({
      variables: {
        id: this.props.id,
        published: !this.state.published,
      },
    });
    this.setState({ published: !this.state.published });
  };
  render() {
    return (
      <Mutation
        mutation={MAKE_PUBLIC_MUTATION}
        // refetchQueries={() => [
        //   {
        //     query: SINGLE_COURSEPAGE_QUERY,
        //     variables: { id: this.props.id },
        //   },
        // ]}
      >
        {(updateCoursePage) => (
          <Button onClick={(e) => this.onClick(e, updateCoursePage)}>
            {this.state.published ? "Hide" : "Publish"}
          </Button>
        )}
      </Mutation>
    );
  }
}

export default MakePublic;
