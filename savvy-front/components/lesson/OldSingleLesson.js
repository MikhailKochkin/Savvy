// import React, { useState } from "react";
// import { gql } from "@apollo/client";
// import { Query } from "@apollo/client/react/components";
// import styled from "styled-components";
// import ReactResizeDetector from "react-resize-detector";
// import parse from "html-react-parser";

// import Link from "next/link";
// import Note from "./block_type_notes/Note";
// import Document from "./block_type_documents/Document";
// // import Exams from "./exams/Exams";
// import Forum from "./block_type_forum/Forum";
// import Chat from "./block_type_chats/Chat";
// import SingleQuiz from "./quizes/SingleQuiz";

// // import TestGroup from "./tests/TestGroup";
// // import ShotsGroup from "./shots/ShotsGroup";
// import TestPractices from "./block_type_testblocks/TestPractices";
// // import ProblemGroup from "./problems/ProblemGroup";
// // import ConstructorGroup from "./constructions/ConstructorGroup";
// import CreateNewTest from "./block_type_tests/CreateNewTest";
// import CreateQuiz from "./quizes/CreateQuiz";
// import CreateTestBlock from "./block_type_testblocks/CreateTestBlock";
// // import CreateShot from "../create/CreateShot";
// import CreateConstructor from "./constructions/CreateConstructor";
// import CreateTextEditor from "./textEditors/CreateTextEditor";
// import CreateProblem from "./block_type_problems/CreateProblem";
// import CreateNote from "./block_type_notes/CreateNote";
// import CreateChat from "./block_type_chats/CreateChat";
// import ChangeForum from "./block_type_forum/ChangeForum";
// import CreateDocument from "./block_type_documents/CreateDocument";
// import AreYouEnrolled from "../auth/AreYouEnrolled";
// import UpdateLesson from "./UpdateLesson";
// import { useUser } from "../User";
// import LessonBuilder from "./LessonBuilder";

// const SINGLE_LESSON_QUERY = gql`
//   query SINGLE_LESSON_QUERY($id: String!) {
//     lesson(where: { id: $id }) {
//       id
//       text
//       name
//       number
//       description
//       open
//       type
//       totalPoints
//       hasSecret
//       challenge_num
//       createdAt
//       structure
//       assignment
//       change
//       user {
//         id
//       }
//       coursePage {
//         id
//       }
//       shots {
//         id
//         title
//         parts
//         comments
//         user {
//           id
//         }
//       }
//       testPractices {
//         id
//         tasks
//         tasksNum
//       }
//       notes {
//         id
//         link_clicks
//         complexity
//         isSecret
//         text
//         next
//         user {
//           id
//         }
//       }
//       chats {
//         id
//         name
//         isSecret
//         link_clicks
//         complexity
//         messages
//         user {
//           id
//         }
//       }
//       quizes {
//         id
//         question
//         type
//         complexity
//         check
//         ifRight
//         ifWrong
//         answer
//         next
//         createdAt
//         user {
//           id
//           name
//           surname
//         }
//       }
//       documents {
//         id
//         title
//         complexity
//         user {
//           id
//         }
//         clauses {
//           id
//           user {
//             id
//           }
//           number
//           commentary
//           keywords
//           sample
//         }
//       }
//       forum {
//         id
//         text
//         rating {
//           id
//           rating
//           user {
//             id
//           }
//         }
//         statements {
//           id
//           text
//           createdAt
//           user {
//             id
//             name
//             surname
//           }
//           forum {
//             id
//             rating {
//               id
//               rating
//             }
//           }
//         }
//         lesson {
//           id
//           user {
//             id
//           }
//         }
//         user {
//           id
//           name
//           surname
//         }
//       }
//       newTests {
//         id
//         answers
//         correct
//         type
//         comments
//         complexity
//         ifRight
//         ifWrong
//         next
//         question
//         createdAt
//         user {
//           id
//         }
//       }
//       problems {
//         id
//         text
//         nodeID
//         complexity
//         steps
//         nodeType
//         user {
//           id
//         }
//         createdAt
//       }
//       constructions {
//         id
//         name
//         answer
//         complexity
//         variants
//         hint
//         type
//         text
//         columnsNum
//         elements
//         hasText
//         user {
//           id
//         }
//       }
//       texteditors {
//         id
//         name
//         complexity
//         text
//         totalMistakes
//         user {
//           id
//         }
//       }
//     }
//   }
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100vw;
//   /* The side navigation menu */
//   .sidenav {
//     height: 100%; /* 100% Full-height */
//     width: 0; /* 0 width - change this with JavaScript */
//     position: fixed; /* Stay in place */
//     z-index: 1; /* Stay on top */
//     top: 0; /* Stay at the top */
//     left: 0;
//     background-color: #112a62; /* Blue*/
//     overflow-x: hidden; /* Disable horizontal scroll */
//     padding-top: 60px; /* Place content 60px from the top */
//     transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
//   }

