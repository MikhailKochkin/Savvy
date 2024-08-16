import { useEffect } from "react";
import { useSendErrorNotification } from "../utils/sendErrorNotification";

const Error = ({ statusCode }) => {
  useEffect(() => {
    sendErrorEmail(err, { statusCode: res ? res.statusCode : 404 });
  }, []);

  return (
    <div>
      <p>Hm... Something went wrong...</p>
      <p>Could you reload the page please?</p>
      <p>
        No worries. Your data is safe. Probably just a small bug that we already
        working on.
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
