import { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import dynamic from "next/dynamic";
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
  span {
    color: black;
  }
  a {
    color: #767676;
    border-bottom: 1px solid #767676;
    cursor: pointer;
  }
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
  &:hover {
    background-color: ${(props) => props.theme.darkGreen};
  }
  @media (max-width: 800px) {
    width: 50%;
  }
`;

const Img = styled.img`
  height: 200px;
  object-fit: cover;
  margin: 3% 0;
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

const DynamicLoadedEditor = dynamic(import("./editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const Account = (props) => {
  const [status, setStatus] = useState(props.me.status);
  const [name, setName] = useState(props.me.name);
  const [surname, setSurname] = useState(props.me.surname);
  const [email, setEmail] = useState(props.me.email);
  const [image, setImage] = useState(props.me.image ? props.me.image : "");
  const [upload, setUpload] = useState(false);
  const [description, setDescription] = useState(props.me.description);
  const [work, setWork] = useState(props.me.work);
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

  const handleWorkChange = (data) => {
    setWork(data);
  };

  const handleDescriptionChange = (data) => {
    setDescription(data);
  };

  const uploadFile = async (e) => {
    setUpload(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "savvy-app");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/mkpictureonlinebase/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setUpload(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser({
      variables: {
        id: props.me.id,
        email,
        name,
        surname,
        status,
        image,
        work,
        description,
        tags: props.me.tags,
      },
    });
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
        <div className="Title">{t("settings")}</div>
        <Container>
          <input
            className="second"
            type="text"
            placeholder={t("name")}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            className="second"
            type="text"
            placeholder={t("surname")}
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            className="second"
            type="text"
            placeholder={t("email")}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select
            defaultValue={me.status}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="NAN">{t("not_chosen")}</option>
            <option value="STUDENT">{t("student")}</option>
            <option value="AUTHOR">{t("author")}</option>
            <option value="HR">HR</option>
          </select>
          <Comment>{t("choose_status")}</Comment>
          {status === "AUTHOR" && (
            <>
              <Frame>
                <DynamicLoadedEditor
                  index={0}
                  name="description"
                  getEditorText={handleWorkChange}
                  value={work}
                  placeholder="Your place of work and position"
                />
              </Frame>
              <Comment>{t("your_work")}</Comment>
              <Frame>
                <DynamicLoadedEditor
                  index={0}
                  name="description"
                  getEditorText={handleDescriptionChange}
                  value={description}
                  placeholder="Tell us about your experience"
                />
              </Frame>
              <Comment>{t("your_experience")}</Comment>
            </>
          )}
          <input
            className="second"
            type="file"
            id="file"
            name="file"
            placeholder={t("upload_image")}
            onChange={uploadFile}
          />
          {upload && t("uploading")}
          <Img src={image} alt="Upload Preview" />
        </Container>
        <Buttons>
          <Button onClick={handleSubmit}>
            {loading ? t("updating..") : t("update")}
          </Button>
        </Buttons>
      </Fieldset>
    </Form>
  );
};

export default Account;
