import { useState } from "react";
import moment from "moment";
import styled from "styled-components";

moment.locale("ru");

const Styles = styled.div`
  .traffic_data {
    margin-left: 15px;
  }
  .box {
    border-bottom: 1px solid grey;
    width: 40%;
    margin-bottom: 10px;
  }
`;

const UserData = (props) => {
  const [show, setShow] = useState(false);
  const { d } = props;
  console.log("d.traffic_sources.visistsList", d.traffic_sources);
  return (
    <Styles>
      <li>
        {d.name} {d.surname} {d.country}
        {moment(d.updatedAt).format("DD.MM.YY HH:mm:ss")} -{" "}
        {d.traffic_sources && (
          <button onClick={(e) => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </button>
        )}
        {/* {d.traffic_sources.visistsList} */}
      </li>
      {show && d.traffic_sources && d.traffic_sources.visitsList && (
        <>
          <div>
            <b>Traffic data</b>
          </div>
          <div className="traffic_data">
            {d.traffic_sources.visitsList.map((v) => (
              <div className="box">
                <div>date: {v.date}</div>
                <div>utm_campaign: {v.utm_campaign}</div>
                <div>utm_medium: {v.utm_medium}</div>
                <div>utm_source: {v.utm_source}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </Styles>
  );
};

export default UserData;