//   /* The navigation menu links */
//   .sidenav a {
//     padding: 8px 8px 8px 32px;
//     text-decoration: none;
//     font-size: 25px;
//     color: #818181;
//     display: block;
//     transition: 0.3s;
//   }

//   /* When you mouse over the navigation links, change their color */
//   .sidenav a:hover {
//     color: #f1f1f1;
//   }

//   /* Position and style the close button (top right corner) */
//   .sidenav .closebtn {
//     position: absolute;
//     top: 0;
//     right: 25px;
//     font-size: 36px;
//     margin-left: 50px;
//   }

//   /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
//   #main {
//     transition: margin-left 0.5s;
//     padding: 20px;
//   }

//   /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
//   @media screen and (max-height: 450px) {
//     .sidenav {
//       padding-top: 15px;
//     }
//     .sidenav a {
//       font-size: 18px;
//     }
//   }
// `;

// const TextBar = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   width: 90%;
//   margin: 2.5% 0;
//   font-size: 1.6rem;
//   padding: 2% 2% 4% 2%;
//   a {
//     /* color: #800000;
//     text-decoration: underline; */
//     cursor: pointer;
//   }
//   @media (max-width: 800px) {
//     width: 100%;
//     font-size: 1.8rem;
//   }
// `;

// const Center = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Head = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   color: white;
//   height: 10vh;
//   background: #1a2980; /* fallback for old browsers */
//   background: -webkit-linear-gradient(
//     to right,
//     #26d0ce,
//     #1a2980
//   ); /* Chrome 10-25, Safari 5.1-6 */
//   background: linear-gradient(to right, #26d0ce, #1a2980);
//   width: 100vw;
//   font-size: 2.3rem;
//   span {
//     margin: 0 3%;
//   }
//   #back {
//     &:hover {
//       color: #e4e4e4;
//     }
//     cursor: pointer;
//   }
//   @media (max-width: 800px) {
//     font-size: 1.6rem;
//     justify-content: space-between;
//     align-items: center;
//     margin: 0 1%;
//   }
// `;

// const Head2 = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   padding: 0;
//   background: #1a2980; /* fallback for old browsers */
//   background: -webkit-linear-gradient(
//     to right,
//     #26d0ce,
//     #1a2980
//   ); /* Chrome 10-25, Safari 5.1-6 */
//   background: linear-gradient(to right, #26d0ce, #1a2980);
//   color: white;
//   width: 100vw;
//   text-align: center;
//   font-size: 1.8rem;
//   span {
//     color: #3ddc97;
//     cursor: pointer;
//     &:hover {
//       color: #139a43;
//     }
//   }
//   @media (max-width: 800px) {
//     font-size: 1.6rem;
//     justify-content: center;
//     padding: 2% 15px;
//     div {
//       flex: 85%;
//       text-align: right;
//     }
//   }
// `;

