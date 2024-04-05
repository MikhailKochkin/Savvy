import { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useMutation, gql } from "@apollo/client";
import CompanyEmailValidator from "company-email-validator";

const CREATE_CLIENT = gql`
  mutation CREATE_CLIENT($name: String!, $email: String!, $comment: String!) {
    createBusinessClient(name: $name, email: $email, comment: $comment) {
      id
    }
  }
`;

const Styles = styled.div`
  background: #8e2de2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #4a00e0,
    #8e2de2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #4a00e0,
    #8e2de2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  min-height: 80vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 5px;
  width: 540px;
  margin: 100px 50px;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Form = styled.div`
  width: 90%;
  height: 85%;
  h1 {
    font-size: 2.6rem;
    line-height: 1.2;
    color: #120944;
    margin-bottom: 15px;
    width: 90%;
    margin-top: 30px;
  }
  .label {
    font-weight: 600;
    font-size: 1.4rem;
    color: #120944;
  }
  input {
    width: 100%;
    border: 2px solid #dddddd;
    border-radius: 5px;
    height: 40px;
    padding: 5px;
    color: #120944;
    font-family: Montserrat;
    font-weight: 500;
    margin-bottom: 15px;
    font-size: 1.3rem;
    outline: 0;
  }
  .editor {
    font-size: 1.6rem;
    width: 100%;
    border: 2px solid #dddddd;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    outline: 0;
    padding: 0.5%;
    margin-bottom: 10px;
    color: #120944;
    p {
      font-size: 1.3rem;
      color: #120944;
    }
    @media (max-width: 800px) {
    }
  }
  #submit {
    background-color: #030161;
    color: #fff;
    border: 1px solid #030161;
    height: 50px;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 15px;
    font-family: Montserrat;
    font-weight: 500;
    font-size: 1.6rem;
    cursor: pointer;
    transition: 0.2s ease-in;
    &:hover {
      background-color: #4b00e0;
      border: 1px solid #4b00e0;
    }
  }
  .thankyou {
    margin-bottom: 25px;
    line-height: 1.4;
    text-align: center;
    border: 2px solid #7000ff;
    padding: 10px;
    border-radius: 5px;
  }
  .comment {
    color: #b0b0b0;
    font-size: 1.2rem;
    margin-bottom: 7px;
    line-height: 1.4;
  }
  .comment_main {
    color: #6d6d6d;
    font-size: 1.5rem;
    margin-bottom: 15px;
    line-height: 1.4;
    span {
      color: #130944;
    }
  }
`;

const Limit = styled.div`
  width: 100%;
  text-align: right;
  padding-right: 5px;
  font-size: 1.2rem;
  color: ${(props) => (props.isEnough ? "green" : "#b0b0b0")};
