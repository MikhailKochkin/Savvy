import styled from "styled-components";

const Styles = styled.div`
  height: 40vh;
  width: 100vw;
  display: flex;
  background: #91e9e3;
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
const OurGoal = () => {
  return (
    <Styles>
      <div id="header">
        We want to save your employees from video tutorials and tests. Let them
        train real-life skills on real-life tasks!
      </div>
    </Styles>
  );
};

export default OurGoal;
