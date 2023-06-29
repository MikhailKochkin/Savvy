import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const CREATE_GROWTH_AREA = gql`
  mutation CreateGrowthArea(
    $name: String!
    $maxProgress: Int
    $marks: MarksList
  ) {
    createGrowthArea(name: $name, maxProgress: $maxProgress, marks: $marks) {
      id
      name
      maxProgress
      marks
    }
  }
`;

const UPDATE_GROWTH_AREA = gql`
  mutation UpdateGrowthArea(
    $id: String!
    $name: String!
    $maxProgress: Int
    $marks: MarksList
  ) {
    updateGrowthArea(
      id: $id
      name: $name
      maxProgress: $maxProgress
      marks: $marks
    ) {
      id
      name
      maxProgress
      marks
    }
  }
`;

const GrowthAreaForm = ({ growthArea, onSuccess, isEditMode }) => {
  const [name, setName] = useState(growthArea?.name || "");
  const [maxProgress, setMaxProgress] = useState(growthArea?.maxProgress || "");
  const [marks, setMarks] = useState(growthArea?.marks?.marksList ?? []);
  // Add a function to handle adding new marks to the marks array:

  useEffect(() => {
    setName(growthArea?.name || "");
    setMaxProgress(growthArea?.maxProgress || "");
    setMarks(growthArea?.marks?.marksList ?? []);
  }, [growthArea]);

  const addMark = () => {
    setMarks([...marks, { level: "", name: "", message: "" }]);
  };

  const updateMark = (index, updatedMark) => {
    const updatedMarks = [...marks];
    updatedMarks[index] = updatedMark;
    setMarks(updatedMarks);
  };

  const removeMark = (index) => {
    const updatedMarks = marks.filter((_, i) => i !== index);
    setMarks(updatedMarks);
  };

  const [createGrowthArea, { loading: createLoading, error: createError }] =
    useMutation(CREATE_GROWTH_AREA, {
      variables: { name, maxProgress, marks },
      // ... other options
    });

  const [updateGrowthArea, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_GROWTH_AREA, {
      variables: {
        id: growthArea ? growthArea.id : null,
        name,
        maxProgress,
        marks,
      },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      await updateGrowthArea({
        variables: {
          id: growthArea.id,
          name,
          maxProgress: parseInt(maxProgress),
          marks: { marksList: marks },
        },
      });
    } else {
      await createGrowthArea({
        variables: {
          name,
          maxProgress: parseInt(maxProgress),
          marks: { marksList: marks },
        },
      });
    }

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="maxProgress">Max Progress:</label>
        <input
          type="number"
          id="maxProgress"
          value={maxProgress}
          onChange={(e) => setMaxProgress(e.target.value)}
          required
        />
      </div>
      {/* Remove the nested form */}
      <div className="marks">
        <h4>Marks</h4>
        {marks.map((mark, index) => (
          <MarkInput
            key={index}
            index={index}
            mark={mark}
            onRemove={removeMark}
            onUpdate={updateMark}
          />
        ))}
        <button type="button" onClick={addMark}>
          Add mark
        </button>
      </div>

      <button type="submit">
        {isEditMode ? "Update" : "Create"} Growth Area
      </button>
    </form>
  );
};

const MarkInput = ({ index, mark, onRemove, onUpdate }) => {
  const { level, name, message } = mark;

  const handleChange = (e) => {
    onUpdate(index, {
      ...mark,
      [e.target.name]:
        e.target.name == "level" ? parseInt(e.target.value) : e.target.value,
    });
  };

  return (
    <div className="mark-input">
      <input
        type="number"
        name="level"
        value={level}
        onChange={handleChange}
        placeholder="Level"
      />
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="message"
        value={message}
        onChange={handleChange}
        placeholder="Message"
      />

      <button type="button" onClick={() => onRemove(index)}>
        Remove
      </button>
    </div>
  );
};

export default GrowthAreaForm;
