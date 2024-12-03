// import styled from "styled-components";
// const Styles = styled.div`
//   min-height: 100vh;
//   width: 100vw;
//   background: #ffd89b; /* fallback for old browsers */
//   background: -webkit-linear-gradient(
//     to right,
//     #f8efe6,
//     #ffd89b
//   ); /* Chrome 10-25, Safari 5.1-6 */
//   background: linear-gradient(
//     to right,
//     #f8efe6,
//     #ffd89b
//   ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   #data0 {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: space-between;
//     width: 80%;
//     h1 {
//       margin-bottom: 0;
//       font-size: 5rem;
//       line-height: 1.4;
//       font-weight: 600;
//     }
//   }
//   #data {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: center;
//     width: 80%;
//   }
//   #mobile_image {
//     display: none;
//   }
//   @media (max-width: 800px) {
//     height: 100%;
//     padding-bottom: 50px;
//     #mobile_image {
//       display: block;
//       width: 100%;
//       display: flex;
//       flex-direction: row;
//       align-items: flex-start;
//       justify-content: flex-start;
//       img {
//         width: 60%;
//         margin: 15px 0;
//       }
//     }
//     #data {
//       width: 90%;
//       flex-direction: column;
//     }
//     #data0 {
//       width: 90%;
//       flex-direction: column;
//       justify-content: flex-start;
//       h1 {
//         line-height: 1.4;
//         font-size: 3rem;
//         margin-top: 40px;
//       }
//     }
//   }
// `;

// const Header = styled.div`
//   flex-basis: 10%;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: flex-end;
//   padding-bottom: 10px;
//   width: 90%;
//   color: #1b222c;
//   border-color: #1b222c;
//   font-size: 2.1rem;
//   margin-bottom: 50px;
//   @media (max-width: 800px) {
//     flex-basis: 20%;
//     padding-top: 20px;
//     width: 95%;
//     margin-bottom: 0px;
//     div {
//       line-height: 1.6;
//     }
//   }
// `;

// const Text = styled.div`
//   flex-basis: 70%;
//   height: 100%;
// `;

// const Image = styled.div`
//   width: 30%;
//   height: 100%;
//   img {
//     width: 310px;
//   }
//   @media (max-width: 800px) {
//     display: none;
//   }
// `;

// const Info = styled.div`
//   flex-basis: 85%;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: center;
//   width: 100%;
//   /* min-width: 1000px; */
//   #level1 {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: flex-start;
//     width: 100%;

//     #mobile_image {
//       display: none;
//     }
//   }
//   h1 {
//     font-size: 5.6rem;
//     font-weight: 500;
//     width: 80%;
//     text-align: left;
//     line-height: 1.2;
//   }
//   .timeline {
//     font-size: 1.8rem;
//     color: #626262;
//     margin-bottom: 30px;
//     #left {
//       border-bottom: 2px solid #ff6f59;
//     }
//   }
//   img {
//     width: 120px;
//     margin-left: -30px;
//   }
//   h2 {
//     font-size: 2rem;
//     font-weight: 500;
//     text-align: left;
//     width: 60%;
//     line-height: 1.6;
//     margin-bottom: 20px;
//     button {
//       padding: 3%;
//       border-radius: 10px;
//       color: #fff;
//       background: #ff6f59;
//       border: none;
//       outline: 0;
//       cursor: pointer;
//       margin-top: 20px;
//       font-family: Montserrat;
//       width: 450px;
//       font-size: 1.8rem;
//       transition: 0.3s;
//       &:hover {
//         background: #e01e00;
//       }
//     }
//     span {
//       color: #ff6f59;
//       cursor: pointer;
//       &:hover {
//         text-decoration: underline;
//       }
//     }
//   }
//   @media (max-width: 800px) {
//     width: 90%;
//     #level1 {
//       display: flex;
//       flex-direction: column;
//       #mobile_image {
//         display: block;
//         width: 100%;
//         display: flex;
//         flex-direction: row;
//         align-items: flex-start;
//         justify-content: flex-start;
//         img {
//           width: 60%;
//           margin: 15px 0;
//         }
//       }
//       h1 {
//         font-size: 3rem;
//         font-weight: 500;
//         width: 95%;
//         text-align: left;
//         line-height: 1.4;
//       }
//       img {
//         width: 100px;
//       }
//     }
//     h2 {
//       width: 100%;
//       font-size: 2rem;
//       text-align: left;
//       line-height: 1.4;
//       margin-top: 20px;
//       button {
//         width: 100%;
//       }
//     }
//     .timeline {
//       margin-bottom: 0;
//     }
//   }
// `;

// const List = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: space-between;
//   justify-content: center;
//   flex-wrap: wrap;
//   height: auto;
//   width: 80%;
//   font-size: 2rem;
//   .element {
//     display: flex;
//     flex-direction: row;
//     margin-bottom: 15px;
//     padding-left: 50px;
//     img {
//       width: 25px;
//       margin-right: 15px;
//     }
//   }
//   @media (max-width: 800px) {
//     flex-direction: column;
//     height: auto;
//     flex-wrap: nowrap;
//     margin-top: 20px;
//     width: 100%;

