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
  const [openActive, setOpenActive] = useState(false);
  const [openTotal, setOpenTotal] = useState(false);
  const [utmSourceFilter, setUtmSourceFilter] = useState("");

  let parseURL = (url) => {
    const parsedURL = new URL(url, "https://besavvy.app"); // Adding a base URL to properly parse the input
    const searchParams = new URLSearchParams(parsedURL.search);

    const values = {
      pathname: parsedURL.pathname,
      level: searchParams.get("level"),
      id: searchParams.get("id"),
      name: decodeURIComponent(searchParams.get("name")),
      status: searchParams.get("status"),
      utm_source: searchParams.get("utm_source"),
    };

    return values;
  };
  let session = props.session;
  let total = session.objects
    .filter((s) => {
      let values = parseURL(s.source);

      if (values.status === "development") {
        return false;
      }

      return true;
    })
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  let active = session.objects
    .filter((s) => {
      if (s.journey.length === 0) {
        return false;
      }

      let values = parseURL(s.source);

      if (values.status === "development") {
        return false;
      }

      return true;
    })
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const [tagFilter, setTagFilter] = useState("");
  const [filteredSessions, setFilteredSessions] = useState(active);

  const filterByTag = () => {
    const tags = tagFilter.split(",").map((tag) => tag.trim());

    if (!tags.length) {
      setFilteredSessions(active);
    } else {
      setFilteredSessions(
        active.filter((s) => s.journey.some((tag) => tags.includes(tag)))
      );
    }
  };

  const applyUtmSourceFilter = () => {
    const filteredByUtmSourceSessions = filteredSessions.filter((s) => {
      let values = parseURL(s.source);
      return values.utm_source === utmSourceFilter;
    });

    // Replace the original sessions with the filtered ones
    setFilteredSessions(filteredByUtmSourceSessions);
  };

  moment.locale("ru");

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
            <h4>Активные сессии</h4>
            <button onClick={() => setOpenActive(!openActive)}>
              {openActive ? "Скрыть" : "Показать"}
            </button>
            {openActive &&
              active.map((s, i) => {
                let values = parseURL(s.source);
                if (values.status === "development") {
                  return null;
                }
                return (
                  <div className="session">
                    <div>
                      {i + 1}. Время сессии: с{" "}
                      {moment(s.createdAt).format("HH:mm:ss")} до{" "}
                      {moment(s.updatedAt).format("HH:mm:ss")}. Общее время:{" "}
                      <b>
                        {" "}
                        {parseInt(
                          Math.abs(
                            new Date(s.updatedAt) - new Date(s.createdAt)
                          ) / 60000
                        )}
                        {":"}
                        {parseInt(
                          (Math.abs(
                            new Date(s.updatedAt) - new Date(s.createdAt)
                          ) /
                            1000) %
                            60
                        )}
                      </b>
                    </div>

                    <div>Источник:</div>
                    <li>{values.pathname}</li>
                    <li>{values.level}</li>
                    <li>{values.id}</li>
                    <li>{values.name}</li>
                    {/* <li>{values.status}</li> */}

                    <div>{s.journey.join(", ")}</div>
                    <div>
                      <b>Оценка:</b> {s.rating}
                    </div>
                  </div>
                );
              })}
            <h4>Фильтр сессий</h4>
            <div>
              <input
                type="text"
                placeholder="Enter tags to filter, separated by commas"
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
              />
              <button onClick={filterByTag}>Filter by Tags</button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Введите utm_source"
                value={utmSourceFilter}
                onChange={(e) => setUtmSourceFilter(e.target.value)}
              />
              <button onClick={() => applyUtmSourceFilter()}>
                Применить фильтр
              </button>
            </div>
            <div>Всего: {filteredSessions.length}</div>
            {filteredSessions.map((s, i) => {
              let values = parseURL(s.source);

              return (
                <div className="session">
                  <div>
                    {i + 1}. Время сессии: с{" "}
                    {moment(s.createdAt).format("HH:mm:ss")} до{" "}
                    {moment(s.updatedAt).format("HH:mm:ss")}. Общее время:{" "}
                    <b>
                      {" "}
                      {parseInt(
                        Math.abs(
                          new Date(s.updatedAt) - new Date(s.createdAt)
                        ) / 60000
                      )}
                      {":"}
                      {parseInt(
                        (Math.abs(
                          new Date(s.updatedAt) - new Date(s.createdAt)
                        ) /
                          1000) %
                          60
                      )}
                    </b>
                  </div>

                  <div>Источник:</div>
                  <li>{values.pathname}</li>
                  <li>{values.level}</li>
                  <li>{values.id}</li>
                  <li>{values.name}</li>
                  <li>{values.utm_source}</li>

                  <div>{s.journey.join(", ")}</div>
                  {/* <div>
                    <b>Оценка:</b> {s.rating}
                  </div> */}
                </div>
              );
            })}
            <h4>Все сессии</h4>
            <button onClick={() => setOpenTotal(!openTotal)}>
              {openTotal ? "Скрыть" : "Показать"}
            </button>
            {openTotal &&
              total.map((s, i) => {
                let values = parseURL(s.source);
                if (values.status === "development") {
                  return null;
                }
                return (
                  <div className="session">
                    <div>
                      {i + 1}. Время сессии: с{" "}
                      {moment(s.createdAt).format("HH:mm:ss")} до{" "}
                      {moment(s.updatedAt).format("HH:mm:ss")}. Общее время:{" "}
                      <b>
                        {" "}
                        {parseInt(
                          Math.abs(
                            new Date(s.updatedAt) - new Date(s.createdAt)
                          ) / 60000
                        )}
                        {":"}
                        {parseInt(
                          (Math.abs(
                            new Date(s.updatedAt) - new Date(s.createdAt)
                          ) /
                            1000) %
                            60
                        )}
                      </b>
                    </div>

                    <div>Источник:</div>
                    <li>{values.pathname}</li>
                    <li>{values.level}</li>
                    <li>{values.id}</li>
                    <li>{values.name}</li>
                    <li>{values.status}</li>
                    <li>{values.utm_source}</li>

                    <div>
                      <b>Оценка:</b> {s.rating}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </>
    </Block>
  );
};

export default BotSession;
