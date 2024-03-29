import styled from "styled-components";
const Styles = styled.div`
  min-height: 70vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  .header {
    font-size: 2.6rem;
    font-weight: 500;
    line-height: 1.4;
    width: 90%;
    text-align: left;
    margin-bottom: 50px;
  }
  @media (max-width: 800px) {
    height: 100%;
    padding-bottom: 50px;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: space-between;
  margin: 40px 0;
`;

const Icon = styled.div`
  height: 200px;
  width: 160px;
  background: #162b4b;
  margin-right: 40px;
  margin-bottom: 20px;
`;

const Partners = () => {
  return (
    <Styles>
      {" "}
      <div className="header">Партнеры программы:</div>
      <Group>
        <Icon></Icon>
        <Icon></Icon>
        <Icon></Icon>
        <Icon></Icon>
      </Group>
    </Styles>
  );
};

export default Partners;
