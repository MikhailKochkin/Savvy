import { useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  min-height: 200px;
  width: 100%;
  background: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 5%;
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

const OurCalculator = (props) => {
  const [employees, setEmployees] = useState(0);
  const [courses, setCourses] = useState(0);
  const [plan, setPlan] = useState(8);
  return (
    <div>
      <Box>
        <div className="row">
          <div className="data">
            <div className="text_area">
              <div>№ of courses</div>
            </div>
            <div className="input_area">
              <input
                type="number"
                defaultValue={courses}
                onChange={(e) => setCourses(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="data">
            <div className="text_area">
              <div>№ of employees on one course</div>
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
              <div>Your plan</div>
            </div>
            <select
              defaultValue={plan}
              onChange={(e) => setPlan(e.target.value)}
            >
              <option value={8}>Basic</option>
              <option value={15}>Business</option>
            </select>
          </div>
        </div>
        {/* {console.log(isNaN(salary * hours * employees))} */}
        <div className="sum">
          = up to{" "}
          {isNaN(employees * courses * plan)
            ? "..."
            : new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(employees * courses * plan)}{" "}
          Euros / month + 10 hours of your senior employees
        </div>
      </Box>
    </div>
  );
};

export default OurCalculator;
