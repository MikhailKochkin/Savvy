// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import Link from "next/link";
// import styled from "styled-components";
// import gql from "graphql-tag";
// import { Mutation, Query } from "react-apollo";
// import Signup from "../auth/Signup";
// import Signin from "../auth/Signin";
// import RequestReset from "../auth/RequestReset";
// import Modal from "styled-react-modal";

// const SINGLE_COURSE_VISIT_QUERY = gql`
//   query SINGLE_COURSE_VISIT_QUERY($coursePage: ID!, $student: ID!) {
//     courseVisits(
//       where: { coursePage: { id: $coursePage }, student: { id: $student } }
//     ) {
//       id
//       visitsNumber
//       student {
//         id
//       }
//     }
//   }
// `;

// const CREATE_COURSE_VISIT_MUTATION = gql`
//   mutation CREATE_COURSE_VISIT_MUTATION($visitsNumber: Int, $coursePage: ID) {
//     createCourseVisit(visitsNumber: $visitsNumber, coursePage: $coursePage) {
//       id
//     }
//   }
// `;

// const UPDATE_COURSE_VISIT_MUTATION = gql`
//   mutation UPDATE_COURSE_VISIT_MUTATION($id: ID!, $visitsNumber: Int) {
//     updateCourseVisit(id: $id, visitsNumber: $visitsNumber) {
//       id
//     }
//   }
// `;

// const CaseCard = styled.div`
//   display: flex;
//   flex-direction: column;
//   text-align: left;
//   padding: 4px;
//   border: 1px solid #edefed;
//   border-radius: 10px;
//   margin: 2%;
//   max-width: 275px;
//   line-height: 1.2;
//   @media (max-width: 600px) {
//     width: 85%;
//     button {
//       padding: 4px 6px;
//     }
//   }
// `;

// const Author = styled.p`
//   color: #686868;
//   @media (max-width: 950px) {
//     font-size: 1.4rem;
//   }
// `;

// const Img = styled.img`
//   width: 100%;
//   height: 200px;
//   border-top-left-radius: 5px;
//   border-top-right-radius: 5px;
//   @media (max-width: 950px) {
//     object-fit: cover;
//   }
// `;

// const Title = styled.p`
//   font-size: 1.6rem;
//   margin-top: 5%;
// `;

// const button = styled.button`
//   border: 1px solid #112a62;
//   color: #112a62;
//   padding: 5px 12px;
//   background: white;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 14px;
//   border-radius: 5px;
//   width: 100%;
//   cursor: pointer;
//   outline: 0;
//   &:active {
//     border: 2px solid #112a62;
//   }
//   @media (max-width: 950px) {
//     margin: 0;
//   }
// `;

// const StyledModal = Modal.styled`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: white;
//   border: 1px solid grey;
//   border-radius: 10px;
//   max-width: 30%;
//   @media (max-width: 800px) {
//     max-width: 90%;
//   }
// `;
// const Additional = styled.div`
//   display: flex;
//   height: 100%;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const SignUpbutton = styled.button`
//   font-family: Montserrat;
//   border: none;
//   background: #fff;
//   border-radius: 5px;
//   padding: 2% 1.5%;
//   font-size: 1.5rem;
//   color: #112b62;
//   cursor: pointer;
//   border: 1px solid #112b62;
//   outline: 0;
//   &:hover {
//     border: 1.5px solid #112b62;
//   }
// `;

// export default class Course extends Component {
//   state = {
//     revealApplication: false,
//     isOpen: false,
//     auth: "signin",
//   };
//   static propTypes = {
//     coursePage: PropTypes.object.isRequired,
//   };

//   toggleModal = (e) => {
//     this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
//   };

//   changeState = (dataFromChild) => {
//     this.setState({
//       auth: dataFromChild,
//     });
//   };

//   render() {
//     const { coursePage, id, me } = this.props;
//     return (
//       <CaseCard>
//         <Additional>
//           <>
//             {coursePage.image && (
//               <Img src={c} alt={coursePage.title} />
//             )}
//             <Title>
//               <a>{coursePage.title}</a>
//             </Title>
//             {coursePage.user.status === "HR" && (
//               <Author>
//                 {coursePage.user.name} из {coursePage.user.company.name}
//               </Author>
//             )}
//             {!me && (
//               // <SignUpbutton onClick={this.toggleModal}>Войти</SignUpbutton>
//               <Link
//                 href={{
//                   pathname: "/coursePage",
//                   query: { id },
//                 }}
//                 prefetch
//               >
//                 <a>
//                   <button
//                     onClick={() => {
//                       console.log(0);
//                     }}
//                   >
//                     Перейти
//                   </button>
//                 </a>
//               </Link>
//             )}
//             {me && (
//               <Query
//                 query={SINGLE_COURSE_VISIT_QUERY}
//                 variables={{
//                   coursePage: id,
//                   student: me.id,
//                 }}
//               >
//                 {({ data, error, loading }) => {
//                   if (loading) return <p></p>;
//                   if (error) return <p>Error: {error.message}</p>;

