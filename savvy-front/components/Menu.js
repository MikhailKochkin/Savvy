import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";

const MenuStyle = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-bottom: 1px solid #e5e5e5;
  padding-left: 4%;
  padding-right: 4%;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Box = styled.div`
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 1.6rem;
  padding: 3px 10px;
  margin: 1% 1%;
  cursor: pointer;
  &:hover {
    border: 1px solid #112a62;
  }
`;

class Menu extends Component {
  render() {
    return (
      <MenuStyle>
        <Box>
          <Link
            href={{
              pathname: "/courses"
            }}
          >
            <a>Курсы по карьерным трекам</a>
          </Link>
        </Box>
        <Box>
          <Link
            href={{
              pathname: "/communities"
            }}
          >
            <a>Курсы вузов и сообществ</a>
          </Link>
        </Box>
        <Box>
          <Link
            href={{
              pathname: "/challenges"
            }}
          >
            <a>Испытания</a>
          </Link>
        </Box>
      </MenuStyle>
    );
  }
}

export default Menu;
