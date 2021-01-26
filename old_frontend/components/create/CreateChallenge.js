import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import AreYouATeacher from "../auth/AreYouATeacher";
import PleaseSignIn from "../auth/PleaseSignIn";
import { CURRENT_USER_QUERY } from "../User";

const CREATE_CHALLENGE_MUTATION = gql`
  mutation CREATE_CHALLENGE_MUTATION(
    $name: String!
    $number: Int
    $description: String!
    $coursePageID: ID!
  ) {
    createChallenge(
      name: $name
      number: $number
      description: $description
      coursePage: $coursePage
    ) {
      id
    }
  }
`;

const CreateChallenge = (props) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const [description, setDescription] = useState("");

  myCallback2 = (dataFromChild, name) => {
    setDescription(dataFromChild);
  };

  return (
    <>
      <div id="root"></div>

      <>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          id="number"
          name="number"
          placeholder="Номер"
          onChange={(e) => setNumber(e.target.value)}
        />

        <Frame>
          <DynamicHoverEditor
            index={1}
            name="description"
            getEditorText={myCallback2}
            placeholder="Описание"
          />
        </Frame>

        <Mutation
          mutation={CREATE_CHALLENGE_MUTATION}
          variables={{
            coursePageID: props.id,
            // ...this.state,
          }}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        >
          {(createChallenge, { loading, error }) => (
            <Buttons>
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await createChallenge();
                  Router.push({
                    pathname: "/lesson",
                    query: {
                      id: res.data.createChallenge.id,
                      type: "regular",
                    },
                  });
                }}
              >
                {loading ? "Сохраняем..." : "Cохранить"}
              </Button>
              <Link
                href={{
                  pathname: "/coursePage",
                  query: { id: props.id },
                }}
              >
                <div>Вернуться на страницу урока</div>
              </Link>
            </Buttons>
          )}
        </Mutation>
      </>
    </>
  );
};

export default CreateChallenge;