//                   return (
//                     <>
//                       {data.courseVisits.length === 0 && (
//                         <Mutation
//                           mutation={CREATE_COURSE_VISIT_MUTATION}
//                           variables={{
//                             coursePage: id,
//                             visitsNumber: 1,
//                           }}
//                           refetchQueries={() => [
//                             {
//                               query: SINGLE_COURSE_VISIT_QUERY,
//                               variables: {
//                                 coursePage: id,
//                                 student: me.id,
//                               },
//                             },
//                           ]}
//                         >
//                           {(createCourseVisit, { loading, error }) => {
//                             return (
//                               <>
//                                 <>
//                                   {me && coursePage && (
//                                     <Link
//                                       href={{
//                                         pathname: "/coursePage",
//                                         query: { id },
//                                       }}
//                                       prefetch
//                                     >
//                                       <a>
//                                         <button
//                                           onClick={() => {
//                                             console.log(1);
//                                             createCourseVisit();
//                                           }}
//                                         >
//                                           Перейти
//                                         </button>
//                                       </a>
//                                     </Link>
//                                   )}
//                                 </>
//                               </>
//                             );
//                           }}
//                         </Mutation>
//                       )}
//                       {data.courseVisits.length > 0 && (
//                         <Mutation
//                           mutation={UPDATE_COURSE_VISIT_MUTATION}
//                           variables={{
//                             id: data.courseVisits[0].id,
//                             visitsNumber: data.courseVisits[0].visitsNumber + 1,
//                           }}
//                           refetchQueries={() => [
//                             {
//                               query: SINGLE_COURSE_VISIT_QUERY,
//                               variables: {
//                                 coursePage: id,
//                                 student: me.id,
//                               },
//                             },
//                           ]}
//                         >
//                           {(updateCourseVisit, { loading, error }) => {
//                             return (
//                               me &&
//                               coursePage && (
//                                 <Link
//                                   href={{
//                                     pathname: "/coursePage",
//                                     query: { id },
//                                   }}
//                                   prefetch
//                                 >
//                                   <a>
//                                     <button
//                                       onClick={() => {
//                                         console.log(2);
//                                         updateCourseVisit();
//                                       }}
//                                     >
//                                       Перейти
//                                     </button>
//                                   </a>
//                                 </Link>
//                               )
//                             );
//                           }}
//                         </Mutation>
//                       )}
//                     </>
//                   );
//                 }}
//               </Query>
//             )}
//           </>
//         </Additional>
//         {/* <StyledModal
//           isOpen={this.state.isOpen}
//           onBackgroundClick={this.c}
//           onEscapeKeydown={this.toggleModal}
//         >
//           {this.state.auth === "signin" && (
//             <Signin getData={this.changeState} closeNavBar={this.toggleModal} />
//           )}
//           {this.state.auth === "signup" && (
//             <Signup getData={this.changeState} closeNavBar={this.toggleModal} />
//           )}
//           {this.state.auth === "reset" && (
//             <RequestReset getData={this.changeState} />
//           )}
//         </StyledModal> */}
//       </CaseCard>
//     );
//   }
// }

import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

const SINGLE_COURSE_VISIT_QUERY = gql`
  query SINGLE_COURSE_VISIT_QUERY($coursePage: ID!, $student: ID!) {
    courseVisits(
      where: { coursePage: { id: $coursePage }, student: { id: $student } }
    ) {
      id
      visitsNumber
      student {
        id
      }
    }
  }
`;

const CREATE_COURSE_VISIT_MUTATION = gql`
  mutation CREATE_COURSE_VISIT_MUTATION($visitsNumber: Int, $coursePage: ID) {
    createCourseVisit(visitsNumber: $visitsNumber, coursePage: $coursePage) {
      id
    }
  }
`;

const UPDATE_COURSE_VISIT_MUTATION = gql`
  mutation UPDATE_COURSE_VISIT_MUTATION($id: ID!, $visitsNumber: Int) {
    updateCourseVisit(id: $id, visitsNumber: $visitsNumber) {
      id
    }
  }
`;

