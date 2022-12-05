import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import Modal from "styled-react-modal";
import Router from "next/router";

import { useUser } from "./User";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import RequestReset from "./auth/RequestReset";
const ADD_TO_TEAM = gql`
  mutation ADD_TO_TEAM($id: String!) {
    addToTeam(id: $id) {
      id
    }
  }
`;

const SINGLE_TEAM_QUERY = gql`
  query SINGLE_TEAM_QUERY($id: String!) {
    team(where: { id: $id }) {
      id
      name
      users {
        id
        name
        surname
        image
      }
    }
  }
`;

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 40%;
  min-width: 400px;
  padding: 2%;
  .top_message {
    padding-bottom: 2%;
    border-bottom: 1px solid grey;
    font-size: 2rem;
    width: 100%;
    text-align: center;
  }
  .bottom_message {
    margin-top: 2%;
  }
  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

const Styles = styled.div`
  display: flex;
  margin: 3% 0;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  border: 2px solid #3f51b5;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  width: 100%;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  transition: 0.3s;
  /* max-width: 180px; */
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
  @media (max-width: 800px) {
    margin-top: 5%;
  }
`;

const Form = styled.form`
  width: 40%;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    width: 90%;
    padding: 30px 0;
  }
`;

const Fieldset = styled.fieldset`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  @media (max-width: 800px) {
    padding: 15px 15px;
  }
`;

const Container = styled.div`
  margin: 15px 0;
  img {
    width: 45px;
    height: 45px;
    border-radius: 50px;
    margin-right: 10px;
  }
  .image_row {
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
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

const Invite = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState("signin");
  const { loading, error, data } = useQuery(SINGLE_TEAM_QUERY, {
    variables: { id: props.id },
  });

  const { t } = useTranslation("auth");
  const me = useUser();

  const [addToTeam, { data: data2, loading: loading2 }] =
    useMutation(ADD_TO_TEAM);
  const toggleModal = (e) => setIsOpen(!isOpen);
  const changeState = (dataFromChild) => setAuth(dataFromChild);

  if (loading) return <p>Loading...</p>;
  const team = data.team;

  return (
    <Styles>
      <Form>
        <Fieldset>
          <Title>
            {t("u_are_invited")} "{team.name}"
          </Title>
          <Message>
            {t("invitation_intro")} "{team.name}". {t("invitation_explainer")}
          </Message>
          <Message>{t("study_together")}:</Message>
          <Container>
            {team.users.map((u) => (
              <div className="image_row">
                {u.image && <img src={u.image} />}
                <div>
                  {u.name} {u.surname}
                </div>
              </div>
            ))}
          </Container>
          <Buttons>
            {/* <div name="signin">{t("back")}</div>*/}
            <SubmitButton
              onClick={async (e) => {
                e.preventDefault();
                if (!me) {
                  toggleModal();
                } else {
                  const res = await addToTeam({
                    variables: {
                      id: props.id,
                    },
                  });
                  setTimeout(
                    () =>
                      Router.push({
                        pathname: "/account",
                        query: {
                          id: me.id,
                        },
                      }),
                    1000
                  );
                }
              }}
            >
              {!me ? t("login_to_join") : t("join")}
            </SubmitButton>
          </Buttons>
        </Fieldset>
      </Form>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        {auth === "signin" && (
          <Signin getData={changeState} closeNavBar={toggleModal} />
        )}
        {auth === "signup" && (
          <Signup getData={changeState} closeNavBar={toggleModal} />
        )}
        {auth === "reset" && <RequestReset getData={changeState} />}
      </StyledModal>
    </Styles>
  );
};

export default Invite;
