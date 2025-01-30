import { useState } from "react";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "next-i18next";
// import Papa from "papaparse"; // Import Papa here

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $surname: String!
    $password: String!
    $image: String
    $number: String
  ) {
    botSignup(
      email: $email
      name: $name
      surname: $surname
      password: $password
      image: $image
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
  const [image, setImage] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [file, setFile] = useState(null);

  const [users, setUsers] = useState([]);
  const [newUsersNumber, setNewUsersNumber] = useState(0);

  const { t } = useTranslation("auth");

  const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION);

  const handleSubmit = async (e) => {
    const res = await signup();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleFileUpload = () => {
    if (!file) return;

    const fileType = file.type;
    if (fileType.includes("csv")) {
      Papa.parse(file, {
        complete: (result) => {
          setUsers(result.data.slice(1)); // Skip header row
        },
        header: false,
      });
    }
  };

  const handleSubmitUsers = async () => {
    // Assuming you have a function to handle the GraphQL mutation
    for (const user of users) {
      const [surname, name, email] = user;
      // Call your mutation here
      await signup({
        variables: {
          email,
          name,
          surname,
          password: uuidv4(),
          number: "",
        },
      });
    }
  };

  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
        <button onClick={handleSubmitUsers}>Submit Users</button>
      </div>
      <div>Загруженные пользователи: {users.length}</div>
      <div>
        <button onClick={(e) => setNewUsersNumber(newUsersNumber - 1)}>
          -1
        </button>
        <button onClick={(e) => setNewUsersNumber(newUsersNumber + 1)}>
          +1
        </button>
      </div>
      {Array.from({ length: newUsersNumber }, (_, index) => (
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
            <input
              className="image"
              type="text"
              name="image"
              placeholder={t("image")}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              label="Image"
            />
          </div>
          {/* <div>{isCreated && "✅"}</div> */}
          <button
            type="submit"
            variant="contained"
            color="primary"
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? t("creating") : t("create")}
          </button>
        </div>
      ))}
    </div>
  );
};

export default NewUserCreate;
