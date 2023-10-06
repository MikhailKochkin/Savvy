// import { useState } from "react";

import React from "react";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "lesson",
      "nav",
      "auth",
      "create",
    ])),
  },
});

const DynamicNewSingleLesson = dynamic(
  import("../components/demo/DemoLesson"),
  {
    ssr: false,
  }
);

const demo = (props) => {
  return (
    <div>
      {props.query.lang == "eng" ? (
        <DynamicNewSingleLesson id="clmz0cqak00720t0xpltjg7wf" />
      ) : (
        <DynamicNewSingleLesson id="ckfc5hguf03ou0702y6fmm4wq" />
      )}
    </div>
  );
};

export default demo;

// import styled from "styled-components";
// import Problem1 from "../components/lesson/decisionMaker/Problem1";
// import Problem2 from "../components/lesson/decisionMaker/Problem2";

// const Styles = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 4% 0;
//   width: 100%;
//   line-height: 1.8;
//   align-items: center;
//   justify-content: center;
// `;

// const Intro = styled.div`
//   padding: 3%;
//   padding-bottom: 0%;
//   width: 50%;
//   .header {
//     margin-bottom: 10px;
//     font-weight: bold;
//     font-size: 2rem;
//   }
//   @media (max-width: 800px) {
//     width: 90%;
//   }
// `;

// const Steps = styled.div`
//   padding: 3%;
//   width: 100%;
// `;

// const Final = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const Result = styled.div`
//   background: #27b353;
//   color: white;
//   width: 30%;
//   text-align: center;
//   padding: 2%;
//   display: inline-block;
//   border-radius: 5px;
// `;

// const demo = () => {
//   const [completed, setCompleted] = useState([false, false]);
//   const intro = {
//     header: "Симулятор принятия решений: поиск новых рекламных каналов",
//     text: `Авиакомпания S11, которая в 2016-2020 годах лидировала в России по количеству
//   перевезенных пассажиров, с марта 2020 года начала терять пассажиров.
//   Безусловно, первичным фактором, оказавшим влияние на это падение,
//   стада пандемия. Тем не менее, еще одной причиной стал низкий уровень
//   использования онлайн инструментов рекламы и продаж. Теперь компания поняла,
//   что необходимо приоретизировать электронные инструменты торговли`,
//     question:
//       "какие инструменты продаж стоит использовать S11 для повышения выручки компании?",
//   };
//   const getData = (data, index) => {
//     console.log(data, index);
//     let new_completed = completed;
//     new_completed[index] = true;
//     console.log(new_completed);
//     setCompleted([...new_completed]);
//   };
//   return (
//     <Styles>
//       <Intro>
//         <div className="header">{intro.header}</div>
//         <p>{intro.text}</p>
//         <p>
//           <b>Примите решение: </b>
//           {intro.question}
//         </p>
//       </Intro>
//       <Steps>
//         <Problem1 getData={getData} index={0} />
//         <Problem2 getData={getData} index={1} />
//       </Steps>
//       <Final>
//         {!completed.includes(false) && <Result>Задание выполнено!</Result>}
//       </Final>
//     </Styles>
//   );
// };

// export default demo;
