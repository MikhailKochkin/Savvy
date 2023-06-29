import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import gql from "graphql-tag";

const CREATE_EMAIL_REMINDER_MUTATION = gql`
  mutation CREATE_EMAIL_REMINDER_MUTATION(
    $userId: String!
    $coursePageId: String!
    $emailCampaignId: String!
    $link: String!
    $gap: Int!
  ) {
    createEmailReminder(
      userId: $userId
      coursePageId: $coursePageId
      emailCampaignId: $emailCampaignId
      link: $link
      gap: $gap
    ) {
      id
      user {
        id
        email
      }
      coursePage {
        id
        title
      }
      emailCampaign {
        id
        name
      }
      link
      sendAt
      gap
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f2f2f2;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  width: 450px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin: 1rem 0 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 100px;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const FormTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const FormWrapper = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const CreateEmailReminder = () => {
  const [userId, setUserId] = useState("");
  const [coursePageId, setCoursePageId] = useState("");
  const [emailCampaignId, setEmailCampaignId] = useState("");
  const [link, setLink] = useState("");
  const [gap, setGap] = useState(0);

  const [createEmailReminder, { data, loading, error }] = useMutation(
    CREATE_EMAIL_REMINDER_MUTATION
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createEmailReminder({
      variables: { userId, coursePageId, emailCampaignId, link, gap },
    });
  };

  return (
    <Container>
      <FormWrapper>
        <FormTitle>Create Email Reminder</FormTitle>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="userId">User Id:</Label>
          <Input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Label htmlFor="coursePageId">Course Page ID:</Label>
          <Input
            type="text"
            id="coursePageId"
            value={coursePageId}
            onChange={(e) => setCoursePageId(e.target.value)}
          />
          <Label htmlFor="emailCampaignId">Email Campaign ID:</Label>
          <Input
            type="text"
            id="emailCampaignId"
            value={emailCampaignId}
            onChange={(e) => setEmailCampaignId(e.target.value)}
          />
          <Label htmlFor="link">Link:</Label>
          <Input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Label htmlFor="gap">Gap (in days):</Label>
          <Input
            type="number"
            id="gap"
            value={gap}
            onChange={(e) => setGap(parseInt(e.target.value, 10))}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Email Reminder"}
          </Button>
          {error && <p>Error: {error.message}</p>}
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default CreateEmailReminder;
