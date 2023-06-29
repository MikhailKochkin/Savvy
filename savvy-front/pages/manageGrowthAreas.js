import React, { useState } from "react";
import GrowthAreaForm from "../components/GrowthAreaForm";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_GROWTH_AREAS = gql`
  query GetGrowthAreas {
    growthAreas {
      id
      name
      maxProgress
      marks
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  width: 50%;
  margin: 50px 0;
`;

const ManageGrowthAreas = () => {
  const [selectedGrowthArea, setSelectedGrowthArea] = useState(null);

  const { data, loading, error } = useQuery(GET_GROWTH_AREAS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const growthAreas = data.growthAreas;

  // Implement your logic for fetching growth areas and handling create/update success

  return (
    <Styles>
      <Container>
        <h1>Manage Growth Areas</h1>

        <h2>Update Growth Areas</h2>
        {growthAreas.map((growthArea) => (
          <li
            key={growthArea.id}
            onClick={() => setSelectedGrowthArea(growthArea)}
          >
            {growthArea.name}
          </li>
        ))}
        {selectedGrowthArea && (
          <GrowthAreaForm isEditMode={true} growthArea={selectedGrowthArea} />
        )}

        <h2>Create Growth Area</h2>
        <GrowthAreaForm isEditMode={false} />
      </Container>
    </Styles>
  );
};

export default ManageGrowthAreas;
