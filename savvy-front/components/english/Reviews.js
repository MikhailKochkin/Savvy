import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  /* min-height: 100vh; */
  width: 100vw;
  .custom-shape-divider-top-1626364588 {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  .custom-shape-divider-top-1626364588 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 65px;
  }

  .custom-shape-divider-top-1626364588 .shape-fill {
    fill: #000000;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 4rem;
    font-weight: 600;
    width: 80%;
    line-height: 1.4;
    margin-bottom: 50px;
    span {
      color: #3175f3;
    }
  }
  .parent {
    width: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* grid-column-gap: 20px; */
  }

  .div1 {
    width: 50%;
  }
  .div2 {
    width: 50%;
    margin-bottom: 20px;
  }
  .div3 {
    width: 50%;
  }
  .div4 {
    width: 50%;
  }
  @media (max-width: 800px) {
    h2 {
      font-size: 3.4rem;
      margin-bottom: 30px;
      width: 85%;
    }
    .parent {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 95%;
    }
    .div1 {
      width: 90%;
      margin-bottom: 30px;
    }
    .div2 {
      width: 90%;
      margin-bottom: 30px;
    }
    .div3 {
      width: 90%;
      margin-bottom: 30px;
    }
    .div4 {
      width: 90%;
      margin-bottom: 30px;
    }
  }
`;
const Review = styled.div`
  padding-left: 10%;
  .bubble {
    width: 70%;
    background: #3175f3;
    border-radius: 10px;
    color: #fff;
    /* height: 200px; */
    padding: 3%;
    p {
      margin: 10px 0;
    }
  }
  .author {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid #fff;
    padding-top: 10px;
    margin-top: 10px;
    a {
      transition: ease-in 0.2s;
      &:hover {
        text-decoration: underline;
      }
    }
    img {
      width: 50px;
      border-radius: 50%;
      margin-right: 15px;
      height: 50px;
      object-fit: cover;
    }
  }
  @media (max-width: 800px) {
    padding-left: 0%;
    width: 100%;
    .bubble {
      width: 100%;
      margin-bottom: 20px;
    }
    a {
      font-size: 2rem;
    }
  }
`;

const Reviews = () => {
  return (
    <Styles>
      <div class="custom-shape-divider-top-1626364588">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <h2>Отзывы о программе:</h2>{" "}
      <div class="parent">
        <div class="div1">
          <Review>
            <div className="bubble">
              К окончанию курса у меня сформировался навык структурированного и
              логичного изложения своих мыслей в тексте и документах. Михаил
              всегда на связи, делится инсайтами и отвечает на вопросы. Это
              очень важно и круто. После прохождения курса, невольно возникает
              вопрос, почему я не сделала это раньше?
            </div>
            <div className="author">
              <img src="https://sun9-26.userapi.com/impg/bW8uzC2OgE3N6mQ-UbGADprJjRKIozlD01DDhQ/K9y5nSC4IXM.jpg?size=1344x1792&quality=96&sign=6a0b284d5b394f7bc00e97f044a1a325&type=album" />
              <div>
                <a href="https://vk.com/id89433019" target="_blank">
                  Анастасия Рудановская
                </a>
              </div>
            </div>
          </Review>
        </div>
        <div class="div2">
          {" "}
          <Review>
            <div className="bubble">
              Я искала подходящую образовательную программу для изучения
              английского языка, где обучали бы тому, с чем ты имеешь дело в
              работе. Продвинутый курс legal writing дал мне базу необходимых
              навыков, от которых можно отталкиваться при выполнении рабочих
              задач. Я получила инструменты для составления юридических
              документов и сейчас реализую их на практике.
            </div>
            <div className="author">
              <img src="https://sun9-48.userapi.com/impg/Eetn8cWpPY7rs__wS5FtQ9CRUylgePZ1PKSfPg/GxsQHAjsdHU.jpg?size=1080x1080&quality=96&sign=e9338491a7126108265a09b8469199f9&type=album" />
              <div>
                <a href="https://vk.com/veraglazik" target="_blank">
                  Вера Захарова
                </a>
              </div>
            </div>
          </Review>
        </div>
        <div class="div3">
          <Review>
            <div className="bubble">
              <p>
                Каждый юрист должен пройти курс Михаила Кочкина “Legal English:
                базовый уровень”.
              </p>
              <p>
                Объем информации, с которым сталкивается современный юрист,
                огромен. Как научиться раскладывать эту информацию по полочкам и
                готовить стройные юридические тексты на английском языке? Курс
                позволит вам решить эту проблему.
              </p>
              <p>
                Курс является по своей сути универсальным образовательным
                инструментом. Алгоритм структурирования письменного текста
                одинаков как для английского, так и для русского языков. Поэтому
                вы легко сможете использовать полученные знания не только при
                написании англоязычных текстов, но и при подготовке юридических
                заключений на русском языке.
              </p>
            </div>
            <div className="author">
              <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" />
              <div>
                <a
                  href="https://www.facebook.com/profile.php?id=100011274392064"
                  target="_blank"
                >
                  Павел Евсюков
                </a>
              </div>
            </div>
          </Review>
        </div>
        <div class="div4">
          <Review>
            <div className="bubble">
              <p>
                Решение начать этот курс - одно из самых правильных моих
                решений.
              </p>
              <p>
                Во-первых, он очень мотивирующий и дающий уверенность: ты
                делаешь и у тебя получается. А у тебя точно получится, потому
                что изначально информация даётся очень понятно и доступно, а
                потом, разбирая свои ошибки, запоминаешь все ещё лучше.
              </p>{" "}
              <p>
                Во-вторых, очень легко воспринимать структурированную информацию
                с большим количеством примеров.
              </p>{" "}
              <p>
                В-третьих, если что-то непонятно, всегда можно обратиться с
                вопросом, даже если он не касается самого курса, но касается
                юридического английского или английского в целом.
              </p>
            </div>
            <div className="author">
              <img src="https://sun9-15.userapi.com/impg/Qa7Iq2HVJQSMkBnBbk3H4wZUXyVZN6fPOu9TqA/REW7SpbeV68.jpg?size=1534x2160&quality=96&sign=8cd3260f7c157977cba6654d06c2c046&type=album" />
              <div>
                <a
                  href="https://vk.com/topic-165635789_39227413"
                  target="_blank"
                >
                  Настя Шашкина
                </a>
              </div>
            </div>
          </Review>
        </div>
      </div>
    </Styles>
  );
};

export default Reviews;
