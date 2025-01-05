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
  flex-direction: center;
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

const LoadingErrorMessage = (props) => {
  const { errorData } = props;
  const [isErrorMessageSent, setIsErrorMessageSent] = useState(false);
  const [sendBusinessEmail] = useMutation(SEND_MESSAGE_MUTATION);

  // if (!isErrorMessageSent) {
  //   const res = sendBusinessEmail({
  //     variables: {
  //       subject: "Application Error Occurred",
  //       email: "mike@besavvy.app", // Your email address
  //       type: "internal",
  //       name: "Mikhail",
  //       connection: `
  //       An error occurred in the application.
  //       Data loading error on "${errorData.page}" page.
  //       Id: ${errorData.id}, error: ${errorData.error}
  //       Browser: ${navigator.userAgent}
  //       URL: ${window.location.href}
  //       Referrer: ${document.referrer || "N/A"}
  //       Viewport Size: ${window.innerWidth}x${window.innerHeight}
  //       Screen Resolution: ${window.screen.width}x${window.screen.height}
  //       Device Type: ${
  //         navigator.userAgent.includes("Mobi") ? "Mobile" : "Desktop"
  //       }
  //       Network Connection: ${navigator.connection.effectiveType} / ${
  //         navigator.connection.type
  //       }
  //       Network Type: ${navigator.connection.type}
  //       Network DownLink: ${navigator.connection.downlink}
  //       Network RTT: ${navigator.connection.rtt}

  //       Cookies: ${document.cookie}
  //       Local Storage: ${JSON.stringify(localStorage)}
  //       Time: ${new Date().toLocaleString()}
  //       `,
  //     },
  //   });
  //   setIsErrorMessageSent(true);
  // }
  return (
    <ErrorMessage>
      <img src="/static/404.png" />
      <p>Hm... No {errorData.type} has been found or loaded.</p>
      <p>Check the link or internet connection please. And reload the page.</p>
      <p>You can also get back to the Homepage.</p>
      <SimpleButton>
        <Link href="/">Homepage</Link>
      </SimpleButton>
    </ErrorMessage>
  );
};

export default LoadingErrorMessage;
