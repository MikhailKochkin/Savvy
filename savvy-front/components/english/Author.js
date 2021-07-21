import styled from "styled-components";

const Styles = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0.5) 29.69%,
    rgba(220, 232, 253, 0.466013) 48.44%,
    rgba(49, 117, 243, 0.3) 100%,
    #c4d6fc 100%
  );

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
`;

const Level1 = styled.div`
  min-height: 45vh;
  display: flex;
  flex-direction: row;
  /* align-items: flex-end; */
  justify-content: flex-end;
  margin-top: 100px;

  img {
    width: 40%;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;

    object-fit: cover;
  }
  @media (max-width: 800px) {
    height: auto;
    img {
      width: 100%;
      border-bottom-left-radius: 0px;
      border-top-left-radius: 0px;
      margin-bottom: 30px;
    }
  }
`;

const Level2 = styled.div`
  min-height: 55vh;
  display: flex;
  padding-top: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #text {
    width: 70%;
  }
  #author_name {
    font-size: 4rem;
    font-weight: 600;
  }
  #author_story {
    font-size: 2rem;
    font-weight: 400;
  }
  @media (max-width: 800px) {
    height: auto;
    #text {
      width: 90%;
    }
    #author_name {
      line-height: 1.4;
      margin-bottom: 30px;
    }
  }
`;

const Author = () => {
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
      <Level1>
        <img src="static/misha.jpg" />
      </Level1>
      <Level2>
        <div id="text">
          <div id="author_name">Автор курса – Михаил Кочкин</div>
          <div id="author_story">
            <p>
              Мне известно изнутри, что такое работа юриста с английским языком.
              Ведь я закончил Международно-правовой факультет МГИМО и
              стажировался в московских офисах международных юридических фирм
              Baker McKenzie и Latham & Watkins. Я знаю, как нужно учить
              юридическому английскому, чтобы его можно было применять в работе.{" "}
            </p>
            <p>
              У меня обширный опыт обучения языку. Я учу юридическому
              английскому беспрерывно уже 5 лет и работал с 400 учениками: от
              студентов до руководителей юридических департаментов. Я умею
              сохранять мотивацию студента, контролировать освоение им навыков и
              помогать сразу применять новые знания на практике даже при
              занятиях в режиме онлайн.
            </p>
          </div>
        </div>
      </Level2>
    </Styles>
  );
};

export default Author;
