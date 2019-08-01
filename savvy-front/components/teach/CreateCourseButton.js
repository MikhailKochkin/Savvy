import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";

const CreateCourseStyles = styled.div`
  padding: 2%;
  flex-basis: 50%;
  height: 250px;
  margin-right: 2%;
  background: white;
  @media (max-width: 800px) {
    margin-right: 0%;
    margin-bottom: 2%;
  }
`;

const Title = styled.p`
  font-size: ${props => (props.primary ? "2.6rem" : "1.6rem")};
  margin-top: 0;
  margin-bottom: ${props => (props.primary ? "3%" : "1%")};
`;

const Button = styled.button`
  margin-top: 1%;
  padding: 2% 2%;
  font-size: 1.6rem;
  background: #4dac44;
  color: white;
  border: none;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  &:hover {
    background: #006400;
  }
  a {
    color: white;
  }
`;

class CreateCourseButton extends Component {
  render() {
    const { isPaid } = this.props;
    return (
      <CreateCourseStyles>
        {isPaid === true && (
          <>
            <Title primary>Создайте новый курс</Title>
            <Title>
              Только созданные курсы находятся в режиме "в разработке" и не
              появляются на первой странице сайта до их опубликования.
            </Title>
            <Link prefetch href="/create">
              <Button>
                <a>Создать курс</a>
              </Button>
            </Link>
          </>
        )}
        {isPaid === false && (
          <>
            <Title primary>У нас возникла проблема... </Title>
            <Title>
              Вы израсходовали лимит создания новых курсов или не оплатили новый
              месяц. Пожалуйста, проведите оплату, чтобы вернуть себе
              возможность создавать и вести курсы.
            </Title>
          </>
        )}
      </CreateCourseStyles>
    );
  }
}

export default CreateCourseButton;
