import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";

import { CURRENT_USER_QUERY } from "./User";

const CREATE_TEAM_MUTATION = gql`
  mutation CREATE_TEAM_MUTATION($name: String!) {
    createTeam(name: $name) {
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

const Form = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 50%;
  margin: 0 auto;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    width: 90%;
    margin-bottom: 5%;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex: 85%;
  padding: 0;
  flex-direction: column;
  border: 1px solid #edefed;
  border-radius: 5px;
  .h2 {
    margin-left: 2%;
    font-size: 1.6rem;
    font-weight: 600;
    margin: 10px;
  }
  .block {
    margin-left: 2%;
    margin-bottom: 40px;
    .link {
      margin-top: 20px;
      font-size: 1.4rem;
      color: #767676;
      button {
        margin-left: 10px;
      }
    }
    img {
      width: 45px;
      height: 45px;
      border-radius: 50px;
      margin-right: 10px;
    }
    .row {
      border-bottom: 1px solid #ecefed;
      padding-bottom: 15px;
      margin-bottom: 15px;
    }
    .image_row {
      margin-top: 10px;
      margin-left: 10px;

      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  input {
    height: 40px;
    width: 90%;
    border: 1px solid #c4c4c4;
    font-family: Montserrat;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 1%;
    margin-left: 2%;
    margin-bottom: 2%;
    font-size: 1.4rem;
    outline: 0;
  }
  select {
    width: 90%;
    font-size: 1.4rem;
    outline: none;
    line-height: 1.3;
    font-family: Montserrat;
    padding: 0.6em 1.4em 0.5em 0.8em;
    max-width: 100%;
    box-sizing: border-box;
    margin-left: 2%;
    margin-bottom: 0.5%;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
  .checked {
    height: 20%;
    width: 30%;
    border: none;
    box-shadow: none;
  }
  .Title {
    background: #edefed;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding-left: 2%;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-bottom: 2%;
  }
`;

const Frame = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 90%;
  margin-bottom: 3%;
  margin-left: 2%;

  padding: 0 1%;
  .com {
    border-top: 1px solid #c4c4c4;
  }
`;

const Comment = styled.div`
  font-size: 1.4rem;
  color: #767676;
  margin-left: 3%;
  margin-top: 1%;
  line-height: 1.2;
  width: 90%;
  margin-bottom: 2%;
`;

const Container = styled.div``;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
`;

const Button = styled.button`
  padding: 1% 2%;
  background: ${(props) => props.theme.green};
  width: 30%;
  border-radius: 5px;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 2%;
  cursor: pointer;
  outline: 0;
  transition: 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.darkGreen};
  }
  @media (max-width: 800px) {
    width: 50%;
  }
`;

const Teams = (props) => {
  const [name, setName] = useState("");
  const [teams, setTeams] = useState(props.me.myTeams);
  const { t } = useTranslation("account");
  const [createTeam, { data, loading }] = useMutation(CREATE_TEAM_MUTATION, {
    refetchQueries: [
      { query: CURRENT_USER_QUERY }, // DocumentNode object parsed with gql
    ],
  });
  console.log("teams", teams);
  return (
    <Form>
      <Fieldset>
        <>
          <div className="Title">{t("team_settings")}</div>
          <Container>
            <div className="h2">{t("my_teams")}</div>
            <div className="block">
              {teams.map((t, i) => (
                <div className="row">
                  {i + 1}. {t.name}
                  <div>
                    {t.users.map((u) => (
                      <div className="image_row">
                        {u.image && <img src={u.image} />}
                        <div>
                          {u.name} {u.surname}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="link">
                    Use this link to invite friends to your team:{" "}
                    {`https://besavvy.app/teamInvite?id=${t.id}`}
                    <button
                      onClick={(e) =>
                        navigator.clipboard.writeText(
                          `https://besavvy.app/teamInvite?id=${t.id}`
                        )
                      }
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="h2">{t("create_new_team")}</div>
            <input
              className="second"
              type="text"
              placeholder={t("name")}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Container>
          <Buttons>
            <Button
              onClick={async (e) => {
                e.preventDefault();
                const res = await createTeam({
                  variables: {
                    name,
                  },
                });

                setTeams([...teams, res.data.createTeam]);
              }}
            >
              {loading ? t("saving") : t("save")}
            </Button>
          </Buttons>
        </>
      </Fieldset>
    </Form>
  );
};

export default Teams;
