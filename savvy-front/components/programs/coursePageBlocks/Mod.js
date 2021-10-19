import { useState } from "react";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { ic_keyboard_arrow_down } from "react-icons-kit/md/ic_keyboard_arrow_down";
import { ic_keyboard_arrow_up } from "react-icons-kit/md/ic_keyboard_arrow_up";

// DE4634;

const ModStyles = styled.div`
  border-bottom: 1px solid black;
  margin-bottom: 40px;
  .name {
    font-size: 2.1rem;
    margin-bottom: 10px;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  span {
    display: inline-block;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 40px;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    .name {
      font-size: 2rem;
      div {
        width: 90%;
      }
    }
  }
`;

const CardStyles = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const LessonCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  width: 90%;
  font-size: 1.6rem;
  margin-bottom: 10px;

  @media (max-width: 1000px) {
    display: flex;
    width: 95%;
    flex-direction: column;
    justify-content: center;
    padding: 0 3%;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 15px;
  /* padding-right: 25px; */
  .lesson_name {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
  }
  .lesson_description {
    font-size: 1.4rem;
    line-height: 1.6;
    p {
      margin: 4px 0;
    }
  }
  .arrow {
    cursor: pointer;
  }
`;

const Mod = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <ModStyles>
      <div className="name">
        <div>{props.mod.name} </div>
        <span className="circle" onClick={(e) => setOpen(!open)}>
          {open ? (
            <Icon size={25} icon={ic_keyboard_arrow_up} />
          ) : (
            <Icon size={25} icon={ic_keyboard_arrow_down} />
          )}
        </span>
      </div>
      {open && (
        <CardStyles>
          {props.mod.lessons.map((l, i) => (
            <LessonCard>
              <Text>
                <div className="lesson_name">
                  {i + 1}. {l.name}
                </div>
              </Text>
            </LessonCard>
          ))}
        </CardStyles>
      )}
    </ModStyles>
  );
};

export default Mod;
