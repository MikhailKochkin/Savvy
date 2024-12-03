import styled from "styled-components";

export const WindowColumn = styled.div`
  height: 100%;
  position: sticky;
  top: 10%;
`;

export const WindowBundle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  top: 15%;
  position: sticky;
`;

export const Window = styled.div`
  margin-left: -10px;
  margin-bottom: 20px;
  min-height: 80px;
  border-radius: 10px;
  width: 320px;
  line-height: 1.4;
  background: rgb(255, 255, 255);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  box-shadow: 0px 0px 3px 0px rgba(199, 199, 199, 1);
  transition: opacity 0.3s ease-in-out; // Transition effect
  opacity: 1; // Active opacity
  visibility: visible; // Active visibility
  flex-direction: row;
  flex-wrap: wrap;
  border-top: 1px solid #f3f3f3;
  padding: 10px 15px;
  button {
    background-color: #d2edfd;
    color: #000a60;
    border-radius: 4px;
    border: none;
    box-shadow: none;
    box-sizing: border-box;
    font-family: Montserrat;
    font-weight: 500;
    font-size: 14px;
    /* height: 24px; */
    padding: 8px 15px;
    margin-right: 10px;
    margin-bottom: 10px;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      box-shadow: rgb(66 133 244 / 15%) 0px 1px 3px 1px;
      background-color: #a4dbfe;
    }
  }

  .questionBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    .icon {
      border-radius: 50%;
      height: 40px;
      width: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .nameBlock {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .name {
      margin-left: 8px;
    }

    .cancelBlock {
      height: 100%;
      transition: 0.5s;
      border-radius: 50%;
      padding: 1%;
      cursor: pointer;
      &:hover {
        background: #ecf5fe;
      }
    }
    .cancel {
      margin: 5px;
      height: 15px;
      width: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
  .studentsWording {
    width: 100%;
    margin: 10px 0;
    .studentsWordingHeader {
      margin-bottom: 5px;
    }
  }
`;

export const IconBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  width: 100%;
  margin: 5px 0;
`;

export const Progress2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 10px;
`;