// const LessonStyles = styled.div`
//   display: flex;
//   width: 80%;
//   max-width: 1400px;
//   flex-direction: row;
//   @media (max-width: 800px) {
//     flex-direction: column;
//     width: 90%;
//   }
//   .slideout-menu {
//     position: fixed;
//     top: 0;
//     bottom: 0;
//     width: 256px;
//     min-height: 100vh;
//     overflow-y: scroll;
//     -webkit-overflow-scrolling: touch;
//     z-index: 0;
//     display: none;
//   }

//   .slideout-menu-left {
//     left: 0;
//   }

//   .slideout-menu-right {
//     right: 0;
//   }

//   .slideout-panel {
//     position: relative;
//     z-index: 1;
//     will-change: transform;
//     background-color: #fff; /* A background-color is required */
//     min-height: 100vh;
//   }

//   .slideout-open,
//   .slideout-open body,
//   .slideout-open .slideout-panel {
//     overflow: hidden;
//   }

//   .slideout-open .slideout-menu {
//     display: block;
//   }
// `;

// const LessonPart = styled.div`
//   display: flex;
//   flex-basis: 100%;
//   flex-direction: column;
//   /* background: white; */
//   border-radius: 2px;
//   /* a {
//     padding-top: 2%;
//     padding-left: 2%;
//   } */
//   @media (max-width: 800px) {
//     order: 2;
//     margin: 1%;
//   }
// `;

// const Text = styled.div`
//   line-height: 1.8;
//   img {
//     display: block;
//     max-width: 100%;
//     max-height: 20em;
//     box-shadow: "0 0 0 2px blue;";
//   }
//   iframe {
//     width: 110%;
//     height: 400px;
//     @media (max-width: 800px) {
//       width: 100%;
//       height: auto;
//     }
//   }
// `;

// const Button = styled.button`
//   margin-top: 10px;
// `;

// const SingleLesson = (props) => {
//   const [page, setPage] = useState("lesson");
//   const [shown, setShown] = useState(false);
//   const [width, setWidth] = useState(800);
//   const [isMenuShown, setIsMenuShown] = useState(true);

//   const onResize = (width) => {
//     setWidth(width);
//   };

//   const getData = (data) => setPage(data);
//   const getDataMob = (data) => {
//     setPage(data);
//     document.getElementById("mySidenav2").style.width = "0";
//   };

//   const openNav = () => {
//     document.getElementById("mySidenav2").style.width = "180px";
//   };

//   const getLink = (dataFromChild) => setPage(dataFromChild);
//   const me = useUser();
//   return (
//     <Query
//       query={SINGLE_LESSON_QUERY}
//       variables={{
//         id: props.id,
//       }}
//       fetchPolicy="cache-first"
//     >
//       {({ data, error, loading }) => {
//         if (error) return <Error error={error} />;
//         if (loading) return <p>Loading...</p>;
//         if (data === null) return <p>Нет урока</p>;
//         const lesson = data.lesson;
//         return (
//           <>
//             <Container>
//               <ReactResizeDetector
//                 handleWidth
//                 handleHeight
//                 onResize={onResize}
//               />
//               {/* {width < 800 && (
//                 <SingleLesson_MobileMenu
//                   lesson={lesson}
//                   getDataMob={getDataMob}
//                 />
//               )} */}

