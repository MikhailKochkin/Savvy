import { useEffect } from "react";
import { useSendErrorNotification } from "../utils/sendErrorNotification";
import { useQuery, useMutation, gql } from "@apollo/client";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION(
    $subject: String
    $name: String
    $email: String
    $connection: String
    $type: String
  ) {
    sendBusinessEmail(
      subject: $subject
      name: $name
      email: $email
      connection: $connection
      type: $type
    ) {
      name
    }
  }
`;

const Error = ({ statusCode }) => {
  const [isErrorMessageSent, setIsErrorMessageSent] = useState(false);
  const [sendBusinessEmail] = useMutation(SEND_MESSAGE_MUTATION);

  useEffect(() => {
    if (!isErrorMessageSent) {
      const res = sendBusinessEmail({
        variables: {
          subject: "Application Error Occurred",
          email: "mike@besavvy.app", // Your email address
          type: "internal",
          name: "Mikhail",
          connection: `An error occurred in the application. statusCode: ${statusCode} `,
        },
      });
      setIsErrorMessageSent(true);
    }
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
