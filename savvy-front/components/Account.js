import { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { Unis, Companies } from "../config";

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: String!
    $name: String
    $surname: String
    $email: String
    $status: Status
    $image: String
    $isFamiliar: Boolean
  ) {
    updateUser(
      id: $id
      email: $email
      name: $name
      surname: $surname
      status: $status
      image: $image
      isFamiliar: $isFamiliar
    ) {
      id
      name
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

const Green = styled.div`
  background: #4dac44;
  padding: 2%;
  border-radius: 10px;
  width: 45%;
  color: white;
  text-align: center;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Account = (props) => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(props.me.status);
  const [name, setName] = useState(props.me.name);
  const [surname, setSurname] = useState(props.me.surname);
  const [email, setEmail] = useState(props.me.email);
  const [image, setImage] = useState(props.me.image ? props.me.image : "");
  const [upload, setUpload] = useState(false);
  // careerTrackID
  // uniID
  // company

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

  const { me } = props;
  return (
    <>
      <Mutation
        mutation={UPDATE_USER_MUTATION}
        variables={{
          id: props.me.id,
          email,
          name,
          surname,
          status,
          image,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(updateUser, { error, loading }) => (
          <Form>
            <Fieldset disabled={loading} aria-busy={loading}>
              <>
                <div className="Title">Настройки аккаунта</div>
                <Green show={show}>Измнения внесены</Green>
                <Container>
                  <input
                    className="second"
                    type="text"
                    placeholder="Имя"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />
                  <input
                    className="second"
                    type="text"
                    placeholder="Фамилия"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                  <br />
                  <input
                    className="second"
                    type="text"
                    placeholder="Ваша электронная почта"
                    required
                    value={me.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  <>
                    <select
                      defaultValue={me.status}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="NAN">Не выбран</option>
                      <option value="STUDENT">Студент</option>
                      <option value="AUTHOR">Преподаватель</option>
                      <option value="HR">HR</option>
                    </select>
                    <Comment>
                      Выберите статус, чтобы проходить курсы в качестве
                      студента, создавать курсы в качестве преподавателя или
                      искать сотрудников в качестве HR.
                    </Comment>
                  </>
                  <input
                    // style={{ display: "none" }}
                    className="second"
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Загрузите свою фотографию..."
                    onChange={uploadFile}
                  />
                  {upload && "Загружаем.."}
                  <Img src={image} alt="Upload Preview" />
                </Container>
                <Buttons>
                  <Button
                    onClick={async (e) => {
                      e.preventDefault();
                      const res = await updateUser();
                      // this.setState({ show: true });
                    }}
                  >
                    {loading ? "Изменяем.." : "Изменить"}
                  </Button>
                </Buttons>
              </>
            </Fieldset>
          </Form>
        )}
      </Mutation>
    </>
  );
};

export default Account;

{
  /* // import { useState } from "react";
// import styled from "styled-components";
// import { Mutation } from "@apollo/client/react/components";
// import gql from "graphql-tag";
// import { CURRENT_USER_QUERY } from "./User";
// import { Unis, Companies } from "../config";

// const UPDATE_USER_MUTATION = gql`
//   mutation UPDATE_USER_MUTATION(
//     $id: String!
//     $name: String
//     $surname: String
//     $email: String
//     # $careerTrackID: ID
//     # $uniID: ID
//     $status: Status
//     $isFamiliar: Boolean # $resume: String # $coverLetter: String # $company: ID
//   ) {
//     updateUser(
//       id: $id
//       email: $email
//       name: $name
//       surname: $surname
//       # careerTrackID: $careerTrackID # uniID: $uniID
//       status: $status
//       isFamiliar: $isFamiliar # resume: $resume # coverLetter: $coverLetter # company: $company
//     ) {
//       id
//     }
//   }
// `; */
}

{
  /* // const Form = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 80%;
//   margin: 50%;
//   margin: 0 auto;
//   font-size: 1.6rem;
//   @media (max-width: 800px) {
//     width: 90%;
//     margin-bottom: 5%;
//   }
// `;

// const Fieldset = styled.fieldset`
//   display: flex;
//   flex: 85%;
//   padding: 0;
//   flex-direction: column;
//   border: 1px solid #edefed;
//   border-radius: 5px;
//   input {
//     height: 50%;
//     width: 90%;
//     border: 1px solid #c4c4c4;
//     box-sizing: border-box;
//     border-radius: 5px;
//     padding: 1%;
//     margin-left: 2%;
//     margin-bottom: 2%;
//     font-size: 1.4rem;
//     outline: 0;
//   }
//   select {
//     width: 90%;
//     font-size: 1.4rem;
//     outline: none;
//     line-height: 1.3;
//     padding: 0.6em 1.4em 0.5em 0.8em;
//     max-width: 100%;
//     box-sizing: border-box;
//     margin-left: 2%;
//     margin-bottom: 0.5%;
//     border: 1px solid #c5c5c5;
//     border-radius: 4px;
//     background: none;
//     -moz-appearance: none;
//     -webkit-appearance: none;
//     appearance: none;
//     background-color: #fff;
//     background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
//       linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
//     background-repeat: no-repeat, repeat;
//     background-position: right 0.7em top 50%, 0 0;
//     background-size: 0.65em auto, 100%;
//   }
//   .checked {
//     height: 20%;
//     width: 30%;
//     border: none;
//     box-shadow: none;
//   }
//   .Title {
//     background: #edefed;
//     border-top-left-radius: 3px;
//     border-top-right-radius: 3px;
//     padding-left: 2%;
//     padding-top: 1%;
//     padding-bottom: 1%;
//     margin-bottom: 2%;
//   }
// `;

// const Comment = styled.div`
//   font-size: 1.4rem;
//   color: #767676;
//   margin-left: 3%;
//   margin-top: 1%;
//   line-height: 1.2;
//   width: 90%;
//   margin-bottom: 2%;
// `;

// const Container = styled.div``;

// const Buttons = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: left;
// `;

// const Button = styled.button`
//   padding: 1% 2%;
//   background: ${(props) => props.theme.green};
//   width: 20%;
//   border-radius: 5px;
//   color: white;
//   font-weight: bold;
//   font-size: 1.6rem;
//   margin: 2%;
//   cursor: pointer;
//   outline: 0;
//   &:active {
//     background-color: ${(props) => props.theme.darkGreen};
//   }
//   @media (max-width: 800px) {
//     width: 50%;
//   }
// `;

// const Green = styled.div`
//   background: #4dac44;
//   padding: 2%;
//   border-radius: 10px;
//   width: 45%;
//   color: white;
//   text-align: center;
//   display: ${(props) => (props.show ? "block" : "none")};
// `;

// const Account = (props) => {
//   const [show, setShow] = useState(false);
//   const [status, setStatus] = useState(this.props.me.status);
//   // careerTrackID
//   // uniID
//   // company
//   const [show, setShow] = useState(false);

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };
//   updateUser = async (e, updateUser) => {
//     e.preventDefault();
//     const res = await updateUser({
//       variables: {
//         id: this.props.id,
//         ...this.state,
//       },
//     });
//   };
//   handleSteps = (e) => {
//     e.preventDefault();
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleInputChange = (event) => {
//     const target = event.target;
//     const value = target.type === "checkbox" ? target.checked : target.value;
//     const name = target.name;

//     this.setState({
//       [name]: value,
//     });
//   };
//   // render() {
//   const { me } = props;
//   return (
//     <>
//       <Mutation
//         mutation={UPDATE_USER_MUTATION}
//         variables={this.state}
//         refetchQueries={[{ query: CURRENT_USER_QUERY }]}
//       >
//         {(updateUser, { error, loading }) => (
//           <Form>
//             <Fieldset disabled={loading} aria-busy={loading}>
//               <>
//                 <div className="Title">Настройки аккаунта</div>
//                 <Green show={this.state.show}>Измнения внесены</Green>
//                 <Container>
//                   <input
//                     className="second"
//                     type="text"
//                     name="name"
//                     placeholder="Имя"
//                     required
//                     defaultValue={me.name}
//                     onChange={this.handleChange}
//                   />
//                   <br />
//                   <input
//                     className="second"
//                     type="text"
//                     name="surname"
//                     placeholder="Фамилия"
//                     required
//                     defaultValue={me.surname}
//                     onChange={this.handleChange}
//                   />
//                   <br />
//                   <input
//                     className="second"
//                     type="text"
//                     name="email"
//                     placeholder="Ваша электронная почта"
//                     required
//                     defaultValue={me.email}
//                     onChange={this.handleChange}
//                   />
//                   <br />
//                   <>
//                     {/* <select
//                         name="careerTrackID"
//                         defaultValue={
//                           me.careerTrackID ? me.careerTrackID : "NAN"
//                         }
//                         onChange={this.handleSteps}
//                       >
//                         <option value="NAN">Выберите карьерный трек</option>
//                         <option value="cjymyvxjqqsoh0b53wtdnpzkk">
//                           Старт карьеры. Корпоративное право
//                         </option>
//                         <option value="cjymywj43tg8c0b36c762ii0w">
//                           Старт карьеры. Право и технологии
//                         </option>
//                       </select>
//                       <Comment>
//                         Выбор карьерного трека необходим для составления плана
//                         карьерного развития, поиска курсов и предложений работы.
//                       </Comment> */
}
//                   </>
//                   <>
//                     <select
//                       name="status"
//                       defaultValue={me.status}
//                       value={this.state.status}
//                       onChange={this.handleSteps}
//                     >
//                       <option value="NAN">Не выбран</option>
//                       <option value="STUDENT">Студент</option>
//                       <option value="AUTHOR">Преподаватель</option>
//                       <option value="HR">HR</option>
//                     </select>
//                     <Comment>
//                       Выберите статус, чтобы проходить курсы в качестве
//                       студента, создавать курсы в качестве преподавателя или
//                       искать сотрудников в качестве HR.
//                     </Comment>
//                   </>
//                   {this.state.status === "HR" && (
//                     <>
//                       {/* <select
//                           name="company"
//                           defaultValue={
//                             me.company
//                               ? me.company.id
//                               : "ck2akkofk0bce0919xo8ooxma"
//                           }
//                           value={this.state.company}
//                           onChange={this.handleSteps}
//                         >
//                           {Companies.map((co) => (
//                             <option value={Object.values(co)[0]}>
//                               {Object.keys(co)[0]}
//                             </option>
//                           ))}
//                         </select> */}
//                     </>
//                   )}
//                   {this.state.status !== "HR" && (
//                     <>
//                       <>
//                         {/* <select
//                             name="uniID"
//                             defaultValue={
//                               me.uni ? me.uni.id : "cjymz9pazr0ib0b53v38d401g"
//                             }
//                             value={this.state.uni}
//                             onChange={this.handleSteps}
//                           >
//                             {Unis.map((uni) => (
//                               <option value={Object.values(uni)[0]}>
//                                 {Object.keys(uni)[0]}
//                               </option>
//                             ))}
//                           </select>
//                           <Comment>
//                             Выберите университет, чтобы получать доступ к курсам
//                             вузов или создавать курсы для вашего вуза.
//                           </Comment> */}
//                       </>

//                       <>
//                         {/* <input
//                             className="second"
//                             type="text"
//                             name="resume"
//                             placeholder="Ссылка на резюме"
//                             defaultValue={me.resume}
//                             onChange={this.handleChange}
//                           /> */}
//                         <br />
//                         {/* <input
//                             className="second"
//                             type="text"
//                             name="coverLetter"
//                             placeholder="Ссылка на сопроводительное письмо"
//                             defaultValue={me.coverLetter}
//                             onChange={this.handleChange}
//                           />
//                           <Comment>
//                             Загрузите документы на Яндекс Диск или Гугл Драйв и
//                             добавьте ссылки в форму выше.
//                           </Comment> */}
//                       </>
//                     </>
//                   )}
//                   {/* {!me.isFamiliar && (
//                       <>
//                         <p className="first">
//                           Когда вы пользуетесь Savvy, мы собираем ваши
//                           персональные данные. Пожалуйста, дайте нам свое
//                           согласие на это.
//                         </p>
//                         <input
//                           className="checked"
//                           type="checkbox"
//                           name="isFamiliar"
//                           value={true}
//                           checked={this.state.isFamiliar}
//                           onChange={this.handleInputChange}
//                         />
//                       </>
//                     )} */}
//                 </Container>
//                 <Buttons>
//                   <Button
//                     onClick={async (e) => {
//                       e.preventDefault();
//                       updateUser();
//                       // this.setState({ show: true });
//                     }}
//                   >
//                     Изменить
//                   </Button>
//                 </Buttons>
//               </>
//             </Fieldset>
//           </Form>
//         )}
//       </Mutation>
//     </>
//   );
// };

// export default Account; */}
