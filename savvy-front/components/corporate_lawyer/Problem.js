import styled from "styled-components";

const Styles = styled.div`
  height: 100vh;
  width: 100vw;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    height: 100%;
    padding: 50px 0;

    flex-direction: column;
    height: auto;
    flex-wrap: nowrap;
  }
`;

const Text = styled.div`
  flex-basis: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  div {
    width: 60%;
    .header {
      font-size: 2.6rem;
      font-weight: bold;
      width: 100%;
      line-height: 1.4;
    }
    #no {
      border-bottom: 2px solid #fe7059;
    }
  }
  @media (max-width: 800px) {
    height: 100%;
    font-size: 1.8rem;
    .header {
      margin-bottom: 15px;
    }
    div {
      width: 90%;
    }
  }
`;

const Image = styled.div`
  flex-basis: 40%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  img {
    object-fit: cover;
    height: 100%;
  }
  @media (max-width: 800px) {
    height: 400px;
    align-items: flex-end;
    width: 100%;
    margin-top: 15px;
    img {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    }
  }
`;

const Problem = () => {
  return (
    <Styles>
      <Text>
        <div>
          <div className="header">
            Чего вам не хватает для успешной карьеры юриста?{" "}
          </div>
          <p>
            Дело <span id="no">не в знаниях.</span>{" "}
          </p>
          <p>Вам нужно:</p>
          <ul>
            <li>
              быть частью сообщества юристов, чтобы знать о трендах и
              возможностях
            </li>
            <li>
              обладать навыками презентовать и продавать себя, которые можно
              выработать только через практику
            </li>
            <li>
              получить практические навыки, необходимые для прохождения
              собеседований и работы в выбранной вами сфере
            </li>
            <li>
              уметь структурно оценивать и решать любую проблему в независимости
              от того, читали вы о ней в учебнике или нет
            </li>
            <li>
              выработь свою "изюминку", через которую вы сможете продвигать себя
              на работе и за ее пределами
            </li>
          </ul>
          {/* <p>
            Если вы обладаете всеми этими навыками, у вас получится сделать
            <b> интересную и успешную карьеру корпоративного юриста.</b>
          </p> */}
        </div>
      </Text>
      <Image>
        <img src="static/women.jpg" />
      </Image>
    </Styles>
  );
};

export default Problem;
