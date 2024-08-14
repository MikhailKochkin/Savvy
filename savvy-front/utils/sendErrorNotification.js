// utils/sendErrorNotification.js

import { gql, useMutation } from "@apollo/client";

// Define your existing mutation
const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION(
    $subject: String
    $name: String
    $email: String
    $firm: String
    $connection: String
    $type: String
  ) {
    sendBusinessEmail(
      subject: $subject
      name: $name
      email: $email
      firm: $firm
      connection: $connection
      type: $type
    ) {
      name
    }
  }
`;

// Function to send an error notification email
export const useSendErrorNotification = () => {
  const [sendBusinessEmail] = useMutation(SEND_MESSAGE_MUTATION);

  const sendErrorEmail = async (error, context) => {
    try {
      await sendBusinessEmail({
        variables: {
          subject: "Application Error Occurred",
          email: "mike@besavvy.app", // Your email address
          type: "internal",
          name: "Mikhail",
          connection: `An error occurred in the application.\n\nError message: ${
            error.message
          }\nStack trace: ${error.stack}\n\nContext: ${JSON.stringify(
            context
          )}`,
        },
      });
      console.log("Error email sent successfully");
    } catch (emailError) {
      console.error("Failed to send error email:", emailError);
    }
  };

  return sendErrorEmail;
};