//               <Head>
//                 {width > 800 ? (
//                   <Link
//                     href={{
//                       pathname: "/course",
//                       query: {
//                         id: lesson.coursePage.id,
//                       },
//                     }}
//                   >
//                     <span>Back</span>
//                   </Link>
//                 ) : (
//                   width < 800 && (
//                     <span onClick={(e) => openNav()}>Навигация</span>
//                   )
//                 )}
//                 <span>
//                   Урок {lesson.number}. {lesson.name}
//                 </span>
//               </Head>
//               {me &&
//                 (lesson.user.id === me.id ||
//                   me.permissions.includes("ADMIN")) && (
//                   <Head2>
//                     {lesson ? (
//                       <Link
//                         href={{
//                           pathname: "/lesson",
//                           query: {
//                             id: lesson.id,
//                             type: "story",
//                           },
//                         }}
//                       >
//                         <span>{`История `}</span>
//                       </Link>
//                     ) : (
//                       <span
//                         onClick={() =>
//                           alert(
//                             `Структура урока не задана, это можно сделать в настройках.`
//                           )
//                         }
//                       >
//                         {" "}
//                         История
//                       </span>
//                     )}
//                     <>
//                       {" "}
//                       <span>{` |  `}</span>
//                     </>
//                     <Link
//                       href={{
//                         pathname: "/lesson",
//                         query: {
//                           id: lesson.id,
//                           type: "challenge",
//                         },
//                       }}
//                     >
//                       <span> Испытание</span>
//                     </Link>
//                   </Head2>
//                 )}

//               {/* <Button onClick={(e) => setIsMenuShown(!isMenuShown)}>
//                     {isMenuShown ? "Скрыть меню" : "Показать меню"}
//                   </Button> */}
//               <LessonStyles>
//                 <LessonPart>
//                   {page === "lesson" && (
//                     <TextBar>
//                       {/* <HowTo getLink={getLink} /> */}
//                       <Text>{parse(lesson.text)}</Text>
//                     </TextBar>
//                   )}
//                   {page === "note" &&
//                     [...lesson.notes]
//                       .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
//                       .map((note) => (
//                         <Note
//                           text={note.text}
//                           me={me}
//                           clicks={note.link_clicks}
//                           user={lesson.user.id}
//                           note={note}
//                           id={note.id}
//                           complexity={note.complexity}
//                           next={note.next}
//                           quizes={lesson.quizes}
//                           notes={lesson.notes}
//                           tests={lesson.newTests}
//                           lessonID={lesson.id}
//                         />
//                       ))}
//                   {page === "chat" &&
//                     lesson.chats.map((c) => (
//                       <Chat
//                         name={c.name}
//                         me={me}
//                         isSecret={c.isSecret}
//                         user={lesson.user.id}
//                         messages={c.messages}
//                         id={c.id}
//                         lessonID={lesson.id}
//                       />
//                     ))}
//                   {page === "document" &&
//                     lesson.documents.map((doc) => (
//                       <Document
//                         clauses={doc.clauses}
//                         title={doc.title}
//                         me={me}
//                         documentID={doc.id}
//                         user={lesson.user.id}
//                         lessonID={lesson.id}
//                       />
//                     ))}
//                   {/* {page === "shots" && (
//                     <ShotsGroup
//                       shots={lesson.shots}
//                       me={me}
//                       lessonID={lesson.id}
//                       shotResults={lesson.shotResults}
//                     />
//                   )} */}
//                   {/* {page === "test" && (
//                     <>
//                       {lesson.newTests.length > 0 ? (
//                         <TestGroup
//                           tests={lesson.newTests}
//                           me={me}
//                           lessonID={lesson.id}
//                           testResults={[]}
//                           quizes={lesson.quizes}
//                           notes={lesson.notes}
//                         />
//                       ) : (
//                         <Center>
//                           <h2>Тестов по этому уроку нет</h2>
//                         </Center>
//                       )}
//                     </>
//                   )} */}

