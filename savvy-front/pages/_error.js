import React from "react";
import { useSendErrorNotification } from "../utils/sendErrorNotification";

const Error = ({ statusCode }) => {
  return (
    <div>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
    </div>
  );
};

Error.getInitialProps = async ({ res, err }) => {
  const sendErrorEmail = useSendErrorNotification();

  if (err) {
    await sendErrorEmail(err, { statusCode: res ? res.statusCode : 404 });
  }

  return { statusCode: res ? res.statusCode : 404 };
};

export default Error;
