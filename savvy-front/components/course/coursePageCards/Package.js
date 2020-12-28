import React, { useState } from "react";
import styled from "styled-components";
import TakeMyMoney from "../../TakeMyMoney";

const Mod = styled.div`
  padding: 3%;
  width: 100%;
  .Header {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2%;
  }
`;

const CaseCard = styled.div`
  position: relative;
  margin: 2%;
  width: 295px;
  height: 310px;
  line-height: 1.2;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Box = styled.div`
  color: white;
  /* background: rgba(36, 36, 36, 0.75); */
  background: linear-gradient(270deg, rgba(46, 46, 46, 0.79) 0%, #2e2e2e 100%);
  width: 245px;
  height: 100%;
  position: absolute;
  bottom: 0px;
  left: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .content {
    height: 85%;
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: space-between;
    img {
      width: 55px;
      height: 55px;
      border-radius: 50px;
    }
    .author {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 5px;
    }
  }
  button {
    background: #00c3ff;
    border-radius: 20px;
    width: 100%;
    height: 35px;
    padding: 2%;
    border: none;
    color: white;
    font-family: Montserrat;
    font-size: 1.6rem;
    outline: 0;
    cursor: pointer;
    &:hover {
      background: #0195c2;
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .title {
    font-size: 1.7rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .description {
  }
  button {
    background: #00c3ff;
    border-radius: 20px;
    width: 100%;
    height: 35px;
    padding: 2%;
    border: none;
    color: white;
    font-family: Montserrat;
    font-size: 1.6rem;
    outline: 0;
    cursor: pointer;
    &:hover {
      background: #0195c2;
    }
  }
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  div {
    width: 40%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .price {
      flex-basis: 25%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 2.6rem;
      font-weight: bold;
    }
    .button {
      flex-basis: 50%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      button {
        margin: 0;
      }
    }
  }
`;

const Package = (props) => {
  const [price, setPrice] = useState(props.coursePage.price);
  const [courses, setCourses] = useState([props.coursePage.id]);
  const [comment, setComment] = useState([props.coursePage.title]);
  const { coursePage, me } = props;
  const content = [coursePage, ...coursePage.package];
  const set = async (e) => {
    let c = [...courses];
    let coef = 1;
    if (courses.includes(e.target.id)) {
      if (courses.length - 1 < 1) {
        coef = 1;
      } else if (courses.length - 1 === 2) {
        coef = 0.9;
      } else if (courses.length - 1 === 3) {
        coef = 0.8;
      }
      setCourses(c.filter((co) => co !== e.target.id));
      setComment(comment.filter((co) => co !== e.target.name));
      setPrice((courses.length - 1) * props.coursePage.price * coef);
    } else {
      if (courses.length + 1 === 1) {
        coef = 1;
      } else if (courses.length + 1 === 2) {
        coef = 0.9;
      } else if (courses.length + 1 === 3) {
        coef = 0.8;
      }
      setCourses([...c, e.target.id]);
      setComment([...comment, e.target.name]);
      setPrice((courses.length + 1) * props.coursePage.price * coef);
    }
  };

  return (
    <Mod closeNavBar={(e) => setIsOpen(!isOpen)}>
      <div className="Header">Пакет:</div>
      <List>
        {content.map((el, i) => (
          <CaseCard>
            <img src={el.image} />
            <Box className="text">
              <div className="content">
                <div>
                  <div className="title">{el.title}</div>
                  <div className="description">{el.description}</div>
                </div>
                <button id={el.id} name={el.title} onClick={(e) => set(e)}>
                  {courses.includes(el.id) ? "Удалить" : "Выбрать"}
                </button>
              </div>
            </Box>
          </CaseCard>
        ))}
      </List>
      <PriceSection>
        <div>
          <span className="price">{price} ₽</span>
          <span className="button">
            {price > 0 && (
              <TakeMyMoney
                coursePage={coursePage}
                coursePageID={coursePage.id}
                name={me.name}
                comment={comment.toString()}
                user={me.id}
                price={price}
              >
                Купить
              </TakeMyMoney>
            )}
          </span>
        </div>
      </PriceSection>
    </Mod>
  );
};

export default Package;
