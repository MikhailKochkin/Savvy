import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import ReactResizeDetector from "react-resize-detector";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import dynamic from "next/dynamic";
import { useUser } from "./User";
import LandingCareerTrack from "./LandingCareerTrack";
import LandingRegister from "./auth/LandingRegister";
import LandingLogIn from "./auth/LandingLogIn";

const Image = styled.div`
  background: black;
  content: url("../static/amsterdam.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Nav = styled.div`
  position: absolute;
  top: 5%;
  left: 60%;
  width: 30%;
  display: flex;
  font-size: 2rem;
  color: black;
  flex-direction: row;
  justify-content: space-between;
  a {
    color: white;
    cursor: pointer;
    padding-bottom: 25px;
    &:hover {
      border-bottom: 2px solid white;
    }
  }
  @media (max-width: 1300px) {
    width: 32%;
    left: 55%;
  }
  @media (max-width: 1000px) {
    top: 3%;
    left: 0%;
    width: 100%;
    justify-content: flex-end;
    padding-right: 5%;
    font-weight: bold;
    color: black;
    span {
      cursor: pointer;
    }
  }
`;

const Logo = styled.p`
  font-size: 2rem;
  color: white;
  font-weight: 600;
  position: absolute;
  padding: 0;
  top: 5%;
  left: 5%;
  margin: 0;
  @media (max-width: 1000px) {
    top: 3%;
  }
`;

const FYI = styled.div`
  width: 100vw;
  height: 100vh;
`;

const NavButton = styled.div`
  background: none;
  color: #112a62;
  border: 1px solid #112a62;
  border-radius: 5px;
  text-align: center;
  width: 12%;
  padding: 0.5% 0.5%;
  margin: 2% 0% 0% 4%;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    background: #112a62;
    color: white;
  }
  @media (max-width: 1000px) {
    width: 50%;
  }
