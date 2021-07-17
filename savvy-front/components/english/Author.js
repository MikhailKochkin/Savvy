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
`;

const Level1 = styled.div`
  height: 45vh;
  display: flex;
  flex-direction: row;
  /* align-items: flex-end; */
  justify-content: flex-end;

  img {
    width: 40%;
    border-bottom-left-radius: 20px;
    object-fit: cover;
  }
  @media (max-width: 800px) {
    height: auto;
    img {
      width: 100%;
      border-bottom-left-radius: 0px;
      margin-bottom: 30px;
    }
  }
`;

const Level2 = styled.div`
  height: 55vh;
  display: flex;
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
    font-size: 2.2rem;
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
      <Level1>
        <img src="static/misha.jpg" />
      </Level1>
      <Level2>
        <div id="text">
          <div id="author_name">Я Михаил Кочкин</div>
          <div id="author_story">
            Я закончил МГИМО, стажировался в Baker McKenzie и Latham & Watkins.
            Учу английскому 5 лет и работал с 400 учениками: от студентов до
            руководителей юридических деппартаментов.
          </div>
        </div>
      </Level2>
    </Styles>
  );
};

export default Author;