`;

const DynamicLoadedEditor = dynamic(import("./editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const BuildYourSimulator = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [task, setTask] = useState();
  const [mistakes, setMistakes] = useState();
  const [result, setResult] = useState();
  const [comment, setComment] = useState();
  const [isSent, setIsSent] = useState(false);
  const [isKeyInfoMissing, setIsKeyInfoMissing] = useState(false);
  const [isEmailPersonal, setIsEmailPersonal] = useState(false);

  const [createBusinessClient, { create }] = useMutation(CREATE_CLIENT);

  const removePTags = (inputString) => {
    // Define regular expression to match <p> and </p> tags
    const regex = /<\/?p[^>]*>/g;
    let result;
    // Remove <p> and </p> tags from the input string
    if (inputString) {
      result = inputString.replace(regex, "").replace(/\s+/g, "");
      // The /\s+/g regular expression matches one or more whitespace characters globally and replaces them with an empty string.
    } else {
      result = "";
    }

    return result;
  };

  const handleTaskData = (dataFromChild) => {
    if (isKeyInfoMissing) {
      setIsKeyInfoMissing(false);
    }
    setTask(dataFromChild);
  };

  const handleMistakesData = (dataFromChild) => {
    if (isKeyInfoMissing) {
      setIsKeyInfoMissing(false);
    }
    setMistakes(dataFromChild);
  };

  const handleResultData = (dataFromChild) => {
    if (isKeyInfoMissing) {
      setIsKeyInfoMissing(false);
    }
    setResult(dataFromChild);
  };

  const handleCommentData = (dataFromChild) => {
    if (isKeyInfoMissing) {
      setIsKeyInfoMissing(false);
    }
    setComment(dataFromChild);
  };

  return (
    <Styles>
      <Container>
        <Form>
          <h1>Delegate explanation and review of routine tasks</h1>
          <div className="comment_main">
            Describe the instructions you give to your junior lawyers again and
            again (🤯). <span>And let the bot do this work for you.</span>
          </div>
          <div className="label" for="name">
            Your Full Name
          </div>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />

          <div className="label" for="email">
            Your Business Email
          </div>
          <div className="comment">
            We will send the simulator to this address within the next 24 hours
          </div>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => {
              setIsEmailPersonal(false);
              if (isKeyInfoMissing) {
                setIsKeyInfoMissing(false);
              }
              setEmail(e.target.value);
            }}
            required
          />
          <div className="label" for="task">
            Task to be Simulated
          </div>
          <div className="comment">
            e.g. I want to explain how to draft an email to a client. To do that
            I first ...{" "}
          </div>
          <div className="editor">
            <DynamicLoadedEditor
              getEditorText={handleTaskData}
              value={""}
              name="task"
              placeholder="Write at least 300 characters .."
            />
            <Limit className="limit" isEnough={removePTags(task).length >= 300}>
              {task?.length ? removePTags(task).length : 0}
            </Limit>
          </div>

          <div className="label" for="mistakes">
            Typical Mistakes
          </div>
          <div className="comment">
            e.g. Usually everyone is bad at structuring emails. For example they
            ...
          </div>
          <div className="editor">
            <DynamicLoadedEditor
              getEditorText={handleMistakesData}
              value={""}
              name="mistakes"
              placeholder="Write at least 300 characters .."
            />
            <Limit
              className="limit"
              isEnough={removePTags(mistakes).length >= 300}
            >
              {mistakes?.length ? removePTags(mistakes).length : 0}
            </Limit>
          </div>

          <div className="label" for="result">
            Expected Result
          </div>
          <div className="comment">
            e.g. An ideal email looks like this: ...
          </div>
          <div className="editor">
            <DynamicLoadedEditor
              getEditorText={handleResultData}
              value={""}
              name="result"
              placeholder="Write at least 300 characters .."
            />
            <Limit
              className="limit"
              isEnough={removePTags(result).length >= 300}
            >
              {result?.length ? removePTags(result).length : 0}
            </Limit>
          </div>

          <div className="label" for="comment">
            Comment
          </div>
          <div className="comment">
            e.g. I also need the bot to check my juniors' emails for jargon
          </div>
          <div className="editor">
            <DynamicLoadedEditor
              getEditorText={handleCommentData}
              value={""}
              name="comment"
              placeholder=""
            />
            {/* <Limit
              className="limit"
              isEnough={removePTags(comment).length >= 300}
            >
              {comment?.length ? removePTags(comment).length : 0}
            </Limit> */}
          </div>
          {isEmailPersonal && (
            <div className="thankyou">😕 This is not a business email.</div>
          )}
          {isKeyInfoMissing && (
            <div className="thankyou">
              🧐 Some key info is missing. Please write a bit more. We need your
              knowledge and experience to build a great simulator.
            </div>
          )}

          {!isSent && (
            <button
              id="submit"
              value="Submit"
              onClick={async (e) => {
                e.preventDefault();
                if (!CompanyEmailValidator.isCompanyEmail(email)) {
                  setIsEmailPersonal(true);
                } else if (
                  removePTags(task).length < 300 ||
                  removePTags(mistakes).length < 300 ||
                  removePTags(result).length < 300
                ) {
                  setIsKeyInfoMissing(true);
                } else {
                  setIsSent(true);
                  const allData = `<h2>Task</h2>${task}<h2>Typical Mistakes:</h2>${mistakes}<h2>Expected Result:</h2>${result}<h2>Comment:</h2>${comment}`;
                  const res = await createBusinessClient({
                    variables: {
                      name: name,
                      email: email,
                      comment: allData,
                      coursePageId: "clmusi4wx0000xsg122vc7a9c",
                    },
                  });
                }
              }}
            >
              🛠️ Start building the bot
            </button>
          )}
          {isSent && (
            <div className="thankyou">
              😊 Thank you! We will send the link with the simulator to your
              email within 24 hours.
            </div>
          )}
        </Form>
      </Container>
    </Styles>
  );
};

export default BuildYourSimulator;
