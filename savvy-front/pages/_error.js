import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import Link from "next/link";

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

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 5% 0;
  img {
    width: 400px;
    border-radius: 15px;
  }
  p {
    width: 380px;
    text-align: center;
  }
  @media (max-width: 600px) {
    width: 100%;
    img {
      width: 80%;
    }
    p {
      width: 80%;
    }
  }
`;

const SimpleButton = styled.button`
  width: 230px;
  height: 40px;
  background: #000000;
  padding: 5px 0;
  border: 2px solid #000000;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  transition: 0.3s;
  a {
    color: #fff;
  }
  &:hover {
    background: #f4f4f4;
    color: #000000;
    a {
      color: #000000;
    }
  }
`;

Error.getInitialProps = async (contextData) => {
  await Sentry.captureUnderscoreErrorException(contextData);

  // ...other getInitialProps code

  return Error.getInitialProps(contextData);
};

const Error = ({ statusCode }) => {
  const [isErrorMessageSent, setIsErrorMessageSent] = useState(false);
  const [sendBusinessEmail] = useMutation(SEND_MESSAGE_MUTATION);

  useEffect(() => {
    if (!isErrorMessageSent) {
      sendBusinessEmail({
        variables: {
          subject: "Application Error Occurred",
          email: "mike@besavvy.app",
          type: "internal",
          name: "Mikhail",
          connection: `
          An error occurred in the application on the _error page. Please investigate.
           Browser: ${navigator.userAgent}
           URL: ${window.location.href}
           Referrer: ${document.referrer || "N/A"}
           Viewport Size: ${window.innerWidth}x${window.innerHeight}
           Time: ${new Date().toLocaleString()}
           Screen Resolution: ${window.screen.width}x${window.screen.height}
        Device Type: ${
          navigator.userAgent.includes("Mobi") ? "Mobile" : "Desktop"
        }
        Network Connection: ${navigator.connection.effectiveType} / ${
            navigator.connection.type
          }
        Network Type: ${navigator.connection.type}
        Network DownLink: ${navigator.connection.downlink}
        Network RTT: ${navigator.connection.rtt}

        Cookies: ${document.cookie}
        Local Storage: ${JSON.stringify(localStorage)}
        Time: ${new Date().toLocaleString()}
          `,
        },
      }).catch((error) => {
        console.error("Error sending email:", error);
      });
      setIsErrorMessageSent(true);
    }
  }, [isErrorMessageSent, sendBusinessEmail]);

  return (
    <div>
      {statusCode ? (
        `An error ${statusCode} occurred on server`
      ) : (
        <ErrorMessage>
          <img src="/static/404.png" alt="404 Error" />
          <p>Hm... You are probably using the wrong URL.</p>
          <p>Please check the URL and try again.</p>
          <p>You can also get back to the Homepage.</p>
          <SimpleButton>
            <Link href="/">Homepage</Link>
          </SimpleButton>
        </ErrorMessage>
      )}
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
