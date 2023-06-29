import { useState, useEffect } from "react";
import TestBlock from "../lesson/problems/TestBlock";
import * as _ from "lodash";
import { arrayOf, objectOf } from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "next-i18next";

import NewBlock from "./blocks/NewBlock";

const NewProblemBuilder = (props) => {
  const { t } = useTranslation("lesson");

  const [values, setValues] = useState([
    {
      id: "temp",
      index: 0,
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
    },
  ]);

  const getData = (id, type, index) => {
    let new_values = values;
    new_values.find((el) => el.index == index).id = id;
    new_values.find((el) => el.index == index).type = type;

    // set next id
    if (index - 1 >= 0) {
      new_values.find((el) => el.index == index - 1).next.true.value = id;
      new_values.find((el) => el.index == index - 1).next.true.type = type;

      new_values.find((el) => el.index == index - 1).next.false.value = id;
      new_values.find((el) => el.index == index - 1).next.false.type = type;
    }
    setValues([...new_values]);
    props.getSteps([...new_values]);
  };

  const add = (id, i) => {
    let new_values = [...values];
    const index = new_values.findIndex((object) => {
      return object.index === i;
    });
    new_values.splice(index + 1, 0, {
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
  return (
    <>
      {values.map((s, i) => (
        <NewBlock
          values={values}
          obj={s}
          index={i}
          getData={getData}
          add={add}
          lesson={props.lesson}
          me={props.me}
        />
      ))}
    </>
  );
};

export default NewProblemBuilder;
