import styled from "styled-components";

export const NanoButton = styled.button`
  background-color: white;
  color: #333;
  border: 1px solid #e8e8e8;
  padding: 4px 6px;
  font-size: 8px;
  border-radius: 8px;
  font-family: Montserrat;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 20px;
  max-width: 140px;
  max-height: 20px;
  &:hover {
    background-color: #f2f2f2;
  }
`;

export const MicroButton = styled.button`
  background-color: white;
  color: #333;
  border: 1px solid #e8e8e8;
  padding: 6px 8px;
  font-size: 12px;
  border-radius: 12px;
  font-family: Montserrat;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 30px;
  max-width: 140px;
  margin-right: 10px;
  max-height: 50px;
  &:hover {
    background-color: #f2f2f2;
  }
`;

export const SecondaryButton = styled.button`
  background-color: white;
  color: #333;
  border: 1px solid #e8e8e8;
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 12px;
  font-family: Montserrat;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 140px;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const SecondaryMenuButton = styled.button`
  background-color: white;
  color: #333;
  border: ${(props) =>
    props.active ? "2px solid #2274A5" : "1px solid #e8e8e8"};
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 12px;
  font-family: Montserrat;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin-right: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  &:hover {
    background-color: #f2f2f2;
  }
`;

export const PrimaryButton = styled.button`
  background-color: #141416;
  color: white;
  border: none;
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 12px;
  font-family: Montserrat;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2d2d31;
  }
`;

export const ActionButton = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  max-height: 40px;
  border: 2px solid #3f51b5;
  border-radius: 12px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin: 5px 0;
  margin-right: 10px;
  transition: 0.3s;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

export const OrangeButton = styled.button`
  background-color: #e75605;
  color: white;
  border-radius: 12px;
  border: 2px solid #e75605;
  width: 140px;
  font-family: Montserrat;
  font-weight: 500;
  padding: 10px 0;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #d15005;
    border: 2px solid #d15005;
    color: white;
  }
`;

export const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0;
  margin-bottom: 20px;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 15px;
  input,
  textarea {
    padding: 10px;
    width: 100%;
    outline: 0;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    font-size: 1.4rem;
    font-family: Montserrat;
    resize: none;
    margin-bottom: 10px;
  }
  select {
    width: 100%;
    font-size: 1.4rem;
    outline: none;
    font-family: Montserrat;
    line-height: 1.3;
    padding: 10px;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
    margin-bottom: 10px;
  }
  .description {
    width: 25%;
    min-height: 40px;
    line-height: 1.4;
    font-weight: 600;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .action_area {
    width: 75%;
    margin-left: 15px;
    .multilevel_fields {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      margin-bottom: 10px;
      textarea {
        margin: 0;
      }
      .mainfield {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
      }
      .subfield {
        width: 90%;
        margin-left: 10%;
      }
    }
    .element_info {
      font-size: 1.4rem;
      height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
    .explainer {
      font-size: 1.2rem;
      color: #b0b0b0;
      margin-top: 5px;
      line-height: 1.4;
    }
    .green {
      border: 2px solid #6a994e;
    }
  }
`;

export const Frame = styled.div`
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 6px;
  font-size: 1.6rem;
  outline: 0;
  p {
    margin: 0;
    margin-bottom: 5px;
  }
`;

export const SettingsBlock = styled.div`
  width: 640px;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  justify-content: flex-start;
  gap: ${(props) => (props.gap ? props.gap : "20px")};
  margin: ${(props) => (props.margin ? props.margin : "0 20px")};
`;
