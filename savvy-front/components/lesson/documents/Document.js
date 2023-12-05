import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import PropTypes from "prop-types";
import Clause from "./Clause";
import DeleteDocument from "../../delete/DeleteDocument";
// import Button from "@material-ui/core/Button";
// import { withStyles } from "@material-ui/core/styles";
import jsPDF from "jspdf";
import parse from "html-react-parser";

const CREATE_DOCUMENTRESULT_MUTATION = gql`
  mutation CREATE_DOCUMENTRESULT_MUTATION(
    $answers: [String]
    $drafts: [String]
    $lessonId: String
    $documentId: String
  ) {
    createDocumentResult(
      answers: $answers
      drafts: $drafts
      lessonId: $lessonId
      documentId: $documentId
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  margin: 80px 0;
  width: ${(props) => (props.story ? "640px" : "100%")};
  font-size: 1.6rem;
`;

const Header = styled.div`
  font-size: 2.8rem;
  font-weight: bold;
`;

const Advice = styled.div`
  font-size: 1.6rem;
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
  margin-top: 60px;
`;

const BlueButton = styled.button`
  width: 180px;
  background: #3b5bb3;
  font-size: 1.6rem;
  font-weight: 500;
  color: #fff;
  border: 1px solid #3b5bb3;
  font-family: Montserrat;
  outline: 0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
  transition: 0.3s ease-in;
  cursor: pointer;
  &:hover {
    border: 1px solid #283d78;
    background: #283d78;
  }
`;

const SimpleButton = styled.button`
  width: 230px;
  height: 40px;
  background: none;
  padding: 5px 0;
  border: 2px solid #69696a;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

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
  const sorted_clauses = clauses
    ? clauses.slice().sort((a, b) => a.number - b.number)
    : [];

  // function createPdf() {
  //   const doc = new jsPDF();

  //   let htmlContent = "";
  //   results.forEach((str) => {
  //     htmlContent += `<p>${str}</p>`;
  //   });

  //   doc.html(htmlContent, {
  //     callback: function (doc) {
  //       doc.save("BeSavvy_assignment.pdf");
  //     },
  //     x: 10,
  //     y: 10,
  //   });
  // }

  return (
    <Styles story={props.story}>
      <Mutation
        mutation={CREATE_DOCUMENTRESULT_MUTATION}
        variables={{
          documentId: documentID,
          lessonId: lessonID,
          drafts: drafts,
          answers: results,
        }}
      >
        {(createDocumentResult, { loading, error }) => (
          <>
            {!story && me && me.id === user ? (
              <DeleteDocument
                id={me.id}
                documentID={documentID}
                lessonID={lessonID}
              />
            ) : null}
            {/* <Advice size={story}>
              Каждый пункт должен состоять <b>только из 1 абзаца. </b>
              Пункты проверяются в 2 этапа: сначала нажмите на кнопку
              "Проверить" и получите автоматческие рекомендации от сайта. Когда
              запишете все пункты и внесете в них исправления, нажмите кнопку
              Сохранить" и их проверит преподаватель.
            </Advice> */}
            <Header> {title} </Header>
            {sorted_clauses.slice(0, clausesTotal).map((clause, index) => (
              <>
                <Clause
                  id={clause.id}
                  key={clause.sample}
                  number={clause.number}
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
              <BlueButton
                variant="contained"
                color="primary"
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await save();
                  const res2 = await createDocumentResult();
                  setReveal(true);
                  alert("We saved your work. You can move on.");
                }}
              >
                {loading ? "Saving..." : "Save document"}
              </BlueButton>
              {/* <StyledButton
                variant="contained"
                color="primary"
                onClick={async (e) => {
                  e.preventDefault();
                  createPdf();
                }}
              >
                Print
              </StyledButton> */}
            </Buttons>
            {reveal && <div>{clauses.map((cl) => parse(cl.sample))}</div>}
          </>
        )}
      </Mutation>
    </Styles>
  );
};

export default Document;
