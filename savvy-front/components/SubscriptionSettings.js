import { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useTranslation } from "next-i18next";

import { CURRENT_USER_QUERY } from "./User";

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

const Comment = styled.div`
  font-size: 1.4rem;
  color: #767676;
  margin-top: 1%;
  line-height: 1.2;
  width: 90%;
  margin-bottom: 2%;
  span {
    color: black;
  }
  a {
    color: #767676;
    border-bottom: 1px solid #767676;
    cursor: pointer;
  }
`;

const Container = styled.div`
  padding: 10px;
`;

const BlueButton = styled.button`
  background: #3b5bb3;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  border: 1px solid #3b5bb3;
  font-family: Montserrat;
  outline: 0;
  border-radius: 5px;
  padding: 10px;
  margin: 15px 0;
  transition: 0.3s ease-in;
  cursor: pointer;
  &:hover {
    border: 1px solid #283d78;
    background: #283d78;
  }
`;

const SimpleButton = styled.button`
  flex: 1;
  height: 40px;
  background: none;
  padding: 5px 0;
  border: 2px solid #69696a;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  margin-right: 20px;
  cursor: pointer;
  transition: 0.3s;
  padding: 10px;

  &:hover {
    background: #f4f4f4;
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: String!
    $name: String
    $surname: String
    $email: String
    $status: Status
    $image: String
    $work: String
    $description: String
    $isFamiliar: Boolean
    $tags: [String]
  ) {
    updateUser(
      id: $id
      email: $email
      name: $name
      surname: $surname
      status: $status
      image: $image
      description: $description
      work: $work
      isFamiliar: $isFamiliar
      tags: $tags
    ) {
      id
      name
    }
  }
`;
const Account = (props) => {
  const [subscriptionType, setSubscriptionType] = useState(
    props.me.subscriptionType ? props.me.subscriptionType : "None"
  );
  const [subscriptionLength, setSubscriptionLength] = useState(
    props.me.subscriptionType ? props.me.subscriptionType : "None"
  );

  const { t } = useTranslation("account");

  const [updateUser, { error, loading }] = useMutation(UPDATE_USER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleUpdateSubscription = async (e) => {
    e.preventDefault();
    // await updateUser({
    //   variables: {
    //     id: props.me.id,
    //     email,
    //     name,
    //     surname,
    //     status,
    //     image,
    //     work,
    //     description,
    //     tags: props.me.tags,
    //   },
    // });
  };

  const handleCancelSubscription = async () => {
    // await cancelSubscription({
    //   variables: {
    //     id: props.me.id,
    //   },
    // });
  };

  const { me } = props;

  return (
    <Form>
      <Fieldset disabled={loading} aria-busy={loading}>
        <div className="Title">{t("subscription_settings")}</div>
        <Container>
          <Comment>{t("choose_subscription_type")}</Comment>

          <select
            value={subscriptionType}
            onChange={(e) => setSubscriptionType(e.target.value)}
          >
            <option value={null}>{t("no_info")}</option>
            <option value="MINI">{t("mini")}</option>
            <option value="REGULAR">{t("regular")}</option>
            <option value="TEAM">{t("team")}</option>
          </select>
          <Comment>{t("choose_subscription_length")}</Comment>

          <select
            value={subscriptionLength}
            onChange={(e) => setSubscriptionLength(e.target.value)}
          >
            <option value={null}>{t("no_info")}</option>
            <option value="MANUAL">{t("monthly")}</option>
            <option value="ANNUAL">{t("annually")}</option>
          </select>
          <BlueButton onClick={handleUpdateSubscription}>
            {t("update_subscription")}
          </BlueButton>
          <br />
          <SimpleButton onClick={handleCancelSubscription}>
            {t("cancel_subscription")}
          </SimpleButton>
        </Container>
      </Fieldset>
    </Form>
  );
};

export default Account;
