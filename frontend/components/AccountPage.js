import { useState } from "react";
import styled from "styled-components";
import { useUser } from "./User";
import Account from "./Account";
import PleaseSignIn from "./auth/PleaseSignIn";

const Styles = styled.div`
  display: flex;
  margin: 3% 0;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  @media (max-width: 800px) {
    width: 95%;
    flex-direction: column;
  }
`;

const Menu = styled.div`
  flex: 15%;
  padding: 2%;
  div {
    font-size: 1.6rem;
    margin-bottom: 13px;
    cursor: pointer;
    padding-right: 15px;
    border-right: 1px solid white;
    &:hover {
      border-right: 1px solid #112a62;
    }
  }
  @media (max-width: 800px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    div {
      &:hover {
        border-right: 1px solid white;
        border-bottom: 1px solid #112a62;
      }
    }
  }
`;

const Data = styled.div`
  flex: 85%;
`;

const AccountPage = (props) => {
  const [page, setPage] = useState("account");
  const me = useUser();
  return (
    <PleaseSignIn>
      <Styles>
        <Container>
          <Menu>
            <div name="account">Аккаунт</div>
          </Menu>
          <Data>
            {page === "account" && me && <Account me={me} id={props.id} />}
          </Data>
        </Container>
      </Styles>
    </PleaseSignIn>
  );
};

export default AccountPage;
