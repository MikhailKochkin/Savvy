import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";

const DynamicLoadedEditor = dynamic(import("./editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

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
  width: 300px;
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

const UPDATE_EMAIL_CAMPAIGN = gql`
  mutation UpdateEmailCampaign(
    $id: String!
    $content: String!
    $name: String
    $emails: EmailsList
  ) {
    updateEmailCampaign(
      id: $id
      content: $content
      emails: $emails
      name: $name
    ) {
      id
      name
      content
      emails
    }
  }
`;

const SINGLE_EMAIL_CAMPAIGN_QUERY = gql`
  query SINGLE_EMAIL_CAMPAIGN_QUERY($id: String!) {
    emailCampaign(where: { id: $id }) {
      id
      name
      content
      emails
    }
  }
`;

const UpdateEmailCampaign = ({ campaignId }) => {
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(SINGLE_EMAIL_CAMPAIGN_QUERY, {
    variables: { id: campaignId },
  });
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [number, setNumber] = useState(5);
  const [campaignName, setCampaignName] = useState("");

  useEffect(() => {
    if (data?.emailCampaign) {
      setNumber(data.emailCampaign.emails.emails.length);
      setEmailTemplates(data.emailCampaign.emails.emails);
      setCampaignName(data.emailCampaign.name);
    }
  }, [data]);

  const handleNumberChange = (e) => {
    const newNumber = parseInt(e.target.value, 10);
    setNumber(newNumber);

    if (newNumber < emailTemplates.length) {
      const newTemplates = emailTemplates.slice(0, newNumber);
      setEmailTemplates(newTemplates);
    }
  };

  const [
    updateEmailCampaign,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_EMAIL_CAMPAIGN);

  const handleTemplateNameChange = (index, value) => {
    const newTemplates = [...emailTemplates];
    newTemplates[index] = {
      ...newTemplates[index],
      number: index + 1,
      name: value,
    };
    setEmailTemplates(newTemplates);
  };

  const handleHeaderChange = (index, value) => {
    const newTemplates = [...emailTemplates];
    newTemplates[index] = {
      ...newTemplates[index],
      number: index + 1,
      header: value,
    };
    setEmailTemplates(newTemplates);
  };

  const handleTemplateTextChange = (index, value) => {
    const newTemplates = [...emailTemplates];
    newTemplates[index] = {
      ...newTemplates[index],
      number: index + 1,
      text: value,
    };
    setEmailTemplates(newTemplates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateEmailCampaign({
      variables: {
        id: campaignId,
        name: campaignName,
        content: "",
        emails: { emails: emailTemplates },
      },
    });
  };

  const myCallBack = (value, name, index) => {
    handleTemplateTextChange(index, value);
  };

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error: {queryError.message}</p>;

  return (
    <Container>
      <FormWrapper>
        <FormTitle>Update Email Campaign</FormTitle>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="campaignName">Campaign Name:</Label>
          <Input
            type="text"
            id="campaignName"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />
          <Label htmlFor="number">Number of emails:</Label>
          <Input
            type="number"
            id="number"
            value={number}
            onChange={handleNumberChange}
          />
          {Array.from({ length: number }, (_, i) => (
            <div key={i}>
              <Label htmlFor={`name-${i}`}>Email name {i + 1}:</Label>
              <br />
              <Input
                type="text"
                id={`name-${i}`}
                value={emailTemplates[i]?.name || ""}
                onChange={(e) => handleTemplateNameChange(i, e.target.value)}
              />
              <br />

              <Label htmlFor={`header-${i}`}>Email header {i + 1}:</Label>
              <br />
              <Input
                type="text"
                id={`header-${i}`}
                value={emailTemplates[i]?.header || ""}
                onChange={(e) => handleHeaderChange(i, e.target.value)}
              />
              <br />

              <Label htmlFor={`template-${i}`}>Template {i + 1}:</Label>
              <br />

              <DynamicLoadedEditor
                id={`template-${i}`}
                getEditorText={myCallBack}
                index={i}
                value={emailTemplates[i]?.text || ""}
              />

              {/* <Textarea
                id={`template-${i}`}
                value={emailTemplates[i]?.text || ""}
                onChange={(e) => handleTemplateTextChange(i, e.target.value)}
              /> */}
            </div>
          ))}
          <Button type="submit" disabled={mutationLoading}>
            {mutationLoading ? "Updating..." : "Update Campaign"}
          </Button>
          {mutationError && <p>Error: {mutationError.message}</p>}
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default UpdateEmailCampaign;
