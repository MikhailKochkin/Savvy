import { useState } from "react";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import renderHTML from "react-render-html";

import Loading from "../Loading";
import { CURRENT_USER_QUERY } from "../User";
import Error from "../ErrorMessage";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $number: String
  ) {
    botSignup(
      email: $email
      name: $name
      password: $password
      number: $number
    ) {
      token
      user {
        id
      }
    }
  }
`;

const CREATE_REMINDER_MUTATION = gql`
  mutation CREATE_REMINDER_MUTATION(
    $userId: String!
    $coursePageId: String!
    $link: String
    $emailCampaignId: String
  ) {
    createEmailReminder(
      userId: $userId
      coursePageId: $coursePageId
      link: $link
      emailCampaignId: $emailCampaignId
    ) {
      id
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION(
    $email: String!
    $password: String!
    $traffic_sources: Visits
  ) {
    signin(
      email: $email
      password: $password
      traffic_sources: $traffic_sources
    ) {
      user {
        id
        email
        name
      }
      token
    }
  }
`;

const Form = styled.form`
  min-width: 450px;
  font-size: 1.6rem;
  overflow-y: scroll;

  @media (max-width: 800px) {
    min-width: 100px;
    max-width: 100%;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;

  input {
    width: 100%;
    background: none;
    font-size: 1.6rem;
    border: 1px solid #d6d6d6;
    font-family: Montserrat;
    outline: 0;
    padding: 10px;
    margin-bottom: 10px;
    &:hover {
      border: 1px solid #999999;
    }
    &:focus {
      border: 1px solid #1a2a81;
    }
  }
`;

const TextBar = styled.div`
  width: 500px;
  font-size: 1.6rem;
  padding-bottom: 2%;
  ul {
    padding-left: 0px;
  }
  .video {
    /* border: 1px solid #000000;
    background: #000000;
    border-radius: 10px;
    overflow: hidden;
    z-index: 1; */
    height: 489px;
    width: 275px;
    iframe {
      width: 100%;
      border: none;
      height: 100%;
      border-radius: 15px;
    }
  }
  .question_box {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .question_container {
    /* border: 1px solid blue; */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-width: 40%;
    max-width: 70%;
  }
  .question_name {
    margin-left: 5px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2%;
    height: 55px;
    width: 55px;
    object-fit: cover;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    @media (max-width: 800px) {
      margin-left: 0;
    }
  }
  .question_text {
    background: #f3f3f3;
    color: black;
    border-radius: 25px;
    padding: 5%;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    p {
      margin: 0px 10px;
      margin-top: 10px;
    }
    ul {
      list-style: filled circle;
      margin-left: 20px;
    }

    li {
      margin-left: 10px;
      margin-bottom: 5px;
    }
    img {
      width: 100%;
    }
  }
  .answer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .answer_name {
    margin-right: 10px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2%;
    height: 55px;
    width: 55px;
    object-fit: cover;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .answer_test {
    width: 50%;
    border: 2px solid;
    border-color: #f3f3f3;
    border-radius: 25px;
    padding: 2% 5%;
    margin-bottom: 20px;
  }
  @media (max-width: 800px) {
    width: 100%;
    padding-left: 0px;
    font-size: 1.6rem;
    .video {
      height: 356px;
      width: 200px;
    }
  }
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 65px;
  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    object-fit: cover;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .icon2 {
    margin: 5px;
    border-radius: 50%;
    background: #cb2d3e; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      #ef473a,
      #cb2d3e
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      #ef473a,
      #cb2d3e
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    height: 55px;
    width: 55px;
    object-fit: cover;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: 1.2rem;
    text-align: center;
    color: #8f93a3;
    max-width: 80px;
    margin: 0 7px;
  }
`;

const useStyles = makeStyles({
  button: {
    width: "80%",
    marginBottom: "15px",
    fontSize: "1.7rem",
    fontFamily: "Montserrat",
    textTransform: "none",
  },
  root: {
    marginBottom: "4%",
    width: "100%",
  },
  labelRoot: {
    fontSize: "1.5rem",
  },
  formControl: {
    fontSize: "1.5rem",
  },
});

const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [text, setText] = useState(props.text);
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("auth");
  const classes = useStyles();

  function validatePhoneNumber(phoneNumber) {
    // Define the pattern for the phone number
    // This pattern assumes the country code is +7, followed by a 10-digit phone number
    const phonePattern = /^\+7\d{10}$/;

    // Test the phone number against the pattern
    const isValid = phonePattern.test(phoneNumber);

    // Return the result
    return isValid;
  }

  const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: name,
      email: email,
      password: uuidv4(),
      number: number,
      // Other variables remain unchanged
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const [createEmailReminder, { error: error4, loading: loading4 }] =
    useMutation(CREATE_REMINDER_MUTATION);
  const [signin, { error: error3, loading: loading3 }] = useMutation(
    SIGNIN_MUTATION,
    {
      variables: {
        email: email,
        password: password,
        trafficSources: [],
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  // Other state variables and functions remain unchanged

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.loadUser(true);
    setIsLoading(true);
    const res = await signup();
    if (res.data.botSignup.token && res.data.botSignup.token == "exists") {
      setShow(true);
      setIsLoading(false);
    } else {
      props.loadUser(false, res);
      setShow(true);
      setIsLoading(false);
      if (res && res.data && props.coursePageId && props.campaignId) {
        createEmailReminder({
          variables: {
            userId: res.data.botSignup.user.id,
            coursePageId: props.coursePageId,
            link: "https://besavvy.app",
            emailCampaignId: props.campaignId,
          },
        });
      }
    }
  };

  const signInUser = async (e) => {
    e.preventDefault();
    props.loadUser(true);
    const res2 = await signin();
    if (res2 && res2.data && props.coursePageId && props.campaignId) {
      createEmailReminder({
        variables: {
          userId: res2.data.signin.user.id,
          coursePageId: props.coursePageId,
          link: "https://besavvy.app",
          emailCampaignId: props.campaignId,
        },
      });
    }
    props.loadUser(false, res2);
  };

  return (
    <>
      <TextBar className="Test">
        <div className="question_box">
          <div className="question_text">{renderHTML(text)}</div>
          <IconBlock>
            <img className="icon" src="../../static/misha_new.webp" />
            <div className="name">{t("mike")}</div>
          </IconBlock>
        </div>
      </TextBar>
      {show ? (
        <TextBar className="Test">
          <div className="question_box">
            <div className="question_text">{t("already_signed_up")}</div>
            <IconBlock>
              <img className="icon" src="../../static/misha_new.webp" />
              <div className="name">{t("mike")}</div>
            </IconBlock>
          </div>
        </TextBar>
      ) : (
        ""
      )}
      <Form onSubmit={handleSubmit}>
        <Error error={error} />
        {!loading && (
          <Group>
            <input
              className="name"
              type="text"
              name="name"
              placeholder={t("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="email"
              type="email"
              name="email"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Электронная почта"
            />
            <input
              className="number"
              type="text"
              name="number"
              placeholder={t("number")}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              label="Номер"
            />
            {show && (
              <input
                className="password"
                type="password"
                name="password"
                placeholder={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Пароль"
              />
            )}
          </Group>
        )}
        {isLoading && <Loading />}
        {show ? (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={(e) => signInUser(e)}
          >
            {loading3 ? t("opening") : t("open_simulator")}
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? t("opening") : t("open_simulator")}
          </Button>
        )}
      </Form>
    </>
  );
};

export default Signup;
