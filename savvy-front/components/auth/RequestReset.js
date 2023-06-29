import { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import Error from "../ErrorMessage";
import { useTranslation } from "next-i18next";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const SubmitButton = styled.button`
  flex: 50%;
  background-color: #84bc9c;
  border: 1px solid white;
  border-radius: 6px;
  color: white;
  padding: 2%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  outline: 0;
  &:active {
    border: 1px solid black;
  }
  @media (max-width: 800px) {
    margin-top: 5%;
  }
`;

const Form = styled.form`
  width: 100%;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Fieldset = styled.fieldset`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
`;

const Container = styled.div`
  input {
    width: 100%;
    border: 1px solid #ccc;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.4rem;
    margin-top: 10px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  margin-top: 2%;
  padding: 3%;
  border-top: solid 1px #f0f0f0;
  @media (max-width: 800px) {
    margin-top: 10%;
  }
  div {
    flex: 50%;
    color: #112a62;
    font-size: 1.4rem;
    padding-top: 1.5%;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 10px;
`;

const Message = styled.div`
  font-size: 1.4rem;
  margin-top: 10px;
`;

const Comment = styled.div`
  background: #fdf3c8;
  border-radius: 5px;
  padding: 1% 2%;
  font-size: 1.4rem;
`;

const RequestReset = (props) => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation("auth");
  const change = (e) => props.getData(e.target.getAttribute("name"));

  return (
    <Mutation
      mutation={REQUEST_RESET_MUTATION}
      variables={{
        email: email,
      }}
    >
      {(reset, { error, loading, called }) => (
        <Form
          method="post"
          data-test="form"
          onSubmit={async (e) => {
            e.preventDefault();
            await reset();
            setEmail("");
          }}
        >
          <Fieldset disabled={loading} aria-busy={loading}>
            <Title>{t("c2a3")}</Title>
            <Message>{t("explainer")}</Message>
            <Container>
              <Error error={error} />
              {!error && !loading && called && <Comment>{t("found")}</Comment>}
              <input
                type="email"
                name="email"
                placeholder={t("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Container>
            <Buttons>
              <div name="signin" onClick={change}>
                {t("back")}
              </div>
              <SubmitButton type="submit">{t("button2")}</SubmitButton>
            </Buttons>
          </Fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default RequestReset;
export { REQUEST_RESET_MUTATION };
