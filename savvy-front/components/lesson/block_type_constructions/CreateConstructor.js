import { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { SINGLE_LESSON_QUERY } from "../../lesson/SingleLesson";
import {
  Row,
  SettingsBlock,
  ActionButton,
  SecondaryButton,
  MicroButton,
  Buttons,
} from "../styles/DevPageStyles";
import { autoResizeTextarea } from "../SimulatorDevelopmentFunctions";
import Loading from "../../layout/Loading";

const CREATE_CONSTRUCTION_MUTATION = gql`
  mutation CREATE_CONSTRUCION_MUTATION(
    $name: String!
    # $variants: [String]
    # $answer: [String]
    # $hint: String
    $columnsNum: Int
    $elements: ConstructionElementsListInput
    # $type: String!
    # $text: String!
    # $hasText: Boolean!
    $lessonId: String!
  ) {
    createConstruction(
      name: $name
      lessonId: $lessonId
      # variants: $variants
      # answer: $answer
      # hint: $hint
      columnsNum: $columnsNum
      elements: $elements # hasText: $hasText # text: $text # type: $type
    ) {
      id
      name
      lessonId
      columnsNum
      elements {
        elements {
          type
          value
          text
          comment
          place
          size
          rows
          inDoc
          isTest
          edit
          borders {
            top
            bottom
            left
            right
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 10px;
`;

const Block = styled.div`
  width: 900px;
  height: auto;
  display: grid;
  column-gap: 10px;
  row-gap: 10px;
  grid-template-columns: ${(props) => {
    return `repeat(${props.columns}, 1fr)`;
  }};
  grid-template-rows: auto;
`;

const Element = styled.div`
  font-size: 1.6rem;
  width: 100%;
  height: 100%;
  border: 1px dashed #c4c4c4;
  border-top: ${(props) =>
    `1px ${props.borders.top !== "none" ? "solid" : "dashed"} ${
      props.borders.top !== "none" ? "#98A0A6" : "#c4c4c4"
    }`};
  border-right: ${(props) =>
    `1px ${props.borders.right !== "none" ? "solid" : "dashed"} ${
      props.borders.right !== "none" ? "#98A0A6" : "#c4c4c4"
    }`};
  border-bottom: ${(props) =>
    `1px ${props.borders.bottom !== "none" ? "solid" : "dashed"} ${
      props.borders.bottom !== "none" ? "#98A0A6" : "#c4c4c4"
    }`};
  border-left: ${(props) =>
    `1px ${props.borders.left !== "none" ? "solid" : "dashed"} ${
      props.borders.left !== "none" ? "#98A0A6" : "#c4c4c4"
    }`};

  grid-column-start: ${(props) => {
    return props.startColumn;
  }};
  grid-column-end: span ${(props) => props.size};
  grid-row-end: span ${(props) => props.rows};
  img {
    width: 100%;
    height: auto;
  }
  .border-dropdown {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  .border-dropdown button.active {
    background-color: #ddd; /* Gray background to indicate "pressed" */
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); /* Inner shadow for depth */
  }
  .box-container {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 50px;
    height: 50px;
  }

  .box {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s;
    text-align: center;
    line-height: 50px;
    font-size: 10px;
  }

  .up {
    grid-row: 1;
    grid-column: 2;
  }

  .left {
    grid-row: 2;
    grid-column: 1;
  }

  .right {
    grid-row: 2;
    grid-column: 3;
  }

  .down {
    grid-row: 3;
    grid-column: 2;
  }

  .button {
    border: none;
    background: none;
    /* width: 30px; */
    height: 30px;
    font-size: 1.2rem;
    display: flex;
    cursor: pointer;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: ease 0.3s;
  }
`;

const Settings = styled.div`
  border-bottom: 1px dashed #c4c4c4;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  .box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const sample_construction = {
  columnsNum: 3,
  elements: [
    {
      place: 0,
      inDoc: true,
      isTest: false,
      size: 0,
      rows: 1,
      text: "<p><b>Instrument</b></p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "1px solid #98A0A6",
        left: "none",
      },
    },
    {
      place: 1,
      inDoc: true,
      isTest: false,
      size: 0,
      rows: 1,
      text: "<p><b>Description</b></p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "1px solid #98A0A6",
        left: "none",
      },
    },
    {
      place: 2,
      inDoc: true,
      isTest: false,
      size: 0,
      rows: 1,
      text: "<p><b>Template wording</b></p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "none",
        left: "none",
      },
    },
    {
      place: 3,
      inDoc: true,
      isTest: true,
      size: 0,
      rows: 1,
      text: "<p>Indemnity</p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "1px solid #98A0A6",
        left: "none",
      },
    },
    {
      place: 4,
      inDoc: true,
      isTest: false,
      size: 0,
      rows: 1,
      text: "<p>A contractual obligation by one party to compensate the other for any specific losses or damages incurred, typically arising from breaches of warranties or other specified events.</p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "1px solid #98A0A6",
        left: "none",
      },
    },
    {
      place: 5,
      inDoc: true,
      isTest: true,
      size: 0,
      rows: 1,
      text: '<p><em>The Seller hereby agrees to indemnify, defend, and hold harmless the Purchaser, the Company, its affiliates, and their respective officers, directors, employees, agents, and representatives (collectively, the "Indemnified Parties") from and against any and all losses, liabilities, damages, costs, expenses (including reasonable attorneys\' fees), fines, penalties, claims, demands, actions, or proceedings (collectively, "Losses") arising out of or relating to any non-compliance, breach, or violation of the Dietary Safety and Allergen Awareness Act 2024 (DSAAA 2024) by the Company, its subsidiaries, or any of their respective operations, products, or services, whether such non-compliance, breach, or violation occurs before, on, or after the Closing Date. This indemnity shall include, but is not limited to, any Losses resulting from regulatory actions, recalls, customer claims, or any other liabilities directly or indirectly attributable to the DSAAA 2024.</em></p>',
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "none",
        left: "none",
      },
    },
    {
      place: 6,
      inDoc: true,
      isTest: true,
      size: 0,
      rows: 1,
      text: "<p>Purchase Price Adjustment / Consideration Adjustment</p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "1px solid #98A0A6",
        left: "none",
      },
    },
    {
      place: 7,
      inDoc: true,
      isTest: true,
      size: 0,
      rows: 1,
      text: "<p>A purchase price adjustment due to an identified due diligence issue in a share purchase agreement is a mechanism that modifies the final purchase price based on the findings from due diligence, protecting the buyer from overpaying for the company by accounting for any discovered liabilities or discrepancies.</p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "1px solid #98A0A6",
        left: "none",
      },
    },
    {
      place: 8,
      inDoc: true,
      isTest: false,
      size: 0,
      rows: 1,
      text: "<p><em>The Purchase Price for the Company shall be calculated as follows:</em></p><p><em>Purchase Price=Headline Price−DSAAA 2024 Compliance Cost</em></p><p><em>where:</em></p><p><em><b>Headline Price</b></em><em> is GBP 10,000,000.</em></p><p><em><b>DSAAA 2024 Compliance Cost</b></em><em> is GBP 1,500,000, representing the estimated cost for the Company to become fully compliant with the Dietary Safety and Allergen Awareness Act 2024 (DSAAA 2024).</em></p><p><em>Therefore, the Purchase Price shall be: Purchase Price = 10,000,000 − 1,500,000 = 8,500,000 GBP</em></p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "none",
        left: "none",
      },
    },
    {
      place: 9,
      inDoc: true,
      isTest: false,
      size: 0,
      rows: 1,
      text: "<p>Warranty</p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "1px solid #98A0A6",
        left: "none",
      },
    },
    {
      place: 10,
      inDoc: true,
      isTest: true,
      size: 0,
      rows: 1,
      text: "<p>A contractual assurance provided by the seller regarding the accuracy of certain statements about the company being sold, protecting the buyer against any misrepresentations or undisclosed or unknown risk or liabilities.</p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "1px solid #98A0A6",
        left: "none",
      },
    },
    {
      place: 11,
      inDoc: true,
      isTest: true,
      size: 0,
      rows: 1,
      text: "<p><em>The Seller warrants and represents to the Purchaser that the Company, including all its subsidiaries and affiliates, is and has always been in full compliance with all applicable provisions of the Dietary Safety and Allergen Awareness Act 2024 (DSAAA 2024). This includes, but is not limited to, compliance with all regulations, standards, and requirements related to food safety, allergen awareness, labeling, and reporting obligations as mandated by the DSAAA 2024. The Seller further warrants that there are no existing, pending, or threatened claims, investigations, or proceedings against the Company relating to any alleged non-compliance with the DSAAA 2024, and that the Company has implemented all necessary policies, procedures, and controls to ensure ongoing compliance with the DSAAA 2024.</em></p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "none",
        left: "none",
      },
    },
    {
      place: 12,
      inDoc: true,
      isTest: false,
      size: 0,
      rows: 1,
      text: "<p>Condition Precedent</p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "1px solid #98A0A6",
        left: "none",
      },
    },
    {
      place: 13,
      inDoc: true,
      isTest: true,
      size: 0,
      rows: 1,
      text: "<p>A specific event or action that must occur or be completed before the parties are obligated to close the transaction, protecting against the risk of proceeding with the sale without certain critical requirements being met.</p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "1px solid #98A0A6",
        left: "none",
      },
    },
    {
      place: 14,
      inDoc: true,
      isTest: true,
      size: 0,
      rows: 1,
      text: "<p><em>The obligation of the Purchaser to proceed with the Closing is subject to the satisfaction or waiver, on or before the Closing Date, of the following condition precedent:</em></p><p><em>The Company shall be in full compliance with all applicable provisions of the Dietary Safety and Allergen Awareness Act 2024 (DSAAA 2024). This includes, but is not limited to, the implementation of all required policies, procedures, and controls necessary to ensure compliance with the DSAAA 2024. The Company shall provide the Purchaser with satisfactory evidence of such compliance, including any certifications, reports, or other documentation as may be reasonably requested by the Purchaser. In the event that the Company is not in full compliance with the DSAAA 2024 by the Closing Date, the Purchaser shall have the right to terminate this Agreement without any liability or obligation to the Seller.</em></p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "1px solid #98A0A6",
        right: "none",
        left: "none",
      },
    },
    {
      place: 15,
      inDoc: true,
      isTest: true,
      size: 0,
      rows: 1,
      text: "<p>Pre-Completion or Post-Completion Undertaking / Covenant</p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "none",
        right: "1px solid #98A0A6",
        left: "none",
      },
    },
    {
      place: 16,
      inDoc: true,
      isTest: false,
      size: 0,
      rows: 1,
      text: "<p>A pre-completion or post-completion undertaking resolving an identified due diligence issue in a share purchase agreement is a commitment by the seller to address and rectify specific issues discovered during due diligence after the transaction has closed, protecting the buyer from potential risks and liabilities associated with those unresolved matters</p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "none",
        right: "1px solid #98A0A6",
        left: "none",
      },
    },
    {
      place: 17,
      inDoc: true,
      isTest: true,
      size: 0,
      rows: 1,
      text: "<p><em>The Seller undertakes that, no later than three (3) months after the Closing Date, the Company shall be in full compliance with all applicable provisions of the Dietary Safety and Allergen Awareness Act 2024 (DSAAA 2024). This includes, but is not limited to, the implementation of all required policies, procedures, and controls necessary to ensure compliance with the DSAAA 2024. The Seller further undertakes to provide the Purchaser with satisfactory evidence of such compliance, including any certifications, reports, or other documentation as may be reasonably requested by the Purchaser. In the event that the Company fails to achieve full compliance with the DSAAA 2024 within the specified timeframe, the Seller agrees to indemnify and hold harmless the Purchaser for any losses, liabilities, damages, costs, or expenses (including reasonable attorneys' fees) arising from such non-compliance.</em></p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        bottom: "none",
        right: "none",
        left: "none",
      },
    },
  ],
};

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const CreateConstructor = (props) => {
  const { jsonCharactersString, jsonStoryString, previousStories } = props;
  const [name, setName] = useState("");
  const [columnsNum, setColumnsNum] = useState(3);
  const [startingColumns, setStartingColumns] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [elements, setElements] = useState([
    {
      place: 0,
      inDoc: true,
      isTest: false,
      size: 0,
      rows: 1,
      text: "<p></p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        right: "none",
        bottom: "none",
        left: "none",
      },
    },
    {
      place: 1,
      inDoc: true,
      isTest: false,
      size: 0,
      rows: 1,
      text: "<p></p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        right: "none",
        bottom: "none",
        left: "none",
      },
    },
    {
      place: 2,
      inDoc: true,
      isTest: false,
      size: 0,
      rows: 1,
      text: "<p></p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        right: "none",
        bottom: "none",
        left: "none",
      },
    },
  ]);

  let mod_el = {
    place: 2,
    inDoc: true,
    isTest: false,
    size: 0,
    rows: 1,
    text: "<p></p>",
    type: "",
    value: "",
    borders: {
      top: "none",
      right: "none",
      bottom: "none",
      left: "none",
    },
  };

  const { t } = useTranslation("lesson");

  const getData = (val, i) => {
    const new_elements = [...elements];
    new_elements[i] = val;
    setElements(new_elements);
  };

  const { lessonID } = props;

  // --- NEW: useMutation hook ---
  const [createConstruction, { loading, error }] = useMutation(
    CREATE_CONSTRUCTION_MUTATION,
    {
      variables: {
        lessonId: lessonID,
        name,
        columnsNum,
        elements: { elements: elements },
      },
      refetchQueries: [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonID },
        },
      ],
    }
  );

  const generateConstruction = async (e) => {
    e.preventDefault();
    let chatPrompt = `
        You are building a block of a simulator that has the following background: """${previousStories.join(
          "\n"
        )}""", 
        and the following current story: """${jsonStoryString}"""
        The main character of the simulator are: """${jsonCharactersString}"""

        This block type is a Constructor, presenting a student with a chance to build a document using the building blocks offered by the simulator.
        You receive this instructions that are used to make a Constructor: """${prompt}"""
        Develop the Constructor based on the simualtor story. Make sure that it alisgn with the context of current story and background.  

        Every block looks like this: """${JSON.stringify(mod_el, null, 2)}""".
        – "inDoc" property defines whether the block is a part of the document (true value) or not, is only provided in the recommendations section and is only used to confuse the student (false value).
        - "isTest" property defines whether the block should be chosen by the student and added to the document (true value) or is a part of the document from the start (false value).
        – "size" defines how many columns the block spans (by default 1)
        – "rows" defines how many rows the block spans (by default 1)
        – "text" defines the text inside the block
        - borders are used to separate one blcok from another

        You should also defind the number of columns. In most scenarios the number of columsn is 1.
        But it can be 2 or 3 when you to build tables or other complex parts of the document.

        Return the result in a JSON that looks like this: 
        
        Example 1. """${JSON.stringify(sample_construction, null, 2)}"""
    `;

    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: chatPrompt }),
      });
      const data = await response.json();
      if (response.ok) {
        let new_construction = JSON.parse(data.result.content);
        console.log("new_construction", new_construction);
        setElements(new_construction.elements);
        setColumnsNum(new_construction.columnsNum);
        // setText(new_case_study.introductory_text);
        // let updatedQuestions = await updateQuestions(e, new_case_study.steps);
        // setGeneratedSteps(
        //   updatedQuestions ? updatedQuestions : new_case_study.steps
        // );
        // return data;
      } else {
        throw new Error(
          data.error.message || "An error occurred during your request."
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Styles>
      <SettingsBlock>
        <Row>
          <div className="description">Name</div>
          <div className="action_area">
            <input
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
              placeholder="Untitled"
            />
            <div className="explainer">
              The name will be used for navigation
            </div>
          </div>
        </Row>
        <Row>
          <div className="description">Prompt</div>
          <div className="action_area">
            <textarea
              onChange={(e) => {
                setPrompt(e.target.value), autoResizeTextarea(e);
              }}
            />
            <ActionButton
              onClick={async (e) => {
                setGenerating(true);
                const res = await generateConstruction(e);
                setGenerating(false);
              }}
            >
              {!generating ? "Generate with AI" : "..."}
            </ActionButton>
          </div>
        </Row>
        <Row>
          <div className="description">Number of columns</div>
          <div className="action_area">
            <input
              type="number"
              max="30"
              defaultValue={columnsNum}
              onChange={(e) => setColumnsNum(parseInt(e.target.value))}
            />
          </div>
        </Row>
        <Row>
          <div className="description">Number of blocks</div>
          <div className="action_area">
            <Buttons gapSize="10px" margin="0">
              <SecondaryButton
                onClick={() => {
                  const arr = [...elements];
                  arr.pop();
                  setElements(arr);
                }}
              >
                -
              </SecondaryButton>
              <SecondaryButton
                onClick={() => {
                  const index = elements.length;
                  const new_el = { ...mod_el };
                  new_el.place = index;
                  setElements([...elements, new_el]);
                }}
              >
                +
              </SecondaryButton>
            </Buttons>
          </div>
        </Row>
      </SettingsBlock>
      {generating && <Loading />}
      {!generating && (
        <Block columns={columnsNum}>
          {elements.map((el, i) => (
            <ConElement
              key={i}
              el={el}
              startColumn={startingColumns[i]}
              className={"header" + i}
              id={i + 1}
              i={i}
              getData={getData}
            />
          ))}
        </Block>
      )}
      <ActionButton
        onClick={async (e) => {
          e.preventDefault();
          try {
            const res = await createConstruction();
            props.getResult(res);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {loading ? t("saving") : t("save")}
      </ActionButton>
    </Styles>
  );
};

export default CreateConstructor;

const ConElement = (props) => {
  const [el, setEl] = useState(props.el);
  const [borders, setBorders] = useState({
    top: "none",
    right: "none",
    bottom: "none",
    left: "none",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const myCallback = (dataFromChild, index) => {
    let new_el = { ...el };
    new_el.text = dataFromChild;
    setEl(new_el);
    props.getData(new_el, props.i);
  };

  return (
    <Element size={el.size} rows={el.rows} borders={borders}>
      <Settings>
        <div className="box">
          <input
            type="checkbox"
            checked={el.isTest}
            onClick={(e) => {
              let new_el = { ...el };
              new_el.isTest = e.target.checked;
              setEl(new_el);
              props.getData(new_el, props.i);
            }}
          />
          <label for="vehicle3">✅</label>
        </div>

        <div className="box">
          <input
            type="checkbox"
            checked={!el.inDoc}
            onClick={(e) => {
              let new_el = { ...el };
              new_el.inDoc = !e.target.checked;
              setEl(new_el);
              props.getData(new_el, props.i);
            }}
          />
          <label for="vehicle3">⛔️</label>
        </div>
        <div className="box-container">
          <div
            className="box up"
            onClick={(e) => {
              let new_el = { ...el };
              let new_rows = new_el.rows;
              if (el.rows == 1) {
                new_rows = 1;
              } else {
                new_rows = new_rows - 1;
              }
              new_el.rows = new_rows;

              setEl(new_el);
              props.getData(new_el, props.i);
            }}
          >
            <div> ⬆️ </div>
          </div>
          <div
            className="box left"
            onClick={(e) => {
              let new_el = { ...el };
              let new_size = new_el.size;
              if (el.size == 0) {
                new_size = 0;
              } else {
                new_size = new_size - 1;
              }
              new_el.size = new_size;

              setEl(new_el);
              props.getData(new_el, props.i);
            }}
          >
            <div> ⬅️ </div>
          </div>
          <div
            className="box right"
            onClick={(e) => {
              let new_el = { ...el };
              let new_size = new_el.size;
              if (el.size == 0) {
                new_size = 2;
              } else {
                new_size = new_size + 1;
              }
              new_el.size = new_size;

              setEl(new_el);
              props.getData(new_el, props.i);
            }}
          >
            <div> ➡️ </div>
          </div>

          <div
            className="box down"
            onClick={(e) => {
              let new_el = { ...el };
              let new_rows = new_el.rows + 1;
              new_el.rows = new_rows;

              setEl(new_el);
              props.getData(new_el, props.i);
            }}
          >
            <div> ⬇️ </div>
          </div>
        </div>
        <div>
          <button onClick={toggleDropdown}>Set Borders</button>
          {dropdownOpen && (
            <div className="border-dropdown">
              <button
                onClick={() => {
                  const updatedEl = {
                    ...borders,
                    top: borders.top === "none" ? "1px solid #98A0A6" : "none",
                  };
                  setBorders(updatedEl);
                  let new_el = { ...el };
                  new_el.borders = updatedEl;
                  setEl(new_el);
                  props.getData(new_el, props.i);
                }}
                className={borders.top !== "none" ? "active" : ""}
              >
                Top Border
              </button>
              <button
                onClick={() => {
                  const updatedEl = {
                    ...borders,
                    right:
                      borders.right === "none" ? "1px solid #98A0A6" : "none",
                  };
                  setBorders(updatedEl);
                  let new_el = { ...el };
                  new_el.borders = updatedEl;
                  setEl(new_el);
                  props.getData(new_el, props.i);
                }}
                className={borders.right !== "none" ? "active" : ""}
              >
                Right Border
              </button>
              <button
                onClick={() => {
                  const updatedEl = {
                    ...borders,
                    bottom:
                      borders.bottom === "none" ? "1px solid #98A0A6" : "none",
                  };
                  setBorders(updatedEl);
                  let new_el = { ...el };
                  new_el.borders = updatedEl;
                  setEl(new_el);
                  props.getData(new_el, props.i);
                }}
                className={borders.bottom !== "none" ? "active" : ""}
              >
                Bottom Border
              </button>
              <button
                onClick={() => {
                  const updatedEl = {
                    ...borders,
                    left:
                      borders.left === "none" ? "1px solid #98A0A6" : "none",
                  };
                  setBorders(updatedEl);
                  let new_el = { ...el };
                  new_el.borders = updatedEl;
                  setEl(new_el);
                  props.getData(new_el, props.i);
                }}
                className={borders.left !== "none" ? "active" : ""}
              >
                Left Border
              </button>
            </div>
          )}
        </div>
      </Settings>
      <DynamicLoadedEditor
        onChange={(e) => updateEl(e.target.value)}
        getEditorText={myCallback}
        value={el.text}
      />
    </Element>
  );
};
