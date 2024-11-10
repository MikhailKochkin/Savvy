import React from "react";
import styled from "styled-components";

const FaqStyles = styled.div`
  width: 100%;
  .question_section {
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    padding: 10px 20px;
    margin-top: 20px;
    h3 {
      font-weight: 600;
    }
    p {
      color: #6e6c6b;
    }
  }
  margin-bottom: 50px;
`;

const SecurityQuestions = () => {
  const faqData = [
    {
      question: "Do you support Single Sign-On (SSO)?",
      answer:
        "Yes, we support SSO from Google and Azure. We are open to adding other providers to this list.",
    },
    {
      question: "How do you handle the data you collect?",
      answer:
        "For more information, refer to our Privacy policy. In summary, the only PII we collect is user names and emails. BeSavvy is exclusively an internal-facing tool, and this information is for login purposes. We do not touch any of your customer data and do not integrate with your CRM.",
    },
    {
      question: "Want to report a potential security issue?",
      answer:
        "Reach out to security@besavvy.app for immediate action. We take security very seriously.",
    },
    {
      question: "Do you have a Data Processing Agreement?",
      answer:
        "Yes, please reach out to security@besavvy.app for a personalized copy. We are also happy to transparently walk you through our system design and our subprocessors that do not interface with any PII.",
    },
    {
      question: "Where are your servers located?",
      answer: "All BeSavvy servers are located within in Ireland.",
    },
    {
      question: "Do you encrypt data at rest?",
      answer:
        "Yes. All data stored by BeSavvy in our database is encrypted at rest.",
    },
    {
      question:
        "Will any personal data or private information about our employees or customers be used that isn't already public on the Internet?",
      answer: "No.",
    },
    {
      question:
        "Will BeSavvy have access to our internal systems that hold customer or employee personal information?",
      answer: "No.",
    },
    {
      question:
        "Will BeSavvy have access to our live operational environments?",
      answer: "No.",
    },
    {
      question:
        "Will any data from our company, such as metadata, be checked to ensure it doesn't contain sensitive information?",
      answer: "No.",
    },
    {
      question:
        "Will all outputs or materials be reviewed and approved by a person before use?",
      answer:
        "Yes, this is an internal training tool. No externally facing content is made.",
    },
    {
      question:
        "If the AI generates code for software, will it go through our standard update and change process?",
      answer: "N/A, the AI does not generate code for software.",
    },
    {
      question:
        "If the AI creates content for communication, will it be checked by a person before being used?",
      answer: "N/A, the AI does not create content for communication.",
    },
    {
      question:
        "If the AI is used for analysis, will a person review the results before we make any business decisions?",
      answer:
        "Yes, the internal admin who is using the tool will review the results before they make any business decisions.",
    },
    {
      question:
        "Will BeSavvy use any of our data to improve their AI or for any other purpose than providing the service we agreed on?",
      answer: "No, your data is only used to provide you with your service.",
    },
  ];

  return (
    <FaqStyles>
      {faqData.map((faq, index) => (
        <div className="question_section" key={index}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </FaqStyles>
  );
};

export default SecurityQuestions;
