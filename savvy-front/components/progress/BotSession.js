import { useState } from "react";
import styled from "styled-components";
import moment from "moment";

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  border: 1px solid #d3d3d3;
  padding: 15px;
  border-radius: 10px;
  .session {
    width: 100%;
    margin-left: 15px;
    margin-bottom: 5px;
    border-bottom: 1px dashed #d3d3d3;
  }
`;

const BotSession = (props) => {
  const [open, setOpen] = useState(false);
  moment.locale("ru");
  let session = props.session;
  let total = session.objects;
  let active = session.objects
    .filter((s) => s.journey.length > 0)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  return (
    <Block>
      <div>
        <b>{session.day}</b>
      </div>
      <div>Всего сессий: {total.length}</div>
      <div>Всего активных сессий: {active.length}</div>
      <div>
        Процент активных сессий:{" "}
        {parseInt((active.length / total.length) * 100)}%
      </div>
      <>
        <div>
          Данные по сессиям:{" "}
          <button onClick={(e) => setOpen(!open)}>Открыть</button>
        </div>
        {open && (
          <div>
            {active.map((s, i) => (
              <div className="session">
                <div>
                  {i + 1}. Время сессии: с{" "}
                  {moment(s.createdAt).format("HH:mm:ss")} до{" "}
                  {moment(s.updatedAt).format("HH:mm:ss")}. Общее время:{" "}
                  <b>
                    {" "}
                    {parseInt(
                      Math.abs(new Date(s.updatedAt) - new Date(s.createdAt)) /
                        60000
                    )}
                    {":"}
                    {parseInt(
                      (Math.abs(new Date(s.updatedAt) - new Date(s.createdAt)) /
                        1000) %
                        60
                    )}
                  </b>
                </div>
                {console.log(
                  "minus",
                  Math.abs(new Date(s.updatedAt) - new Date(s.createdAt)) / 1000
                )}
                <div>Источник: {s.source}</div>
                <div>{s.journey.join(", ")}</div>
                <div>
                  <b>Оценка:</b> {s.rating}
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    </Block>
  );
};

export default BotSession;
