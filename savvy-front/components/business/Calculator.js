import { useState } from "react";
import styled from "styled-components";
// import { withTranslation } from "../../i18n";

const Divider1 = styled.div``;

const Styles = styled.div`
  min-height: 80vh;
  width: 100vw;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #header {
    width: 80%;
    font-size: 2.8rem;
    margin: 3% 0;
    text-align: left;
    line-height: 4rem;
    #header_text {
      width: 70%;
      font-weight: bold;
    }
    .animated {
      text-indent: 8px;
      border-bottom: 5px solid #91e9e2;
      /* color: red; */
      /* transition: all 0,s; */
    }

    .animated:before {
      content: "lawyers";
      opacity: 0;
      animation: topToBottom 26s infinite 0s;
    }

    @keyframes topToBottom {
      0% {
        opacity: 0;
        content: "lawyers";
      }
      7% {
        opacity: 1;
        content: "lawyers";
      }
      14% {
        opacity: 0;
        content: "lawyers";
      }
      21% {
        opacity: 0;
        content: "bankers";
      }
      28% {
        opacity: 1;
        content: "bankers";
      }
      35% {
        opacity: 0;
        content: "bankers";
      }
      42% {
        opacity: 0;
        content: "consultants";
      }
      49% {
        opacity: 1;
        content: "consultants";
      }
      56% {
        opacity: 0;
        content: "consultants";
      }
      63% {
        opacity: 0;
        content: "accountants";
      }
      70% {
        opacity: 1;
        content: "accountants";
      }
      77% {
        opacity: 0;
        content: "accountants";
      }
      84% {
        opacity: 0;
        content: "managers";
      }
      91% {
        opacity: 1;
        content: "managers";
      }
      98% {
        opacity: 0;
        content: "managers";
      }
    }
  }
  @media (max-width: 800px) {
    height: auto;
    padding-top: 20px;
    #header {
      width: 80%;
      font-size: 2.2rem;
      font-weight: bold;
      text-align: center;
      #header_text {
        width: 100%;
      }
    }
  }
`;

const Box = styled.div`
  height: 250px;
  width: 80%;
  background: white;
  border-radius: 6px;
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  .row {
    width: 90%;
    height: 30%;
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    justify-content: flex-start;
  }
  .data {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-right: 20px;
  }
  .text_area {
    display: flex;
    /* margin-left: 15px; */
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
    font-size: 2.2rem;
  }
  .arrow_area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin-left: 15px;
    font-size: 2.2rem;
  }
  .input_area {
    display: flex;
    /* width: 200px; */
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  input {
    margin-left: 15px;
    outline: none;
    font-family: Montserrat;
    padding: 3%;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    height: 60%;
    font-size: 2.2rem;
    text-align: center;
    width: 100px;
  }
  .sum {
    width: 35%;
    padding-left: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    font-size: 2.2rem;
    /* font-weight: bold; */
    span {
      color: #91e9e3;
    }
    /* border-top: 3px solid #91e9e3; */
  }
  .explainer {
    width: 100%;
    border-top: 2px solid #91e9e2;
    padding-top: 10px;
  }
  @media (max-width: 800px) {
    height: auto;
    margin: 20px 0;
    align-items: center;
    padding: 10px 10px;

    .row {
      width: 90%;
      height: 30%;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      margin-bottom: 15px;
    }
    .arrow_area {
      margin: 0;
    }
    input {
      margin: 10px 0;
    }
    .data {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      margin-bottom: 10px;
    }
    .text_area {
      text-align: left;
    }
    .data {
      width: 90%;
    }
    .sum {
      font-size: 1.8rem;
    }
  }
`;

const Explainer = styled.div`
  margin: 20px 0;
  width: 80%;
  font-size: 2rem;
`;

const Calculator = (props) => {
  const [employees, setEmployees] = useState(30);
  const [salary, setSalary] = useState(42000);
  const [hours, setHours] = useState(120);
  const [days, setDays] = useState(14);
  return (
    <>
      <Styles>
        <div id="header">
          {/* <div id="header_text">{props.t("calulator_header")}</div> */}
          {/* <span className="animated"></span>{" "} */}
        </div>
        <Box>
          <div className="row">
            <div className="data">
              <div className="text_area">
                {/* <div> {props.t("calulator_number_employees")}</div> */}
              </div>
              <div className="input_area">
                <input
                  type="number"
                  defaultValue={employees}
                  onChange={(e) => setEmployees(parseInt(e.target.value))}
                />
              </div>
              <div className="arrow_area">➡️</div>
            </div>
            <div className="sum">
              {" "}
              {isNaN(salary * hours * employees)
                ? "..."
                : new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "RUB",
                  }).format(
                    0.6 * employees * (((80000 * 12) / 1920) * 224) +
                      0.4 * employees * (((240000 * 12) / 1920) * 224)
                    // employees * ((salary / 1920) * days * 8) +
                    //   ((salary * 3) / 1920) * hours
                  )}{" "}
              в год
            </div>

            {/* <div className="data">
            <div className="text_area">
              <div>{props.t("calulator_number_days")}</div>
            </div>
            <div className="input_area">
              <input
                type="number"
                defaultValue={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="data">
            <div className="text_area">
              <div>{props.t("calulator_salary")}</div>
            </div>
            <div className="input_area">
              <input
                type="number"
                defaultValue={salary}
                onChange={(e) => setSalary(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="data">
            <div className="text_area">
              <div>{props.t("calulator_hours_seniors")}</div>
            </div>
            <div className="input_area">
              <input
                type="number"
                defaultValue={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
              />
            </div>
          </div>*/}
          </div>
          <div className="explainer">
            <div>Эта цифра складывается из:</div>
            <ul>
              <li>Времени младших сотрудников, которое уходит на обучение</li>
              <li>
                Времени старших юристов, которое уходит на проведение внутренних
                мероприятий
              </li>
              <li>
                Времени старших юристов, которое уходит на индивидуальную работу
                с младшими
              </li>
            </ul>
          </div>
        </Box>
      </Styles>
    </>
  );
};

// export default withTranslation("business")(Calculator);
export default Calculator;
