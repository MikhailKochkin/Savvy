import { useState } from "react";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "next-i18next";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $surname: String!
    $password: String!
    $number: String
  ) {
    botSignup(
      email: $email
      name: $name
      surname: $surname
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

const NewUserCreate = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [email, setEmail] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [password, setPassword] = useState("");
  const { t } = useTranslation("auth");

  const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: name,
      surname: surname,
      email: email,
      password: uuidv4(),
      number: "0000000000000",
      // Other variables remain unchanged
    },
  });

  const handleSubmit = async (e) => {
    const res = await signup();
    setIsCreated(true);
  };

  return (
    <div>
      <div onSubmit={handleSubmit}>
        <div>
          <input
            className="name"
            type="text"
            name="name"
            placeholder={t("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="name"
            type="text"
            name="name"
            placeholder={t("surname")}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
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
        </div>
        <div>{isCreated && "✅"}</div>
        <button
          type="submit"
          variant="contained"
          color="primary"
          onClick={(e) => handleSubmit(e)}
        >
          {loading ? t("creating") : t("create")}
        </button>
      </div>
    </div>
  );
};

export default NewUserCreate;
