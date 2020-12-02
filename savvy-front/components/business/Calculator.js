import { useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  height: 60vh;
  width: 100vw;
  background: #f3f0ea;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  #header {
    width: 80%;
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 3%;
    text-align: center;
  }
  @media (max-width: 800px) {
    height: auto;
    padding-top: 20px;
    #header {
      width: 80%;
      font-size: 2.2rem;
      font-weight: bold;
      text-align: center;
    }
  }
`;

const Box = styled.div`
  height: 50%;
  width: 80%;
  background: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .row {
    width: 90%;
    height: 30%;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    margin-bottom: 15px;
  }
  .data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 25%;
    font-weight: bold;
    margin-right: 20px;
  }
  .text_area {
    display: flex;
    width: 60%;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
    font-size: 1.2rem;
  }
  .input_area {
    display: flex;
    width: 40%;
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
    text-align: center;
  }
  .sum {
    width: 90%;
    padding-left: 1%;
    padding-top: 3%;
    font-size: 2.2rem;
    font-weight: bold;
    border-top: 3px solid #91e9e3;
  }
  @media (max-width: 800px) {
    height: auto;
    margin: 20px 0;
    .row {
      width: 90%;
      height: 30%;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: space-around;
      margin-bottom: 15px;
    }
    .data {
      height: 45px;
      /* background: yellow; */
      margin-bottom: 10px;
    }
    .text_area {
      /* width: 60%; */
      text-align: left;
      font-size: 1.3rem;
    }
    .data {
      width: 90%;
    }
    .sum {
      font-size: 1.8rem;
    }
  }
`;

const Calculator = () => {
  const [employees, setEmployees] = useState(50);
  const [salary, setSalary] = useState(42000);
  const [hours, setHours] = useState(120);
  const [days, setDays] = useState(14);
  return (
    <Styles>
      <div id="header">
        This is how much you spend on training white-collar employees now
      </div>
      <Box>
        <div className="row">
          <div className="data">
            <div className="text_area">
              <div>№ of employees a year</div>
            </div>
            <div className="input_area">
              <input
                type="number"
                defaultValue={employees}
                onChange={(e) => setEmployees(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="data">
            <div className="text_area">
              <div>№ of days spent on learning in a year</div>
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
              <div>Average salary before taxes</div>
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
              <div>Hours of seniors spent in a year</div>
            </div>
            <div className="input_area">
              <input
                type="number"
                defaultValue={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
        {console.log(isNaN(salary * hours * employees))}
        <div className="sum">
          = up to{" "}
          {isNaN(salary * hours * employees)
            ? "..."
            : new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(
                employees * ((salary / 1920) * days * 8) +
                  ((salary * 3) / 1920) * hours
              )}{" "}
          Euros / month
        </div>
      </Box>
    </Styles>
  );
};

export default Calculator;
