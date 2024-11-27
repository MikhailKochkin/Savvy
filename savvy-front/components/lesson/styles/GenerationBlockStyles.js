import styled from "styled-components";

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 0;
  padding-bottom: 20px;
  button {
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 25px;
    margin-right: 15px;
    padding: 15px 20px;
    cursor: pointer;
    background: none;
    font-size: 1.2rem;
    font-family: Montserrat;
  }
`;

export const Textarea = styled.textarea`
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  min-height: 50px;
  width: 100%;
  font-family: Montserrat;
  font-size: 1.4rem;
  outline: 0;
  padding: 10px;
  margin-bottom: 5px;
`;

export const AIBlock = styled.div`
  width: 640px;
`;
