import { useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  height: 90vh;
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
`;

const Box = styled.div`
  height: 40%;
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
    width: 30%;
    font-weight: bold;
  }
  .text_area {
    display: flex;
    width: 60%;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    font-size: 1.4rem;
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
`;

const Calculator = () => {
  const [employees, setEmployees] = useState(0);
  const [salary, setSalary] = useState(0);
  const [hours, setHours] = useState(0);
  return (
    <Styles>
      <div id="header">
        This is how much you spend on training a white-collar employee
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
              <div>avg salary before taxes</div>
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
              <div>hours of seniors spent</div>
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
              }).format(salary * hours * employees)}{" "}
          Euros / month
        </div>
      </Box>
    </Styles>
  );
};

export default Calculator;
