import { useState, useEffect } from "react";
import styled from "styled-components";

import * as _ from "lodash";
import { arrayOf, objectOf } from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "next-i18next";
import UpdatedNewBlock from "../blocks/UpdatedNewBlock";

const Button = styled.div`
  width: 170px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 10px;
  background: #000000;
  padding: 10px 10px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  @media (max-width: 800px) {
    width: 65%;
  }
  transition: 0.3s;
  &:hover {
    background: #444444;
  }
`;

const UpdateProblemBuilder = (props) => {
  const { t } = useTranslation("lesson");
  const [values, setValues] = useState(props.steps);

  function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  const getData = (id, type, index) => {
    if (values.find((v) => v.id == id)) {
    } else {
      let new_values = values.map((obj, idx) => {
        let newObj = deepCopy(obj); // Deep copy the object
        newObj.index = idx;
        return newObj;
      });

      new_values[index].id = id;
      new_values[index].type = type;

      // set next id
      if (index - 1 >= 0) {
        new_values[index - 1].next.true.value = id;
        new_values[index - 1].next.true.type = type;

        new_values[index - 1].next.false.value = id;
        new_values[index - 1].next.false.type = type;
      }

      setValues([...new_values]);
      props.getSteps([...new_values]);
    }
  };

  const add = (id, i) => {
    let new_values = values.map((obj, index) => {
      return { ...obj, index };
    });

    const index = new_values.findIndex((object) => {
      return object.index === i;
    });

    new_values.splice(i + 1, 0, {
      id: "temp",
      index: index + 1,
      type: "",
      next: {
        true: {
          value: null,
          type: null,
        },
        false: {
          value: null,
          type: null,
        },
      },
    });
    setValues([...new_values]);
  };

  const remove = (indexToRemove) => {
    const new_values = values.filter((v) => v.id !== indexToRemove);
    setValues(new_values);
    props.getSteps([...new_values]);
  };
  return (
    <>
      <Button onClick={(e) => add()}>Add first</Button>
      {values.map((s, i) => {
        const updatedObject = { ...s, index: i };

        let found_data = [
          ...props.lesson.notes,
          ...props.lesson.quizes,
          ...props.lesson.newTests,
        ].find((el) => el.id == s.id);

        return (
          <UpdatedNewBlock
            key={updatedObject.id}
            values={values}
            obj={updatedObject}
            type={updatedObject.type}
            data={found_data}
            index={i}
            getData={getData}
            add={add}
            remove={remove}
            lesson={props.lesson}
            me={props.me}
          />
        );
      })}
    </>
  );
};

export default UpdateProblemBuilder;
