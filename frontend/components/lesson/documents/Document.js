import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Clause from "./Clause";
import DeleteDocument from "../../delete/DeleteDocument";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import renderHTML from "react-render-html";

const CREATE_DOCUMENTRESULT_MUTATION = gql`
  mutation CREATE_DOCUMENTRESULT_MUTATION(
    $answers: [String]
    $drafts: [String]
    $lesson: ID
    $document: ID
  ) {
    createDocumentResult(
      answers: $answers
      drafts: $drafts
      lesson: $lesson
      document: $document
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  margin-top: 5%;
`;

const Header = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Advice = styled.div`
  font-size: 1.5rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 0 15px 0;
  width: ${(props) => (props.story ? "90%" : "100%")};
  @media (max-width: 850px) {
    width: 100%;
  }
`;

const Buttons = styled.div`
  margin-top: 3%;
`;

const StyledButton = withStyles({
  root: {
    margin: "1% 0",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none",
  },
})(Button);

const Document = (props) => {
  const [clausesTotal, setClauses] = useState(1);
  const moreClauses = (num) => {
    setClauses(num);
  };
  const [result, setResult] = useState([]);
  const [draft, setDraft] = useState([]);
  const [results, setResults] = useState("");
  const [drafts, setDrafts] = useState("");
  const [reveal, setReveal] = useState(false);

  const getData = (data, name) => {
    data = {
      number: name,
      text: data,
    };
    let arr = result.filter((el) => el.number !== name);
    setResult([...arr, data]);
  };

  const getDraft = (data, name) => {
    data = {
      number: name,
      text: data,
    };
    let drafts = draft.filter((el) => el.number !== name);
    setDraft([...drafts, data]);
  };

  const save = async () => {
    let r = result.sort((a, b) => {
      return a.number - b.number;
    });
    let d = draft.sort((a, b) => {
      return a.number - b.number;
    });
    let results = [];
    r.map((r) => results.push(r.text));
    const resu = await setResults(results);
    let drafts = [];
    d.map((d) => drafts.push(d.text));
    const resul = await setDrafts(drafts);
  };
  const { me, user, title, clauses, lessonID, documentID, story } = props;
  return (
    <Styles>
      <Mutation
        mutation={CREATE_DOCUMENTRESULT_MUTATION}
        variables={{
          document: documentID,
          lesson: lessonID,
          drafts: drafts,
          answers: results,
        }}
      >
        {(createDocumentResult, { loading, error }) => (
          <>
            <Advice size={story}>
              Каждый пункт должен состоять <b>только из 1 абзаца. </b>
              Пункты проверяются в 2 этапа: сначала нажмите на кнопку
              "Проверить" и получите автоматческие рекомендации от сайта. Когда
              запишете все пункты и внесете в них исправления, нажмите кнопку
              Сохранить" и их проверит преподаватель.
            </Advice>
            <Header> {title} </Header>
            {clauses.slice(0, clausesTotal).map((clause, index) => (
              <>
                <Clause
                  id={clause.id}
                  key={clause.sample}
                  index={index + 1}
                  commentary={clause.commentary}
                  sample={clause.sample}
                  keywords={clause.keywords}
                  getNumber={moreClauses}
                  total={clauses.length}
                  getText={getData}
                  getDraft={getDraft}
                  story={story}
                  me={me}
                  userID={clause.user.id}
                />
              </>
            ))}
            <Buttons>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await save();
                  const res2 = await createDocumentResult();
                  setReveal(true);
                  alert(
                    "Документ сохранен. Можете перейти к следующему заданию."
                  );
                }}
              >
                Сохранить
              </StyledButton>
              {me && me.id === user ? (
                <DeleteDocument
                  id={me.id}
                  documentID={documentID}
                  lessonID={lessonID}
                />
              ) : null}
            </Buttons>
            {reveal && <div>{clauses.map((cl) => renderHTML(cl.sample))}</div>}
          </>
        )}
      </Mutation>
    </Styles>
  );
};

export default Document;
