import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";

import {
  Buttons,
  Title,
  ActionButton,
  SecondaryButton,
  MicroButton,
  Row,
  Frame,
} from "./../styles/DevPageStyles";
import { autoResizeTextarea } from "../SimulatorDevelopmentFunctions";
import { set } from "lodash";

// GraphQL mutations
const CREATE_CHARACTER = gql`
  mutation CreateCharacter(
    $name: String!
    $image: String!
    $description: String!
    $coursePageId: String!
  ) {
    createCharacter(
      name: $name
      image: $image
      description: $description
      coursePageId: $coursePageId
    ) {
      id
      name
      image
      description
    }
  }
`;

const UPDATE_CHARACTER = gql`
  mutation UpdateCharacter(
    $id: String!
    $name: String
    $image: String
    $description: String
  ) {
    updateCharacter(
      id: $id
      name: $name
      image: $image
      description: $description
    ) {
      id
      name
      image
      description
    }
  }
`;

const SingleCharacterStyles = styled.div`
  border-bottom: 2px solid #f1f1f1;
  padding-bottom: 20px;
  margin-bottom: 30px;
  .character_image_icon {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
`;

const CharacterManagement = (props) => {
  const {
    character,
    removeCharacter,
    index,
    coursePageId,
    passUpdatedCharacters,
  } = props;

  const [name, setName] = useState(character?.name || "");
  const [description, setDescription] = useState(character?.description || "");
  const [image, setImage] = useState(character?.image || "");
  const [imageUploading, setImageUploading] = useState(false);

  // GraphQL hooks
  const [createCharacterMutation, { loading: createLoading }] =
    useMutation(CREATE_CHARACTER);
  const [updateCharacterMutation, { loading: updateLoading }] =
    useMutation(UPDATE_CHARACTER);
  const isLoading = createLoading || updateLoading;

  // Mutation hooks
  const handleCreateCharacter = () => {
    createCharacterMutation({
      variables: {
        name,
        image,
        description,
        coursePageId, // Replace with actual coursePageId
      },
    })
      .then((result) => {
        // Handle successful character creation
        console.log("Character created:", result.data.createCharacter);
        passUpdatedCharacters(result.data.createCharacter);
        setName("");
        setDescription("");
        setImage("");
      })
      .catch((error) => {
        // Handle error
        console.error("Error creating character:", error);
      });
  };

  const handleUpdateCharacter = () => {
    updateCharacterMutation({
      variables: {
        id: character.id,
        name,
        image,
        description,
      },
    })
      .then((result) => {
        // Handle successful character update
        console.log("Character updated:", result.data.updateCharacter);
        passUpdatedCharacters(result.data.updateCharacter);
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating character:", error);
      });
  };

  // Remove a character
  const deleteCharacter = (index) => {
    removeCharacter(index);
  };

  const uploadImage = async (e, characterIndex) => {
    setImageUploading(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "savvy-app");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/mkpictureonlinebase/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);

    // Update image field locally and via mutation
    setImageUploading(false);
  };

  return (
    <SingleCharacterStyles>
      <Row>
        <div className="description">Name</div>
        <div className="action_area">
          <input
            name={`character_name_${index}`}
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <Buttons margin="10px 0 0 0">
            <MicroButton onClick={() => deleteCharacter(index)}>
              Remove Character
            </MicroButton>
          </Buttons>
        </div>
      </Row>
      <Row>
        <div className="description">
          <div>
            {image && (
              <img
                className="character_image_icon"
                src={image}
                alt="character"
              />
            )}
          </div>
        </div>
        <div className="action_area">
          <input
            name={`character_image_${index}`}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            value={image}
            placeholder="image url"
          />
          <input
            type="file"
            onChange={(e) => {
              uploadImage(e, index);
            }}
            style={{ display: "none" }}
            id={`characterImageUpload_${index}`}
          />
          <label htmlFor={`characterImageUpload_${index}`}>
            <Buttons margin="10px 0 0 0">
              <MicroButton as="span">
                {imageUploading ? "Uploading..." : "Upload"}
              </MicroButton>
            </Buttons>
          </label>
        </div>
      </Row>
      <Row>
        <div className="description">Description</div>
        <div className="action_area">
          <input
            name={`character_desc_${index}`}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          />
        </div>
      </Row>
      <Buttons margin="10px 0">
        {!character?.id && (
          <ActionButton onClick={handleCreateCharacter}>
            {createLoading ? "..." : "Create"}
          </ActionButton>
        )}
        {character?.id && (
          <ActionButton onClick={handleUpdateCharacter}>
            {updateLoading ? "..." : "Update"}
          </ActionButton>
        )}
      </Buttons>
    </SingleCharacterStyles>
  );
};

export default CharacterManagement;
