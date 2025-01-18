import { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

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

const GET_LESSON_QUERY = gql`
  query GET_LESSON_QUERY($id: String!) {
    lesson(id: $id) {
      id
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
  const { loading, error, data } = useQuery(GET_LESSON_QUERY, {
    variables: { id: errorData.id },
    skip: !errorData.id, // Skip the query if no ID is provided
  });
  const router = useRouter();

  useEffect(() => {
    if (!isErrorMessageSent) {
      let additionalErrorInfo = "";
      if (loading) {
        additionalErrorInfo = "Loading state detected.";
      } else if (error) {
        additionalErrorInfo = `Error occurred: ${error.message}`;
      } else if (data && data.lesson) {
        additionalErrorInfo = "Lesson exists but failed to load properly.";
      } else {
        additionalErrorInfo = "No simulators with the given ID were found.";
      }

      const errorDetails = `
        An error occurred in the application.
        Data loading error on "${errorData.page}" page.
        Id: ${errorData.id}, error: ${errorData.error}
        Browser: ${navigator.userAgent}
        URL: ${window.location.href}
        Referrer: ${document.referrer || "N/A"}
        Viewport Size: ${window.innerWidth}x${window.innerHeight}
        Screen Resolution: ${window.screen.width}x${window.screen.height}
        Device Type: ${
          navigator.userAgent.includes("Mobi") ? "Mobile" : "Desktop"
        }
        Network Connection: ${
          navigator?.connection?.effectiveType || "Unknown"
        } / ${navigator?.connection?.type || "Unknown"}
        Cookies: ${document.cookie}
        Local Storage: ${JSON.stringify(localStorage)}
        Additional Info: ${additionalErrorInfo}
        Time: ${new Date().toLocaleString()}
      `;

      sendBusinessEmail({
        variables: {
          subject: "Application Error Occurred",
          email: "mike@besavvy.app",
          type: "internal",
          name: "Mikhail",
          connection: errorDetails,
        },
      }).catch((err) => {
        console.error("Error sending email:", err);
      });

      setIsErrorMessageSent(true);
    }
  }, [isErrorMessageSent, sendBusinessEmail, errorData, loading, error, data]);

  if (loading) return <p>Loading lesson details...</p>;

  if (error) {
    return (
      <ErrorMessage>
        <img src="/static/404.png" alt="Error" />
        <p>An error occurred while loading data. Please try again later.</p>
        <SimpleButton onClick={() => router.reload()}>Reload</SimpleButton>
      </ErrorMessage>
    );
  }

  if (data && data.lesson) {
    return (
      <ErrorMessage>
        <img src="/static/404.png" alt="Error" />
        <p>The simulator exists but failed to load correctly.</p>
        <SimpleButton onClick={() => router.reload()}>Reload</SimpleButton>
      </ErrorMessage>
    );
  }

  return (
    <ErrorMessage>
      <img src="/static/404.png" alt="404 Error" />
      <p>No simulators with the given ID were found.</p>
      <SimpleButton onClick={() => router.push("/")}>
        Go to Homepage
      </SimpleButton>
    </ErrorMessage>
  );
};

export default LoadingErrorMessage;
