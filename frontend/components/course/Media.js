import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Icon from "react-icons-kit";
import { instagram } from "react-icons-kit/fa/instagram";
import { graduationCap } from "react-icons-kit/fa/graduationCap";
import { vk } from "react-icons-kit/fa/vk";
import { telegram } from "react-icons-kit/fa/telegram";
import { withTranslation } from "../../i18n";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 3% 0;
  background: #f6f7f7;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .title {
    font-size: 2.2rem;
    width: 70%;
    text-align: center;
    font-weight: bold;
    margin: 30px 0 40px 20px;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  flex-direction: space-between;
  justify-content: space-around;

  flex-wrap: wrap;
  width: 100%;
`;

const Card = styled.div`
  max-width: 295px;
  background: #fff;
  padding: 2%;
  margin-bottom: 3%;
  .title2 {
    font-size: 1.6rem;
    /* font-weight: 800; */
    margin-bottom: 5px;
  }
  a {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-image: linear-gradient(90deg, #02b3e4 0, #02ccba);
  color: white;
  padding: 1%;
  -webkit-transform: skew(-5deg);
  -moz-transform: skew(-5deg);
  -o-transform: skew(-5deg);
  .icon {
    margin-right: 5px;
  }
  span {
    font-size: 1.8rem;
  }
  a {
    color: #fff;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Img = styled.img`
  width: 100%;
  /* max-height: 200px; */
`;

const Media = ({ t }) => {
  return (
    <Styles>
      <Container>
        <div className="title">{t("media")}</div>
        <Block>
          <Card>
            <Header>
              <div className="icon">
                <Icon size={30} icon={graduationCap} />
              </div>
              <span>
                <Link
                  href={{
                    pathname: "/blog",
                  }}
                >
                  <a> Наш блог</a>
                </Link>
              </span>
            </Header>
            <Img src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" />
            <a href="#">
              <div className="title2">
                В блоге мы пишем длинные посты на важные темы про карьеру, право
                и бизнес, в которые добавляем презентации, подкасты и видео.{" "}
              </div>
            </a>
          </Card>
          <Card>
            <Header>
              <div className="icon">
                <Icon size={30} icon={vk} />
              </div>
              <span>
                <a href="https://www.vk.com/besavvylawyer/" target="_blank">
                  /besavvylawyer
                </a>
              </span>
            </Header>
            <Img src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" />
            <a href="https://www.vk.com/besavvylawyer/" target="_blank">
              {" "}
              <div className="title2">
                В ВК выкладываем авторские посты, подборки полезных материалов
                по праву и английскому, а также и делаем анонсы новых проектов!
              </div>
            </a>
          </Card>
          <Card>
            <Header>
              <div className="icon">
                <Icon size={30} icon={instagram} />
              </div>
              <span>
                <a
                  href="https://www.instagram.com/besavvylawyer/"
                  target="_blank"
                >
                  @besavvylawyer
                </a>
              </span>
            </Header>
            <Img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" />
            <a href="https://www.instagram.com/besavvylawyer/" target="_blank">
              <div className="title2">
                В инстаграме мы стараемся делиться мыслями экспертов и
                интересных людей. А также любим отвечать там на ваши вопросы!
              </div>
            </a>
          </Card>
          <Card>
            <Header>
              <div className="icon">
                <Icon size={30} icon={telegram} />
              </div>
              <span>
                <a href="https://t.me/BeSavvyLawyer" target="_blank">
                  @besavvylawyer
                </a>
              </span>
            </Header>
            <Img src="https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" />
            <a href="https://t.me/BeSavvyLawyer" target="_blank">
              <div className="title2">
                В телеграм мы скидываем ссылки на актуальные статьи и новости, а
                также там делимся собственным мнением о происходящих событиях.
              </div>
            </a>
          </Card>
        </Block>
      </Container>
    </Styles>
  );
};

export default withTranslation("search")(Media);
// export default Media;