//     .element {
//       width: 110%;
//       padding-left: 50px;
//       font-size: 1.8rem;
//     }
//   }
// `;
// const Main = () => {
//   const slide = () => {
//     var my_element = document.getElementById("C2A");
//     my_element.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//       inline: "nearest",
//     });
//   };
//   return (
//     <Styles>
//       {/* <Header>
//         <div>Школа молодого юриста BeSavvy 2021</div>
//       </Header> */}
//       <div id="data0">
//         <div id="level1">
//           <h1> 🧑‍💻 Трансформируем вашу юридическую карьеру</h1>
//           <div id="mobile_image">
//             <img src="static/certificate.svg" />
//           </div>
//         </div>
//       </div>

//       <div id="data">
//         <Text>
//           <Info>
//             <h2>
//               Помогаем молодым юристам выбрать специализацию, прокачать навыки и
//               найти работу. <br />
//               <button onClick={(e) => slide()}>
//                 Записаться на консультацию
//               </button>
//             </h2>
//             <div className="timeline">
//               Старт: 1 февраля. Скидка до 30%.{" "}
//               <span id="left">До 10 октября</span>
//             </div>
//             <List>
//               <div className="element">
//                 {" "}
//                 <img src="static/tick.svg" />
//                 Для студентов, ищущих свое направление
//               </div>
//               <div className="element">
//                 {" "}
//                 <img src="static/tick.svg" />
//                 Для выпускников, ищущих первую работу
//               </div>
//               <div className="element">
//                 {" "}
//                 <img src="static/tick.svg" />
//                 Для юристов, которых хотят изменений в карьере
//               </div>
//               {/* <div className="element">
//                 {" "}
//                 <img src="static/tick.svg" />
//                 Цель – довести вас до первой (или новой) работы
//               </div> */}
//             </List>
//           </Info>
//         </Text>
//         <Image>
//           <img src="static/certificate.svg" />
//         </Image>
//       </div>
//     </Styles>
//   );
// };

// export default Main;

import { useEffect } from "react";
import styled from "styled-components";
import smoothscroll from "smoothscroll-polyfill";
import Link from "next/link";

const Styles = styled.div`
  width: 100%;
  display: flex;
  background: #fff;
  min-height: 70vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    padding-top: 30px;
  }
`;

const Block = styled.div`
  width: 75%;
  padding: 25px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    width: 90%;
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h1 {
    font-size: 6rem;
    line-height: 1.2;
    text-align: center;
    font-weight: 800;
    margin: 0;
    margin-bottom: 20px;
    color: #252f3f;
    span {
      background: #fce969;
      display: inline-block;
      transform: skew(-8deg);
      /* -webkit-transform: skew(-5deg);
      -moz-transform: skew(-5deg);
      -o-transform: skew(-5deg); */
    }
  }
  .subheader {
    font-size: 2.2rem;
    line-height: 1.4;
    text-align: center;
    width: 65%;
    font-weight: 400;
    color: #4b5563;
  }
  button {
    background: #175ffe;
    color: #fff;
    border-radius: 5px;
    border: none;
    margin-top: 25px;
    margin-bottom: 15px;
    width: 250px;
    padding: 15px 0;
    outline: 0;
    cursor: pointer;
    font-family: Montserrat;
    font-size: 1.8rem;
    transition: 0.3s;
    &:hover {
      background: #0135a9;
    }

    div {
      font-size: 1.4rem;
    }
  }
  .point_text {
    text-align: right;
  }
  @media (max-width: 1300px) {
    button {
      width: 40%;
    }
    div {
      width: 100%;
      font-size: 1.6rem;
      text-align: right;
      margin-bottom: 15px;
    }
  }
  @media (max-width: 900px) {
    width: 100%;
    h1 {
      font-size: 4rem;
    }

    button {
      width: 100%;
    }
    div {
      width: 100%;
      font-size: 1.6rem;
      text-align: center;
      margin-bottom: 15px;
    }
    .header {
      font-size: 2.4rem;
    }
    .subheader {
      font-size: 2rem;
      width: 95%;
    }
  }
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  width: 80%;
  object-fit: cover;
  text-align: center;
  color: black;
  background: #7f7fd5; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #91eae4,
    #86a8e7,
    #7f7fd5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #91eae4,
    #86a8e7,
    #7f7fd5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /* border-radius: 10px; */
  width: 80vw;
  padding: 0 12%;
  .text {
    color: white;
    line-height: 1.6;
    font-size: 2.4rem;
  }
  @media (max-width: 800px) {
    .text {
      font-size: 1.8rem;
    }
    padding: 0 5%;
    height: 20vh;
  }
`;

const Landing = (props) => {
  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });
  const slide = () => {
    var my_element = document.getElementById("C2A");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <Styles>
      <Block>
        <Text>
          <h1>
            Получите практические <span>юридические навыки</span>. <br />И
            найдите работу.
          </h1>
          <div className="subheader">
            За 6 месяцев вы научитесь решать практические кейсы. Познакомитесь с
            экспертами. И узнаете, как пройти любое собеседование.
          </div>
          <button onClick={(e) => slide()}>Начать учиться сейчас</button>
          <div>Первые 3 урока бесплатно</div>
        </Text>
      </Block>
    </Styles>
  );
};

export default Landing;
// export default withTranslation("common")(Landing);