`;

const DynamicTour = dynamic(import("reactour"), {
  ssr: false,
});

class LandingPage extends Component {
  state = {
    width: 1,
    height: 1,
    isTourOpen: false,
    times: 0,
    page: "register",
  };

  onResize = (width, height) => {
    this.setState({ width, height });
  };

  open = () => {
    this.setState({ isTourOpen: true });
  };
  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  onSwitch = (e) => {
    const page = e.target.getAttribute("name");
    this.setState({ page });
  };

  onScroll = (e) => {
    e.target.scrollingElement.scrollHeight /
      e.target.scrollingElement.scrollTop <
    7
      ? this.setState((prevState) => ({
          times: prevState.times + 1,
        }))
      : null;

    if (this.state.times === 1) {
      this.setState({ isTourOpen: true });
      this.setState((prevState) => ({
        times: prevState.times + 1,
      }));
    }
  };

  componentDidMount() {
    document.addEventListener("scroll", this.onScroll);
  }

  render() {
    const steps = [
      {
        selector: '[data-tut="zero-step"]',
        content: function DemoHelperComponent0() {
          return (
            <>
              <p>Можно рассказать вам, как работает Savvy.app?</p>
            </>
          );
        },
      },
      {
        selector: '[data-tut="first-step"]',
        content: function DemoHelperComponent1() {
          return (
            <>
              <p>
                При регистрации вы выбираете <b>карьерный трек</b>.
              </p>
              <div>
                Карьерный трек – это пошаговый план по развитию в одной из
                юридических отраслей. Он подскажет, какие темы вам необходимо
                изучить, где получить знания и с помощью каких курсов развить
                практические навыки.
              </div>
            </>
          );
        },
      },
      {
        selector: '[data-tut="second-step"]',
        content: function DemoHelperComponent2() {
          return (
            <>
              <p>
                Неотъемлемой частью каждого карьерного трека являются{" "}
                <b>курсы</b>.
              </p>
              <div>
                Большинство курсов – платные. Стоимость курса обычно варьируется
                от 1800 до 3600 рублей. Каждый курс направлен на оттачивание
                практических навыков юристов. Для этого мы постоянно
                разрабатываем новые онлайн тренажеры и привлекаем крутых
                специалистов для создания курсов.
              </div>
            </>
          );
        },
      },
      {
        selector: '[data-tut="third-step"]',
        content: function DemoHelperComponent3() {
          return (
            <>
              <p>
                Тем не менее, есть и <b>бесплатные курсы</b>, которые создают
                наши партнеры или университеты.
              </p>
              <div>
                Для доступа к бесплатным курсам достаточно на них
                зарегистрироваться. На курс университета необходимо отправить
                заявку, которая должна быть одобрена преподавателем. К курсам
                университетов можно попасть с помощью специальной вкладки "Курсы
                вузов и сообществ" в меню.
              </div>
            </>
          );
        },
      },
      {
        selector: '[data-tut="fourth-step"]',
        content: function DemoHelperComponent4() {
          return (
            <>
              <p>
                Читайте наши <b>статьи</b>!
              </p>
              <div>
                В статьях даются практические рекомендации по развитию карьеры и
                ссылки на скачивание материалов, которые мы готовим специально
                для вас.
              </div>
            </>
          );
        },
      },
      {
        selector: '[data-tut="fifth-step"]',
        content: function DemoHelperComponent5() {
          return (
            <>
              <p>
                Чтобы получить доступ к персонализированным карьерным трекам,
                курсам и статьям, надо зарегистрироваться!
              </p>
              <div>
                Если у вас уже есть аккаунт, войдите в него. Мы дадим вам новые
                возможности для совершенствования юридических навыков.
              </div>
            </>
          );
        },
      },
    ];
    const disableBody = (target) => disableBodyScroll(target);
    const enableBody = (target) => enableBodyScroll(target);
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <ReactResizeDetector
              handleWidth
              handleHeight
              onResize={this.onResize}
            />
            <Logo>BeSavvy</Logo>
            <Nav>
              {!me && this.state.page === "register" && (
                <span>
                  <a onClick={this.onSwitch} name="login">
                    Войти
                  </a>
                </span>
              )}
              {!me && this.state.page === "login" && (
                <span>
                  <a onClick={this.onSwitch} name="register">
                    Регистрация
                  </a>
                </span>
              )}
              {me && (
                <span>
                  <Link href="/courses">
                    <a>Курсы</a>
                  </Link>
                </span>
              )}
              {this.state.height > 1000 && me && me.status === "AUTHOR" && (
                <span>
                  <Link href="/educator">
                    <a>Кабинет</a>
                  </Link>
                </span>
              )}
              {this.state.width > 1000 && me && me.status === "SAVVY_AUTHOR" && (
                <span>
                  <Link href="/educator">
                    <a>Кабинет</a>
                  </Link>
                </span>
              )}
              {this.state.width > 1000 && (
                <span>
                  <a href="mailto:mi.kochkin@ya.ru?cc=valvin2000@ya.ru&subject=Проблема%20с%20сайтом">
                    Поддержка
                  </a>
                </span>
              )}
            </Nav>
            {this.state.page === "login" && <LandingLogIn />}
            {this.state.page === "register" && <LandingRegister />}
            <Image />
            <FYI>
              <NavButton onClick={this.open} data-tut="zero-step">
                Тур по BeSavvy.app
              </NavButton>
              <LandingCareerTrack width={this.state.width} />
            </FYI>
            <DynamicTour
              onAfterOpen={this.state.width > 600 ? disableBody : null}
              onBeforeClose={this.state.width > 600 ? enableBody : null}
              disableDotsNavigation={false}
              steps={steps}
              isOpen={this.state.isTourOpen}
              onRequestClose={this.closeTour}
              closeWithMask={true}
            />
          </>
        )}
      </User>
    );
  }
}

export default LandingPage;
