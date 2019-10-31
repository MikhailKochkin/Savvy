import React, { Component } from "react";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import dynamic from "next/dynamic";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import CareerCoursesList from "./courseLists/CareerCoursesList";
import ForMoneyCoursesList from "./courseLists/ForMoneyCoursesList";
import FreeCoursesList from "./courseLists/FreeCoursesList";
import Vacancies from "./courseLists/Vacancies";
import Articles from "../article/Articles";
import Landing from "./Landing";
import User from "../User";

const Container = styled.div`
  padding: 2% 4%;
  border: none;
`;

const DynamicTour = dynamic(import("reactour"), {
  ssr: false
});

class Courses extends Component {
  state = {
    width: 1,
    height: 1,
    isTourOpen: false,
    times: 0,
    page: "register"
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

  myCallback = data => {
    this.setState({
      isTourOpen: true
    });
  };

  render() {
    const steps = [
      // {
      //   selector: '[data-tut="zero-step"]',
      //   content: function DemoHelperComponent0() {
      //     return (
      //       <>
      //         <p>Можно рассказать вам, как работает Savvvy.app?</p>
      //       </>
      //     );
      //   }
      // },
      // {
      //   selector: '[data-tut="first-step"]',
      //   content: function DemoHelperComponent1() {
      //     return (
      //       <>
      //         <p>
      //           При регистрации вы выбираете <b>карьерный трек</b>.
      //         </p>
      //         <div>
      //           Карьерный трек – это пошаговый план по развитию в одной из
      //           юридических отраслей. Он подскажет, какие темы вам необходимо
      //           изучить, где получить знания и с помощью каких курсов развить
      //           практические навыки.
      //         </div>
      //       </>
      //     );
      //   }
      // },
      {
        selector: '[data-tut="first-step"]',
        content: function DemoHelperComponent1() {
          return (
            <>
              <p>Всегда трудно найти курсы.</p>
              <div>
                Карьерный трек – это пошаговый план по развитию в одной из
                юридических отраслей. Он подскажет, какие темы вам необходимо
                изучить, где получить знания и с помощью каких курсов развить
                практические навыки.
              </div>
            </>
          );
        }
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
        }
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
                университетов можно попасть с помощью специальной вкладки
                "Курсы" на верху страницы.
              </div>
            </>
          );
        }
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
        }
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
                возможности для совершенствования юрижических навыков.
              </div>
            </>
          );
        }
      }
    ];
    const disableBody = target => disableBodyScroll(target);
    const enableBody = target => enableBodyScroll(target);
    return (
      <User>
        {({ data: { me } }) => (
          <Container>
            <Landing getTour={this.myCallback} />
            {/* {me && me.careerTrackID && <CareerTrackMenu me={me} />} */}
            <Vacancies me={me} />
            {me && me.careerTrackID && <CareerCoursesList me={me} />}
            <ForMoneyCoursesList me={me} />
            <FreeCoursesList me={me} />
            <Articles me={me} />
            <DynamicTour
              onAfterOpen={this.state.width > 600 ? disableBody : null}
              onBeforeClose={this.state.width > 600 ? enableBody : null}
              disableDotsNavigation={false}
              steps={steps}
              isOpen={this.state.isTourOpen}
              onRequestClose={this.closeTour}
              closeWithMask={true}
            />
          </Container>
        )}
      </User>
    );
  }
}

export default Courses;
