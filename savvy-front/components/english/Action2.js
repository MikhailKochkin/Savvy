import styled from "styled-components";

const Styles = styled.div`
  padding: 50px 0;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(
    360deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0.5) 29.69%,
    rgba(220, 232, 253, 0.466013) 48.44%,
    rgba(49, 117, 243, 0.3) 100%,
    #c4d6fc 100%
  );

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 65%;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Form = styled.div`
  width: 100%;
  background: #3175f3;
  border-radius: 30px;
  padding: 4%;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  #description {
    width: 50%;
    padding: 2%;
  }
  #header {
    font-size: 3rem;
    line-height: 1.2;
    width: 60%;
    font-weight: 600;
    margin-bottom: 20px;
  }
  #details {
    font-size: 2rem;
    line-height: 1.4;
    width: 80%;
  }
  #form {
    width: 50%;
    border-left: 1px solid #606060;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  #form_container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  input {
    width: 80%;
    padding: 3% 2%;
    font-family: Montserrat;
    border: none;
    border-radius: 5px;
    margin-bottom: 20px;
    outline: 0;
    cursor: pointer;
  }
  button {
    width: 80%;
    padding: 2%;
    font-family: Montserrat;
    border: none;
    background: #f9d801;
    border-radius: 5px;
    margin-bottom: 20px;
    outline: 0;
    cursor: pointer;
    font-size: 1.8rem;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    #description {
      width: 100%;
      margin-bottom: 40px;
    }
    #header {
      width: 100%;
    }
    #details {
      width: 100%;
    }
    #form {
      width: 100%;
      border: none;
    }
    #form_container {
      width: 100%;
    }
  }
`;

const Action = () => {
  return (
    <Styles>
      <Container>
        <Form>
          <div id="description">
            <div id="header">Вводнное занятие с автором курса</div>
            <div id="details">
              1. Расскажу про программу 2. Проведу вводное тестирование 3.
              Покажу, как работает система
            </div>
          </div>
          <div id="form">
            <div id="form_container">
              <input />
              <input />
              <input />
              <button>Записаться</button>
            </div>
          </div>
        </Form>
      </Container>
    </Styles>
  );
};

export default Action;