const CaseCard = styled.div`
  position: relative;
  margin: 2%;
  width: 295px;
  height: 295px;
  line-height: 1.2;
  img {
    object-fit: cover;
    width: 100%;
    max-height: 295px;
    /* height: 100%; */
  }
  .title {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  .name {
    font-size: 1.6rem;
    margin-bottom: 5px;
  }
  .company {
    font-size: 1.4rem;
    display: inline-block;
  }
  @media (max-width: 800px) {
    margin-bottom: 35px;
  }
`;
const Box = styled.div`
  color: white;
  background: linear-gradient(
    270deg,
    rgba(46, 46, 46, 0.7) 0%,
    rgba(46, 46, 46, 0.85) 100%
  );
  width: 245px;
  height: 100%;
  position: absolute;
  bottom: 0px;
  left: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
    background: rgba(46, 46, 46, 0.9);
  }
  .content {
    height: 85%;
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: space-between;
    img {
      width: 55px;
      height: 55px;
      border-radius: 50px;
    }
    .author {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
    .details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
    }
  }
  button {
    background: #00c3ff;
    border-radius: 20px;
    width: 100%;
    height: 35px;
    padding: 2%;
    border: none;
    color: white;
    font-family: Montserrat;
    font-size: 1.6rem;
    outline: 0;
    cursor: pointer;
    &:hover {
      background: #0195c2;
    }
  }
`;

export default class Course extends Component {
  state = {
    revealApplication: false,
    isOpen: false,
    auth: "signin",
  };
  static propTypes = {
    coursePage: PropTypes.object.isRequired,
  };

  toggleModal = (e) => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  changeState = (dataFromChild) => {
    this.setState({
      auth: dataFromChild,
    });
  };

  render() {
    const { coursePage, id, me } = this.props;
    return (
      <CaseCard>
        <img src={coursePage.image} />
        <Box>
          <div className="content">
            <div>
              <div className="title">{coursePage.title}</div>
              <div className="author">
                {coursePage.user.image && <img src={coursePage.user.image} />}
                <div className="details">
                  <div className="name">
                    {coursePage.user.name} {coursePage.user.surname}
                  </div>
                  <div className="company">
                    {coursePage.user.company
                      ? coursePage.user.company.name
                      : "BeSavvy App"}
                  </div>
                </div>
              </div>
            </div>
            <div>
              {!me && (
                // <SignUpbutton onClick={this.toggleModal}>Войти</SignUpbutton>
                <Link
                  href={{
                    pathname: "/coursePage",
                    query: { id },
                  }}
                  prefetch
                >
                  <a>
                    <button
                      onClick={() => {
                        console.log(0);
                      }}
                    >
                      Перейти
                    </button>
                  </a>
                </Link>
              )}
              {me && (
                <Query
                  query={SINGLE_COURSE_VISIT_QUERY}
                  variables={{
                    coursePage: id,
                    student: me.id,
                  }}
                >
                  {({ data, error, loading }) => {
                    if (loading) return <p></p>;
                    if (error) return <p>Error: {error.message}</p>;

                    return (
                      <>
                        {data.courseVisits.length === 0 && (
                          <Mutation
                            mutation={CREATE_COURSE_VISIT_MUTATION}
                            variables={{
                              coursePage: id,
                              visitsNumber: 1,
                            }}
                            refetchQueries={() => [
                              {
                                query: SINGLE_COURSE_VISIT_QUERY,
                                variables: {
                                  coursePage: id,
                                  student: me.id,
                                },
                              },
                            ]}
                          >
                            {(createCourseVisit, { loading, error }) => {
                              return (
                                <>
                                  <>
                                    {me && coursePage && (
                                      <Link
                                        href={{
                                          pathname: "/coursePage",
                                          query: { id },
                                        }}
                                        prefetch
                                      >
                                        <a>
                                          <button
                                            onClick={() => {
                                              console.log(1);
                                              createCourseVisit();
                                            }}
                                          >
                                            Перейти
                                          </button>
                                        </a>
                                      </Link>
                                    )}
                                  </>
                                </>
                              );
                            }}
                          </Mutation>
                        )}
                        {data.courseVisits.length > 0 && (
                          <Mutation
                            mutation={UPDATE_COURSE_VISIT_MUTATION}
                            variables={{
                              id: data.courseVisits[0].id,
                              visitsNumber:
                                data.courseVisits[0].visitsNumber + 1,
                            }}
                            refetchQueries={() => [
                              {
                                query: SINGLE_COURSE_VISIT_QUERY,
                                variables: {
                                  coursePage: id,
                                  student: me.id,
                                },
                              },
                            ]}
                          >
                            {(updateCourseVisit, { loading, error }) => {
                              return (
                                me &&
                                coursePage && (
                                  <Link
                                    href={{
                                      pathname: "/coursePage",
                                      query: { id },
                                    }}
                                    prefetch
                                  >
                                    <a>
                                      <button
                                        onClick={() => {
                                          console.log(2);
                                          updateCourseVisit();
                                        }}
                                      >
                                        Перейти
                                      </button>
                                    </a>
                                  </Link>
                                )
                              );
                            }}
                          </Mutation>
                        )}
                      </>
                    );
                  }}
                </Query>
              )}
            </div>
          </div>
        </Box>
      </CaseCard>
    );
  }
}
