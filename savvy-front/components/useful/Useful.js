import styled from "styled-components";
import "react-phone-number-input/style.css";
import Modal from "styled-react-modal";

import ContactForm from "./ContactForm";

const Styles = styled.div`
  padding: 50px 0;
  min-height: 100vh;
  width: 100vw;
  background-image: url("/static/space.svg");
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 800px) {
    background-size: cover;
    background-repeat: no-repeat;
    height: auto;
    padding: 0;
    min-height: 0;
  }
`;

const Container = styled.div`
  width: 75%;
  height: 100%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 48%;
  min-width: 460px;
  padding: 2% 4%;
  border-radius: 5px;
  .comment {
    div {
      margin: 10px 0;
    }
  }
  .highlight {
    padding-bottom: 1px;
    border-bottom: 3px solid #f9d801;
    font-weight: 600;
  }
  #header {
    font-size: 3.4rem;
    line-height: 1.2;
    width: 70%;
    font-weight: 600;
    margin-bottom: 20px;
  }
  #info {
    div {
      line-height: 1.4;
      margin: 10px 0;
    }
  }
  #promo {
    margin-top: 10%;
    input {
      width: 100%;
      padding: 13px 6px;
      border: 1px solid #d8d8d8;
      border-radius: 5px;
      outline: 0;
      font-family: Montserrat;
      font-size: 1.6rem;
    }
  }
  #details {
    font-size: 1.6rem;
    line-height: 1.4;
    width: 100%;
    .arrow {
      width: 50%;
    }
    #prices {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .buy {
        text-decoration: underline;
        cursor: pointer;
      }
      .full {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        span {
          font-size: 3.4rem;
        }
      }
      .parts {
        width: 48%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        span {
          font-size: 2rem;
        }
      }
    }
    #price {
      border-bottom: 2px solid white;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    div {
      margin: 5px 0;
    }
    span {
      font-weight: 500;
    }
  }
  .buy_button {
    width: 100%;
    padding: 2%;
    font-family: Montserrat;
    border: none;
    background: #f9d801;
    border-radius: 5px;
    margin-bottom: 10px;
    outline: 0;
    cursor: pointer;
    font-size: 1.8rem;
    transition: ease-in 0.2s;
    &:hover {
      background-color: #dfc201;
    }
  }
  @media (max-width: 800px) {
    height: auto;
    justify-content: space-between;
    min-height: 350px;
    padding: 20px 0;
    width: 100%;
    min-width: 100px;
    #description {
      width: 100%;
      margin-bottom: 20px;
    }
    #header {
      font-size: 2.6rem;
      width: 95%;
      margin-top: 10px;
    }
    #promo {
      margin-top: 0;
    }
    #details {
      margin-top: 0;
      .arrow {
        width: 70%;
      }
      #prices {
        flex-direction: row;
        .full {
          width: 90%;
          span {
            font-size: 2.2rem;
          }
        }
        .parts {
          width: 90%;
          margin-top: 10px;

          span {
            font-size: 2.2rem;
          }
        }
      }
    }
  }
`;

const ImageBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  .explainer {
    width: 65%;
    li {
      line-height: 1.7rem;
      font-size: 1.4rem;
      margin-bottom: 10px;
    }
  }
  @media (max-width: 800px) {
    .explainer {
      width: 95%;
      margin-bottom: 40px;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Bottom = styled.div`
  display: flex;
  margin-top: 30px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  color: #fff;
  font-size: 1.6rem;
  width: 100%;
  height: 100px;
  .explainer_block {
    width: 30%;
    line-height: 1.6;
  }
`;

const Form = styled.div`
  width: 100%;
  height: 90%;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .PhoneInput {
    width: 80%;
    height: 22px;
    select {
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    border-radius: 0;
    padding: 6% 4%;
    #description {
      width: 100%;
      margin-bottom: 20px;
    }
    #header {
      width: 95%;
    }
    input {
      width: 100%;
      height: 50px;
      font-size: 1.6rem;
    }
    button {
      width: 100%;
      height: 50px;
      font-size: 2.2rem;
    }
    #legal {
      width: 95%;
    }
    #details {
      width: 95%;
      font-size: 1.9rem;
    }
    #form {
      width: 100%;
      border: none;
    }
    #form_container {
      width: 95%;
      .h2 {
        width: 100%;
      }
      form {
        width: 100%;
      }
    }
  }
`;

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 40%;
  min-width: 400px;
  padding: 2%;
  .top_message {
    padding-bottom: 2%;
    border-bottom: 1px solid grey;
    font-size: 2rem;
    width: 100%;
    text-align: center;
  }
  .bottom_message {
    margin-top: 2%;
  }
  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

const Action = (props) => {
  const d = props.data;
  const { me, material } = props;
  console.log("material.image_url", material);
  return (
    <Styles id="c2a">
      <Container>
        <Form>
          <ContactForm me={me} material={material} />
          <ImageBlock>
            <Description>
              <Image src={material.image_url} />
            </Description>
          </ImageBlock>
        </Form>
        <Bottom>
          {material.description.map((d) => (
            <div className="explainer_block">{d}</div>
          ))}
        </Bottom>
      </Container>
    </Styles>
  );
};

export default Action;
