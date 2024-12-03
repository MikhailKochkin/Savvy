import styled from "styled-components";

export const EditorInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  .label {
    font-weight: 600;
    margin: 5px 0;
    margin-bottom: 0px;
  }
  .comment {
    color: #b0b0b0;
    font-size: 1.2rem;
    margin-bottom: 15px;
    line-height: 1.4;
  }
  input {
    width: 90%;
    border: 2px solid #dddddd;
    border-radius: 5px;
    height: 40px;
    padding: 10px;
    font-family: Montserrat;
    font-weight: 500;
    margin-bottom: 15px;
    font-size: 1.4rem;
    outline: 0;
  }
  textarea {
    width: 90%;
    border: 2px solid #dddddd;
    border-radius: 5px;
    height: 60px;
    padding: 10px;
    font-family: Montserrat;
    font-weight: 500;
    margin-bottom: 15px;
    font-size: 1.4rem;
    outline: 0;
    line-height: 1.5;
  }
  select {
    width: 90%;
    border: 2px solid #dddddd;
    border-radius: 5px;
    height: 40px;
    padding: 5px 10px;
    font-family: Montserrat;
    font-weight: 500;
    margin-bottom: 15px;
    font-size: 1.4rem;
    outline: 0;
    line-height: 1.5;
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
  }
`;

export const NameInput = styled.input`
  width: 100%;
  border: 2px solid #dddddd;
  border-radius: 5px;
  height: 40px;
  padding: 5px;
  font-family: Montserrat;
  font-weight: 500;
  margin-bottom: 15px;
  font-size: 1.4rem;
  outline: 0;
`;

export const SimpleButton = styled.button`
  border: none;
  background: none;
  padding: 10px 20px;
  border: 2px solid #69696a;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  cursor: pointer;
  width: 120px;
  margin-right: 10px;
  margin-bottom: 20px;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

export const BlueButton = styled.button`
  width: 180px;
  background: #3b5bb3;
  font-size: 1.6rem;
  font-weight: 500;
  color: #fff;
  border: 1px solid #3b5bb3;
  font-family: Montserrat;
  outline: 0;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
  transition: 0.3s ease-in;
  cursor: pointer;
  &:hover {
    border: 1px solid #283d78;
    background: #283d78;
  }
`;
