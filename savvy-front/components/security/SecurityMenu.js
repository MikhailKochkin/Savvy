import { useState } from "react";
import styled from "styled-components";
import SecurityOverView from "./SecurityOverView";
import SecurityQuestions from "./SecurityQuestions";

const MenuStyles = styled.div`
  width: 70%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .menu_content {
    margin-top: 40px;
  }
  @media (max-width: 900px) {
    width: 95%;
    .menu_content {
      margin-top: 0px;
    }
  }
`;

const MenuBar = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid #e0e0e0;
`;

const MenuOption = styled.div`
  border-bottom: 2px solid;
  border-color: ${(props) => (props.active ? "#7F357B" : "transparent")};
  margin-bottom: -2px;
  margin-right: 30px;
  transition: ease 0.2s;
  cursor: pointer;
`;

const SecurityMenu = () => {
  const [menuOption, setMenuOption] = useState("overview");

  return (
    <MenuStyles>
      <MenuBar>
        <MenuOption active={menuOption == "overview"}>
          <a onClick={() => setMenuOption("overview")}>Overview</a>
        </MenuOption>
        <MenuOption active={menuOption == "faq"}>
          <a onClick={() => setMenuOption("faq")}>FAQ</a>
        </MenuOption>
      </MenuBar>
      <div className="menu_content">
        {menuOption === "overview" && <SecurityOverView />}
        {menuOption === "faq" && <SecurityQuestions />}
      </div>
    </MenuStyles>
  );
};

export default SecurityMenu;