//                   {page === "quiz" &&
//                     lesson.quizes.map((quiz) => {
//                       return (
//                         <SingleQuiz
//                           key={quiz.id}
//                           id={quiz.id}
//                           complexity={quiz.complexity}
//                           question={quiz.question}
//                           answer={quiz.answer}
//                           answers={quiz.answers}
//                           type={quiz.type}
//                           goalType={quiz.goalType}
//                           check={quiz.check}
//                           me={me}
//                           lesson={lesson}
//                           ifRight={quiz.ifRight}
//                           ifWrong={quiz.ifWrong}
//                           name={quiz.name}
//                           image={quiz.image}
//                           hidden={false}
//                           lessonID={lesson.id}
//                           quizID={quiz.id}
//                           user={quiz.user.id}
//                           story={false}
//                           user_name={quiz.user}
//                           author={lesson.user}
//                         />
//                       );
//                     })}
//                   {page === "testBlock" && (
//                     <TestPractices
//                       lessonID={lesson.id}
//                       quizResults={[]}
//                       testResults={[]}
//                       me={me}
//                       testPractices={lesson.testPractices}
//                       quizes={lesson.quizes}
//                       tests={lesson.newTests}
//                       lesson={lesson}
//                     />
//                   )}
//                   {/* {page === "problem" && (
//                     <>
//                       {lesson.problems.length > 0 ? (
//                         <ProblemGroup
//                           lessonID={lesson.id}
//                           problems={lesson.problems}
//                           me={me}
//                           problemResults={[]}
//                           lesson={lesson}
//                         />
//                       ) : (
//                         <Center>
//                           <h2>Задач пока нет</h2>
//                         </Center>
//                       )}
//                     </>
//                   )} */}
//                   {page === "constructor" && (
//                     <>
//                       {/* {" "}
//                       {lesson.constructions.length > 0 ? (
//                         <>
//                           <ConstructorGroup
//                             constructions={lesson.constructions}
//                             lessonID={lesson.id}
//                             me={me}
//                             constructionResults={[]}
//                           />
//                         </>
//                       ) : (
//                         <Center>
//                           <h2>Конструкторов документов пока нет</h2>
//                         </Center>
//                       )}{" "} */}
//                     </>
//                   )}
//                   {/* {page === "textEditor" &&
//                     (lesson.texteditors.length > 0 ? (
//                       <TextEditorGroup
//                         lessonID={lesson.id}
//                         textEditors={lesson.texteditors}
//                         me={me}
//                         textEditorResults={[]}
//                       />
//                     ) : (
//                       <Center>
//                         <h2>Редакторов документов пока нет</h2>
//                       </Center>
//                     ))} */}
//                   {page === "createTest" && (
//                     <CreateNewTest lessonID={lesson.id} />
//                   )}
//                   {page === "createForum" && (
//                     <ChangeForum lesson={lesson.id} forum={lesson.forum} />
//                   )}
//                   {page === "createNote" && <CreateNote lessonID={lesson.id} />}
//                   {page === "createTestBlock" && (
//                     <CreateTestBlock lesson={lesson} lessonId={lesson.id} />
//                   )}
//                   {page === "createChat" && <CreateChat lessonID={lesson.id} />}
//                   {page === "createDocument" && (
//                     <CreateDocument lessonID={lesson.id} />
//                   )}
//                   {/* {page === "createShot" && <CreateShot lessonID={lesson.id} />} */}
//                   {page === "createQuiz" && <CreateQuiz lessonID={lesson.id} />}
//                   {page === "createProblem" && (
//                     <CreateProblem lessonID={lesson.id} lesson={lesson} />
//                   )}
//                   {page === "createConstructor" && (
//                     <CreateConstructor lessonID={lesson.id} />
//                   )}
//                   {page === "createTextEditor" && (
//                     <CreateTextEditor lessonID={lesson.id} />
//                   )}
//                   {page === "updateLesson" && (
//                     <UpdateLesson
//                       lessonID={lesson.id}
//                       description={lesson.description}
//                       lesson={lesson}
//                       change={lesson.change}
//                     />
//                   )}
//                   {page === "updateShots" && (
//                     <UpdateShots lessonID={lesson.id} />
//                   )}
//                 </LessonPart>
//                 {/* {width > 800 && isMenuShown && (
//                   <SingleLesson_Menu
//                     lesson={lesson}
//                     getData={getData}
//                     me={me}
//                   />
//                 )} */}
//               </LessonStyles>
//             </Container>
//             <div id="root"></div>
//           </>
//         );
//       }}
//     </Query>
//   );
// };

// export default SingleLesson;
// export { SINGLE_LESSON_QUERY };
