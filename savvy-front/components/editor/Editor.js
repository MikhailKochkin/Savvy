export const thisIsAnUnusedExport =
  "this export only exists to disable fast refresh for this file";

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import isUrl from "is-url";
import {
  createEditor,
  Editor,
  Range,
  Point,
  Transforms,
  Text,
  Element as SlateElement,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  useSlateStatic,
  useSlate,
  ReactEditor,
  useFocused,
  useSelected,
} from "slate-react";
// import { Slate, Editable, withReact, useSlateStatic } from "slate-react";
import { withHistory } from "slate-history";
import escapeHtml from "escape-html";
import { css } from "emotion";
import styled from "styled-components";
import { jsx } from "slate-hyperscript";
import { IconContext } from "react-icons";
import {
  BiBold,
  BiUnderline,
  BiHeading,
  BiItalic,
  BiLinkAlt,
  BiListOl,
  BiListUl,
  BiVideoPlus,
  BiImageAdd,
  BiHighlight,
  BiCommentAdd,
  BiCommentError,
  BiCommentCheck,
  BiCommentMinus,
  BiAlignRight,
  BiAlignMiddle,
  BiCommentDots,
  BiCustomize,
  BiTable,
} from "react-icons/bi";
import { LuHeading2, LuHeading3, LuSquareSquare } from "react-icons/lu";
import { FaQuoteLeft } from "react-icons/fa";
import { withTable, TableEditor } from "slate-table";

import { useTranslation } from "next-i18next";
import Modal from "styled-react-modal";
import isHotkey from "is-hotkey";

import FormatToolBar from "./FormatToolbar";
import CreateQuiz from "../lesson/block_type_quizes/CreateQuiz";
import SingleQuiz from "../lesson/block_type_quizes/SingleQuiz";
import CreateNote from "../lesson/block_type_notes/CreateNote";
import SingleNote from "../lesson/block_type_notes/Note";
import CreateNewTest from "../lesson/block_type_tests/CreateNewTest";
import SingleTest from "../lesson/block_type_tests/SingleTest";
import { Row, SecondaryButton } from "../lesson/styles/DevPageStyles";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ delete: true }),
  INS: () => ({ insert: true }),
  I: () => ({ italic: true }),
  EM: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  B: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

const AppStyles = {
  color: "rgb(17, 17, 17)",
  maxWidth: "600px",
  width: "100%",
  backgroundColor: "rgb(255, 255, 255)",
  border: "1px solid #EDEFED",
  boxShadow: "rgba(118, 143, 255, 0.1) 0px 16px 24px 0px",
  padding: "20px 40px",
  margin: "25px auto 25px",
  borderRadius: "4.5px",
  fontSize: "1.6rem",
  outline: "none",
};

const TableButtons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const TableButtonStyles = styled.button`
  margin-right: 10px;
  margin-bottom: 10px;
`;

const ButtonStyle = styled.button`
  padding: 7px;
  margin: 3px;
  border-radius: 5px;
  outline: none;
  width: 37px;
  border: none;
  border: 1px solid #787878;
  &:hover {
    background: #112862;
    color: white;
  }
  .react-icons {
    width: 100px;
  }
  &#editor-tooltip {
    font-family: Montserrat;
    font-size: 1.2rem;
    color: #e4e4e4;
    padding: 5px 10px;
    background-color: #0f0f0f;
    border-radius: 5px;
  }
`;

const Quiz = styled.span`
  color: #736ced;
`;

const Question = styled.div`
  background: #f5f5f5;
  padding: 15px 20px;
  border-radius: 20px;
`;

const Table = styled.table`
  width: 100%;
  /* border: 1px solid red; */
  border-collapse: collapse;
  border-spacing: 0;
  margin: 20px 0;
  p {
    margin: 0;
  }
  tbody {
    border-color: #fff;
    border: none;
    padding: 0px;
    border-collapse: collapse;
  }
  tr {
    border: 1px solid #edefed;
    padding: 0px;
    border-collapse: collapse;
  }
  thead {
    background: #f5f5f5;
    font-weight: bold;
    padding: 0px;
    border-collapse: collapse;
  }
  th {
    border: 1px solid #edefed;
    padding: 0px;
    border-collapse: collapse;
  }
  td {
    border: 1px solid #edefed;
    border-top: none;
    border-collapse: collapse;

    border-bottom: none;
    border-right: none;
    position: relative;
    min-width: 30px;
    padding: 10px;

    p {
      margin: 0;
      border-color: none;
    }
  }
`;
const Link = styled.a`
  border-bottom: 2px solid #26ba8d;
  padding: 0%;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    /* background: #26ba8d;
    color: #fff;
    padding: 2px 0; */
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 7px;
  margin: 3px;
  border-radius: 5px;
  border: 1px solid #787878;
  background: #efefef;
  outline: none;
  width: 37px;
  height: 37px;
  &:hover {
    background: #112862;
    color: white;
  }
  .react-icons {
    width: 100px;
    /* vertical-align: middle; */
  }
  input {
    display: none;
  }
`;

const Article = styled.div`
  font-size: 1.6rem;
  width: 100%;
  margin: 1% 1%;
  padding: 1% 4%;
  border-left: 3px solid #0094c6;
  p {
    margin: 10px 0;
  }
`;

const Quote = styled.blockquote`
  font-size: 1.6rem;
  width: 100%;
  margin: 1% 1%;
  padding: 1% 4%;
  border-left: 3px solid #0094c6;
  p {
    margin: 10px 0;
  }
`;

const Flag = styled.div`
  color: #008489;
  font-size: 2rem;
  width: 100%;
  margin: 3% 0;
  padding: 3% 8%;
  background-color: #f2fafb;
  border-radius: 5px;
`;

const Right = styled.div`
  width: 100%;
  text-align: right;
`;

const Center = styled.div`
  width: 100%;
  text-align: center;
`;

const Note = styled.span`
  color: #81b29a;
`;

const Conceal = styled.div`
  color: #3a5a40;
`;

const Problem2 = styled.span`
  color: brown;
`;

const Error = styled.span`
  color: #e07a5f;
`;

// 1. Serializer – slate to html

const serialize = (node) => {
  if (Text.isText(node)) {
    let styles = Object.keys(node);
    styles.shift();
    if (styles.length) {
      let text = node.text;
      if (styles.includes("bold")) {
        text = `<b>${text}</b>`;
      }
      if (styles.includes("italic")) {
        text = `<em>${text}</em>`;
      }
      if (styles.includes("underline")) {
        text = `<u>${text}</u>`;
      }
      if (styles.includes("error")) {
        text = `<span className="editor_error" type="error" elementId="${node.elementId}" error_text="${node.error_text}">${text}</span>`;
      }
      if (styles.includes("note")) {
        text = `<span className="editor_note" type="note" text="${node.note}" elementId="${node.elementId}">${text}</span>`;
      }
      if (styles.includes("quiz")) {
        text = `<span className="editor_quiz" type="quiz" elementId="${node.elementId}">${text}</span>`;
      }
      if (styles.includes("problem")) {
        text = `<span className="editor_problem" type="problem" elementId="${node.elementId}">${text}</span>`;
      }
      return text;
    } else {
      return escapeHtml(node.text);
    }
  }
  const children = node.children.map((n) => serialize(n)).join("");

  switch (node.type) {
    case "quote":
      return `<blockquote>${children}</blockquote>`;
    case "question":
      return `<div className="question">${children}</div>`;
    case "flag":
      return `<div className="flag">${children}</div>`;
    case "article":
      return `<blockquote>${children}</blockquote>`;
    case "conceal":
      return `<div id="conceal" data-text="${escapeHtml(
        node.data
      )}">${children}</div>`;
    case "header":
      return `<h2>${children}</h2>`;
    case "headerThree":
      return `<h3>${children}</h3>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "numbered-list":
      return `<ol type="${node.listType || "1"}">${children}</ol>`;
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "right":
      return `<div className="align-right" style="text-align:right">${children}</div>`;
    case "center":
      return `<div className="align-center" style="text-align:center">${children}</div>`;
    case "image":
      return `<img src=${escapeHtml(node.src)} alt="caption_goes_here"/>`;
    case "error":
      return `<span className="editor_error" type="error"  error_text="${node.error_text}" elementId="${node.elementId}">${children}</span>`;
    case "note":
      return `<span className="editor_note" type="note" text="${node.note}" elementId="${node.elementId}">${children}</span>`;
    case "problem":
      return `<span className="editor_problem" type="problem" elementId="${node.elementId}">${children}</span>`;
    case "quiz":
      return `<span className="editor_quiz" type="quiz" elementId="${node.elementId}">${children}</span>`;
    case "video":
      return `<iframe src="${escapeHtml(
        node.src
      )}">${children}</iframe><p></p>`;
    case "link":
      return `<a href="${escapeHtml(
        node.url
      )}" target=”_blank”>${children}</a>`;
    case "table":
      return `<table>${children}</table>`;
    case "table-body":
      return `<tbody>${children}</tbody>`;
    case "table-row":
      return `<tr>${children}</tr>`;
    case "table-head":
      return `<thead>${children}</thead>`;
    case "table-header":
      return `<th>${children}</th>`;
    case "table-cell":
      return `<td>${children}</td>`;
    default:
      return children;
  }
};

// 2. deserialize – html to slate

const deserialize = (el) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === "BR") {
    return "\n";
  }
  const { nodeName } = el;
  let parent = el;

  let children = Array.from(parent.childNodes).map(deserialize).flat();
  // if (children.includes(undefined)) {
  //   return null;
  // }
  // let children = Array.from(el.childNodes).map(deserialize);

  // Handle special cases for <th> and <td> elements

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child) => {
      // if (child.children && child.children[0] && child.children[0].text) {
      //   return jsx("text", attrs, child.children[0].text);
      if (child.children && child.children[0]) {
        return child;
      } else {
        return jsx("text", attrs, child);
      }
    });
  }

  if (el.getAttribute("classname") == "flag") {
    return jsx("element", { type: "flag" }, children);
  }

  if (el.getAttribute("classname") == "question") {
    return jsx("element", { type: "question" }, children);
  }

  if (
    el.getAttribute("classname") == "editor_error" ||
    el.getAttribute("id") == "id"
  ) {
    return jsx(
      "element",
      {
        type: "error",
        elementId: el.getAttribute("elementId"),
        error_text: el.getAttribute("error_text")
          ? el.getAttribute("error_data")
          : el.getAttribute("data"),
        error_data: el.getAttribute("error_data")
          ? el.getAttribute("error_data")
          : el.getAttribute("data"),
        id: "id",
      },
      children.length > 0 ? children : [{ text: "" }]
    );
  }

  if (el.getAttribute("classname") == "article") {
    return jsx("element", { type: "article" }, children);
  }
  if (
    el.getAttribute("classname") == "quiz" ||
    el.getAttribute("classname") == "editor_quiz"
  ) {
    return jsx(
      "element",
      {
        type: "quiz",
        elementId: el.getAttribute("elementId"),
      },
      children.length > 0 ? children : [{ text: "" }]
    );
  }

  if (el.getAttribute("id") == "conceal") {
    return jsx(
      "element",
      { type: "conceal", data: el.getAttribute("data-text") },
      children.length > 0 ? children : [{ text: "" }]
    );
  }

  if (el.getAttribute("classname") == "editor_note") {
    return jsx(
      "element",
      {
        type: "note",
        note: el.getAttribute("text"),
        elementId: el.getAttribute("elementId"),
      },
      children.length > 0 ? children : [{ text: "" }]
    );
  }

  if (el.getAttribute("classname") == "editor_problem") {
    return jsx(
      "element",
      {
        type: "problem",
        elementId: el.getAttribute("elementId"),
      },
      children.length > 0 ? children : [{ text: "" }]
    );
  }

  if (el.getAttribute("classname") == "align-right") {
    return jsx(
      "element",
      { type: "right" },
      children.length > 0 ? children : [{ text: "" }]
    );
  }

  if (el.getAttribute("classname") == "align-center") {
    return jsx(
      "element",
      { type: "center" },
      children.length > 0 ? children : [{ text: "" }]
    );
  }
  const filterObjects = (arr) => {
    return arr.filter(
      (item) =>
        typeof item === "object" && item !== null && !Array.isArray(item)
    );
  };
  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "TABLE":
      return jsx("element", { type: "table" }, children);
    case "BR":
      return "\n";
    case "IFRAME":
      return jsx("element", { type: "video", src: el.src }, [{ text: "" }]);
    case "IMAGE":
      return jsx("element", { type: "image", src: el.src }, [{ text: "" }]);
    case "IMG":
      return jsx("element", { type: "image", src: el.src }, [{ text: "" }]);
    case "BLOCKQUOTE":
      return jsx("element", { type: "quote" }, children);
    case "DIV":
      return jsx("element", { type: "div" }, children);
    case "UL":
      return jsx("element", { type: "bulleted-list" }, children);
    case "OL":
      return jsx(
        "element",
        {
          type: "numbered-list",
          listType: el.getAttribute("type") || "1",
        },
        children
      );
    case "LI":
      return jsx("element", { type: "list-item" }, children);
    case "H2":
      return jsx(
        "element",
        { type: "header" },
        children.length > 0 ? children : [{ text: "" }]
      );
    case "H3":
      return jsx(
        "element",
        { type: "headerThree" },
        children.length > 0 ? children : [{ text: "" }]
      );
    case "P":
      return jsx(
        "element",
        { type: "paragraph" },
        children.length > 0 && children[0] !== undefined
          ? children
          : [{ text: "" }]
      );
    case "A":
      return jsx(
        "element",
        { type: "link", url: el.getAttribute("href") },
        children.length > 0 && children[0] !== undefined
          ? children
          : [{ text: "link" }]
      );
    case "TR":
      return jsx("element", { type: "table-row" }, filterObjects(children));
    case "TBODY":
      return jsx("element", { type: "table-body" }, filterObjects(children));
    case "THEAD":
      return jsx("element", { type: "table-head" }, filterObjects(children));
    case "TH":
      return jsx("element", { type: "table-header" }, children);
    case "TD":
      return jsx("element", { type: "table-cell" }, children);
    default:
      return el.textContent;
  }
};

// 3. Editor Commands

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: (n) => Text.isText(n), split: true }
  );
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const isElementActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
    universal: true,
  });

  return !!match;
};

const uploadFile = async (e, editor) => {
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
  let link = file.secure_url;
  editor.insertNode({
    type: "image",
    src: link,
    children: [{ text: "" }],
  });
  editor.insertNode({
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  });
};

const toggleElement = (editor, format) => {
  const isActive = isElementActive(editor, format); // Check if the format is already active

  // If active, revert to paragraph or default block type
  if (isActive) {
    Transforms.setNodes(editor, { type: "paragraph" });
  } else {
    // Otherwise, update the node type to the desired format
    Transforms.setNodes(editor, { type: format });
  }
};

const CustomEditor = {
  addVideoElement(editor) {
    let link = prompt("Ссылка на видео: ");
    editor.selection.anchor.path == [0, 0] &&
      editor.selection.anchor.offset == 0 &&
      editor.insertBreak();
    editor.insertNode({
      type: "video",
      src: link,
      children: [{ text: "" }],
    });
    editor.insertNode({
      type: "paragraph",
      children: [
        {
          text: "",
        },
      ],
    });
  },

  addImageElement(editor) {
    let link = prompt("Ссылка на картинку: ");
    editor.selection.anchor.path == [0, 0] &&
      editor.selection.anchor.offset == 0 &&
      editor.insertBreak();
    editor.insertNode({
      type: "image",
      src: link,
      children: [{ text: "" }],
    });
    editor.insertNode({
      type: "paragraph",
      children: [
        {
          text: "",
        },
      ],
    });
  },

  makeList(editor, format, listType = "1") {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        LIST_TYPES.includes(
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
        ),
      split: true,
    });

    const newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const block = {
        type: format,
        children: [],
        ...(format === "numbered-list" ? { listType } : {}),
      };
      Transforms.wrapNodes(editor, block);
    }
  },

  conceal(editor) {
    let text = prompt("Текст: ");
    const block = { type: "conceal", data: text, children: [] };
    Transforms.wrapNodes(editor, block);
  },
};

const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor;

  // editor.isInline = (element) => {
  //   return element.type === "link" ? true : isInline(element);
  // };

  editor.isInline = (element) =>
    ["link", "note", "error", "quiz", "problem"].includes(element.type) ||
    isInline(element);

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertComment = (editor, data, setModalData, setModalOpen) => {
  if (editor.selection) {
    wrapComment(editor, data);
    // Open the modal and set the initial modal data
    setModalData(data);
  }
};

const insertProblem = (editor, data, setModalData, setModalOpen) => {
  if (editor.selection) {
    wrapProblem(editor, data);
    // Open the modal and set the initial modal data
    setModalData(data);
  }
};

const updateComment = (editor, modalData, setModalOpen, notePath) => {
  Transforms.setNodes(editor, { note: modalData }, { at: notePath });
  setModalOpen(false);
};

const wrapComment = (editor, data) => {
  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const com = {
    type: "note",
    elementId: data,
    children: isCollapsed ? [{ text: data }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, com);
  } else {
    Transforms.wrapNodes(editor, com, { split: true });
    // Transforms.collapse(editor, { edge: "end" });
  }
};

const wrapProblem = (editor, data) => {
  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  const com = {
    type: "problem",
    elementId: data,
    children: isCollapsed ? [{ text: data }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, com);
  } else {
    Transforms.wrapNodes(editor, com, { split: true });
    // Transforms.collapse(editor, { edge: "end" });
  }
};

const insertError = (editor, data, setModalData) => {
  if (editor.selection) {
    wrapError(editor, data);
    setModalData(data);
  }
};

const updateError = (editor, modalData, setModalOpen, notePath) => {
  Transforms.setNodes(editor, { elementId: modalData }, { at: notePath });
  setModalOpen(false);
};

const wrapError = (editor, data) => {
  const { selection } = editor;
  // A range is considered "collapsed" when the anchor point and focus point of the range are the same.
  const isCollapsed = selection && Range.isCollapsed(selection);

  const com = {
    type: "error",
    elementId: data,
    children: isCollapsed ? [{ text: data }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, com);
  } else {
    Transforms.wrapNodes(editor, com, { split: true });
    // Collapse the selection to a single point. In ourr case the end point.
    // Transforms.collapse(editor, { edge: "end" });
  }
};

const insertQuiz = (editor, data, setModalData) => {
  if (editor.selection) {
    wrapQuiz(editor, data);
    setModalData(data);
  }
};

// const updateQuiz = (editor, modalData, setModalOpen, notePath) => {
//   Transforms.setNodes(
//     editor,
//     { question: modalData.question, answer: modalData.answer },
//     { at: notePath }
//   );
//   setModalOpen(false);
// };

const wrapQuiz = (editor, data) => {
  const { selection } = editor;
  // A range is considered "collapsed" when the anchor point and focus point of the range are the same.
  const isCollapsed = selection && Range.isCollapsed(selection);

  const com = {
    type: "quiz",
    elementId: data,
    children: isCollapsed ? [{ text: data }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, com);
  } else {
    Transforms.wrapNodes(editor, com, { split: true });
    // Transforms.collapse(editor, { edge: "end" });
  }
};

// const insertQuiz = (editor, q, a, ifr, ifw, setModalData, setModalOpen) => {
//   if (editor.selection) {
//     wrapQuiz(editor, q, a, ifr, ifw);
//   }
// };

// const updateQuiz = (editor, q, a, ifr, ifw, notePath) => {
//   Transforms.setNodes(
//     editor,
//     { question: q, answer: a, ifRight: ifr, ifWrong: ifw },
//     { at: notePath }
//   );
// };

// const wrapQuiz = (editor, q, a, ifr, ifw) => {
//   const { selection } = editor;
//   // A range is considered "collapsed" when the anchor point and focus point of the range are the same.
//   const isCollapsed = selection && Range.isCollapsed(selection);

//   const com = {
//     type: "quiz",
//     quiz: true,
//     question: q,
//     answer: a,
//     ifRight: ifr,
//     ifWrong: ifw,
//     children: isCollapsed ? [{ text: a }] : [],
//   };

//   if (isCollapsed) {
//     Transforms.insertNodes(editor, com);
//   } else {
//     Transforms.wrapNodes(editor, com, { split: true });
//     // Collapse the selection to a single point. In ourr case the end point.
//     Transforms.collapse(editor, { edge: "end" });
//   }
// };

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
  return !!link;
};

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
};

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

const TableButton = ({ editor, text, action }) => {
  return (
    <TableButtonStyles
      onClick={(e) => {
        e.preventDefault();
        action(editor);
      }}
    >
      {text}
    </TableButtonStyles>
  );
};

const App = (props) => {
  let html;
  props.value ? (html = props.value) : (html = `<p></p>`);
  const document = new DOMParser().parseFromString(html, "text/html");
  const initial = deserialize(document.body);

  const [value, setValue] = useState(initial);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const [type, setType] = useState(null);
  const [areTableOptionsOpen, setAreTableOptionsOpen] = useState(false);
  const [notePath, setNotePath] = useState(null);
  const [modalQuestionAnswerData, setModalQuestionAnswerData] = useState("");

  const { t } = useTranslation("editor");

  // const editor = useMemo(
  //   () => withLinks(withEmbeds(withHistory(withReact(createEditor())))),
  //   []
  // );
  const [editor] = useState(() => {
    const e = withReact(createEditor());
    return withTable(withLinks(withEmbeds(withHistory(e))), {
      blocks: {
        table: "table",
        thead: "table-head",
        tbody: "table-body",
        tfoot: "table-footer",
        tr: "table-row",
        th: "header-cell",
        td: "table-cell",
        content: "paragraph",
      },
      withDelete: true,
      withFragments: true,
      withInsertText: true,
      withNormalization: true,
      withSelection: true,
      withSelectionAdjustment: true,
    });
  });

  // const [editor] = useState(() => {
  //   const e = withReact(createEditor());
  //   return withLinks(withEmbeds(withHistory(e)));
  // });

  // const HOTKEYS = useMemo(
  //   () => ({
  //     // Formatting
  //     BOLD: isHotkey("mod+b"),
  //     ITALIC: isHotkey("mod+i"),
  //     UNDERLINE: isHotkey("mod+u"),

  //     // Navigation
  //     ARROW_UP: isHotkey("up"),
  //     ARROW_DOWN: isHotkey("down"),
  //     ARROW_LEFT: isHotkey("left"),
  //     ARROW_RIGHT: isHotkey("right"),
  //     TAB: isHotkey("tab"),
  //     SHIFT_TAB: isHotkey("shift+tab"),
  //   }),
  //   []
  // );

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmitModal = (type) => {
    if (type == "note") {
      updateComment(editor, modalData, setModalOpen, notePath);
    } else if (type == "createNote") {
      insertComment(editor, modalData, setModalOpen, notePath);
    } else if (type == "createError") {
      insertError(editor, modalData, setModalOpen, notePath);
    } else if (type == "error") {
      updateError(editor, modalData, setModalOpen, notePath);
    } else if (type == "createProblem") {
      insertProblem(editor, modalData, setModalOpen, notePath);
    } else if (type == "quiz") {
      updateQuiz(editor, modalData, setModalOpen, notePath);
    } else if (type == "createQuiz") {
      insertQuiz(editor, modalData, setModalOpen, notePath);
    }

    handleCloseModal();
  };

  // 4.1 Element renderer

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "bulleted-list":
        // return <ul {...attributes}>{children}</ul>;
        return <ListElement {...props} />;
      case "numbered-list":
        return <OrderedListElement {...props} />;
      case "list-item":
        return <ListItem {...props} />;
      case "quote":
        return <QuoteElement {...props} />;
      case "header":
        return <HeaderElement {...props} />;
      case "headerThree":
        return <HeaderThreeElement {...props} />;
      case "video":
        return <VideoElement {...props} />;
      case "image":
        return <ImageElement {...props} />;
      case "link":
        return (
          <LinkElement {...props.attributes} href={props.element.url}>
            {props.children}
          </LinkElement>
        );
      case "quiz":
        return (
          <QuizElement
            editor={editor}
            setModalData={setModalData}
            setModalOpen={setModalOpen}
            setNotePath={setNotePath}
            setType={setType}
            {...props}
          />
        );
      case "table":
        return (
          <TableElement {...props.attributes}>{props.children}</TableElement>
        );
      case "table-row":
        return <tr {...props.attributes}>{props.children}</tr>;
      case "table-body":
        return <tbody {...props.attributes}>{props.children}</tbody>;
      case "table-head":
        return <thead {...props.attributes}>{props.children}</thead>;
      case "table-header":
        return <th {...props.attributes}>{props.children}</th>;
      case "table-cell":
        return <td {...props.attributes}>{props.children}</td>;
      case "flag":
        return <FlagElement {...props} />;
      case "question":
        return <QuestionElement {...props} />;
      case "right":
        return <RightElement {...props} />;
      case "center":
        return <CenterElement {...props} />;
      case "article":
        return <ArticleElement {...props} />;
      case "note":
        return (
          <NoteElement
            editor={editor}
            setModalData={setModalData}
            setModalOpen={setModalOpen}
            setNotePath={setNotePath}
            setType={setType}
            {...props}
          />
        );
      case "problem":
        return (
          <ProblemElement
            editor={editor}
            setModalData={setModalData}
            setModalOpen={setModalOpen}
            setNotePath={setNotePath}
            setType={setType}
            {...props}
          />
        );
      case "conceal":
        return <ConcealElement {...props} />;
      case "error":
        return (
          <ErrorElement
            editor={editor}
            setModalData={setModalData}
            setModalOpen={setModalOpen}
            setNotePath={setNotePath}
            setType={setType}
            {...props}
          />
        );
      case "quiz":
        return (
          <QuizElement
            editor={editor}
            setModalData={setModalData}
            setModalOpen={setModalOpen}
            setNotePath={setNotePath}
            setType={setType}
            {...props}
          />
        );
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // 4.2 Leaf renderer

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  // 4.3 Define button actions for table editing
  const createTable = () => {
    TableEditor.insertTable(editor, { rows: 2, cols: 2 });
  };

  const deleteTable = () => {
    TableEditor.removeTable(editor);
  };

  const addRow = () => {
    TableEditor.insertRow(editor);
  };

  const deleteRow = () => {
    TableEditor.removeRow(editor);
  };

  const addColumn = () => {
    TableEditor.insertColumn(editor, { at: editor.selection });
  };

  const deleteColumn = () => {
    TableEditor.removeColumn(editor);
  };

  const mergeCells = () => {
    if (TableEditor.canMerge(editor)) {
      TableEditor.merge(editor);
    }
  };

  const splitCells = () => {
    TableEditor.split(editor);
  };

  const getResult = (res) => {
    if (res.data.createQuiz) {
      setModalData(res.data.createQuiz.id);
    } else if (res.data.createNote) {
      setModalData(res.data.createNote.id);
    } else if (res.data.createNewTest) {
      setModalData(res.data.createNewTest.id);
    }
  };

  let type_name;
  if (type == "error") {
    type_name = "Question";
  } else if (type == "note") {
    type_name = "Comment";
  } else if (type == "quiz") {
    type_name = "Quiz";
  } else if (type == "problem") {
    type_name = "Problem";
  }
  return (
    <>
      <StyledModal
        isOpen={modalOpen}
        onBackgroundClick={handleCloseModal}
        onEscapeKeydown={handleCloseModal}
      >
        <div className="scrollable_block">
          <div className="info_board">
            <Row>
              <div className="description">Element Type</div>
              <div className="action_area">
                <div className="element_info">{type_name}</div>
              </div>
            </Row>
            <Row>
              <div className="description">Element Id</div>
              <div className="action_area">
                <input
                  onChange={(e) => setModalData(e.target.value)}
                  type="text"
                  placeholder={""}
                  value={modalData}
                />
              </div>
            </Row>
            <Row>
              <div className="description">
                {" "}
                <SecondaryButton
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Element ID is added to the editor");
                    handleSubmitModal(type);
                  }}
                >
                  Add
                </SecondaryButton>
              </div>
              <div className="action_area">
                <div className="element_info">
                  Add element with this id to the highlighted editor text
                </div>
              </div>
            </Row>
            <Row>
              <div className="description">Task</div>
              <div className="action_area"></div>
            </Row>

            {/* {type === "note" && "Write down the ID of the target note"} */}
            {type === "createError" &&
              "Write down the ID of the target question"}
            {type === "createProblem" &&
              "Write down the ID of the target casestudy"}
          </div>
          {type === "createQuiz" && (
            <CreateNewTest getResult={getResult} lessonID={props.lessonId} />
          )}
          {type === "createError" && (
            <CreateQuiz getResult={getResult} lessonID={props.lessonId} />
          )}
          {type === "createNote" && (
            <CreateNote getResult={getResult} lessonID={props.lessonId} />
          )}
          {type === "error" && (
            <SingleQuiz
              key={modalData}
              id={modalData}
              me={props.me}
              quizId={modalData}
              lessonID={
                props.lesson?.quizes.find((q) => q.id == modalData)?.lessonId
              }
              answer={
                props.lesson?.quizes.find((q) => q.id == modalData)?.answer
              }
              answers={
                props.lesson?.quizes.find((q) => q.id == modalData)?.answers
              }
              lesson={props.lesson}
              question={
                props.lesson?.quizes.find((q) => q.id == modalData)?.question
              }
              name={props.lesson?.quizes.find((q) => q.id == modalData)?.name}
              image={props.lesson?.quizes.find((q) => q.id == modalData)?.image}
              type={props.lesson?.quizes.find((q) => q.id == modalData)?.type}
              isOrderOfAnswersImportant={
                props.lesson?.quizes.find((q) => q.id == modalData)
                  ?.isOrderOfAnswersImportant
              }
              shouldAnswerSizeMatchSample={
                props.lesson?.quizes.find((q) => q.id == modalData)
                  ?.shouldAnswerSizeMatchSample
              }
              isScoringShown={
                props.lesson?.quizes.find((q) => q.id == modalData)
                  ?.isScoringShown
              }
              goalType={
                props.lesson?.quizes.find((q) => q.id == modalData)?.goalType
              }
              complexity={
                props.lesson?.quizes.find((q) => q.id == modalData)?.complexity
              }
              ifRight={
                props.lesson?.quizes.find((q) => q.id == modalData)?.ifRight
              }
              ifWrong={
                props.lesson?.quizes.find((q) => q.id == modalData)?.ifWrong
              }
              next={props.lesson?.quizes.find((q) => q.id == modalData)?.next}
              check={props.lesson?.quizes.find((q) => q.id == modalData)?.check}
            />
          )}
          {type == "note" && (
            <SingleNote
              key={modalData}
              id={modalData}
              me={props.me}
              noteId={modalData}
              lessonID={
                props.lesson?.notes.find((q) => q.id == modalData)?.lessonId
              }
              note={props.lesson?.notes.find((q) => q.id == modalData)}
              text={props.lesson?.notes.find((q) => q.id == modalData)?.text}
              name={props.lesson?.notes.find((q) => q.id == modalData)?.name}
              user={props.lesson.user.id}
              author={props.lesson.user}
            />
          )}
          {type == "quiz" && (
            <SingleTest
              key={modalData}
              id={modalData}
              testID={modalData}
              may_i_edit={true}
              lessonID={
                props.lesson?.newTests.find((q) => q.id == modalData)?.lessonId
              }
              question={
                props.lesson?.newTests.find((q) => q.id == modalData)?.question
              }
              answers={
                props.lesson?.newTests.find((q) => q.id == modalData)?.answers
              }
              true={
                props.lesson?.newTests.find((q) => q.id == modalData)?.correct
              }
              ifRight={
                props.lesson?.newTests.find((q) => q.id == modalData)?.ifRight
              }
              ifWrong={
                props.lesson?.newTests.find((q) => q.id == modalData).ifWrong
              }
              user={
                props.lesson?.newTests.find((q) => q.id == modalData)?.user.id
              }
              user_name={
                props.lesson?.newTests.find((q) => q.id == modalData)?.user
              }
              name={props.lesson?.newTests.find((q) => q.id == modalData)?.name}
              image={
                props.lesson?.newTests.find((q) => q.id == modalData)?.image
              }
              complexTestAnswers={
                props.lesson?.newTests.find((q) => q.id == modalData)
                  ?.complexTestAnswers
              }
              comments={
                props.lesson?.newTests.find((q) => q.id == modalData)?.comments
              }
              type={props.lesson?.newTests.find((q) => q.id == modalData)?.type}
              goalType={
                props.lesson?.newTests?.find((q) => q.id == modalData)?.goalType
              }
              me={props.me}
              length={Array(
                props.lesson?.newTests.find((q) => q.id == modalData)?.correct
                  .length
              ).fill(false)}
              userData={[]}
            />
          )}
        </div>
      </StyledModal>

      <Slate
        editor={editor}
        initialValue={value}
        onChange={(value) => {
          setValue(value);
          let arr = [];
          value.map((v) => arr.push(serialize(v)));
          props.getEditorText(arr.join(""));
        }}
      >
        <FormatToolBar>
          <IconContext.Provider value={{ size: "18px" }}>
            <ButtonStyle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("bold")}
              onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, "bold");
              }}
            >
              <BiBold value={{ className: "react-icons" }} />
            </ButtonStyle>

            <ButtonStyle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("italic")}
              onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, "italic");
              }}
            >
              <BiItalic value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("underline")}
              onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, "underline");
              }}
            >
              <BiUnderline value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("h2")}
              onMouseDown={(event) => {
                event.preventDefault();
                toggleElement(editor, "header");
              }}
            >
              <LuHeading2 value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("h3")}
              onMouseDown={(event) => {
                event.preventDefault();
                toggleElement(editor, "headerThree");
              }}
            >
              <LuHeading3 value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("insertLink")}
              onMouseDown={(event) => {
                event.preventDefault();
                const url = window.prompt("Enter the URL of the link:");
                if (!url) return;
                insertLink(editor, url);
              }}
            >
              <BiLinkAlt value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("bulletList")}
              onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.makeList(editor, "bulleted-list");
              }}
            >
              <BiListUl value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("numberedList")}
              onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.makeList(editor, "numbered-list");
              }}
            >
              <BiListOl value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("alignCenter")}
              onMouseDown={(event) => {
                event.preventDefault();
                toggleElement(editor, "center");
              }}
            >
              <BiAlignMiddle value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("alignRight")}
              onMouseDown={(event) => {
                event.preventDefault();
                toggleElement(editor, "right");
              }}
            >
              <BiAlignRight value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("insertTable")}
              onMouseDown={(event) => {
                setAreTableOptionsOpen(!areTableOptionsOpen);
              }}
            >
              <BiTable value={{ className: "react-icons" }} />
            </ButtonStyle>
            <Label for="inputTag">
              {/* Select Image */}
              <BiImageAdd
                data-tooltip-id="my-tooltip"
                data-tooltip-content={t("insertImage")}
                value={{ className: "react-icons" }}
              />
              <input
                id="inputTag"
                type="file"
                class="custom-file-input"
                onChange={(e) => uploadFile(e, editor)}
              />
            </Label>
            <ButtonStyle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("insertVideo")}
              onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.addVideoElement(editor);
              }}
            >
              <BiVideoPlus value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("quote")}
              onMouseDown={(event) => {
                event.preventDefault();
                toggleElement(editor, "quote");
              }}
            >
              <FaQuoteLeft value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("mainIdea")}
              onMouseDown={(event) => {
                event.preventDefault();
                toggleElement(editor, "flag");
              }}
            >
              <BiHighlight value={{ className: "react-icons" }} />
            </ButtonStyle>
            {props.problem && (
              <>
                <ButtonStyle
                  onMouseDown={(event) => {
                    event.preventDefault();
                    CustomEditor.conceal(editor, "editor");
                  }}
                >
                  <BiCommentMinus value={{ className: "react-icons" }} />
                </ButtonStyle>
                <ButtonStyle
                  onMouseDown={(event) => {
                    event.preventDefault();
                    toggleElement(editor, "question");
                  }}
                >
                  <BiCommentDots value={{ className: "react-icons" }} />
                </ButtonStyle>
              </>
            )}
            {props.complex && (
              <>
                <ButtonStyle
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={t("task")}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    toggleElement(editor, "question");
                  }}
                >
                  <BiCommentDots value={{ className: "react-icons" }} />
                </ButtonStyle>
                <ButtonStyle
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={t("comment")}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setType("createNote");
                    setModalOpen(true);
                  }}
                >
                  <BiCommentAdd value={{ className: "react-icons" }} />
                </ButtonStyle>
                <ButtonStyle
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={t("question")}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setType("createError");
                    setModalOpen(true);
                  }}
                >
                  <BiCommentError value={{ className: "react-icons" }} />
                </ButtonStyle>
                <ButtonStyle
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={t("quiz")}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setType("createQuiz");
                    setModalOpen(true);
                  }}
                >
                  <LuSquareSquare value={{ className: "react-icons" }} />
                </ButtonStyle>
                <ButtonStyle
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={t("case_study")}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setType("createProblem");
                    setModalOpen(true);
                  }}
                >
                  <BiCustomize value={{ className: "react-icons" }} />
                </ButtonStyle>
              </>
            )}
          </IconContext.Provider>
        </FormatToolBar>
        {areTableOptionsOpen && (
          <TableButtons>
            <TableButton
              editor={editor}
              text={t("createTable")}
              action={createTable}
            />
            <TableButton
              editor={editor}
              text={t("deleteTable")}
              action={deleteTable}
            />
            <TableButton editor={editor} text={t("addRow")} action={addRow} />
            <TableButton
              editor={editor}
              text={t("deleteRow")}
              action={deleteRow}
            />
            <TableButton
              editor={editor}
              text={t("addColumn")}
              action={addColumn}
            />
            <TableButton
              editor={editor}
              text={t("deleteColumn")}
              action={deleteColumn}
            />
            <TableButton
              editor={editor}
              text={t("mergeCells")}
              action={mergeCells}
            />
            <TableButton
              editor={editor}
              text={t("splitCells")}
              action={splitCells}
            />
          </TableButtons>
        )}
        <Editable
          style={AppStyles}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Write something..."
          // onDragStart={() => {
          //   // mark onDragStart as handled if the selection is in a table
          //   if (TableCursor.isInTable(editor)) {
          //     return true;
          //   }
          //   return false;
          // }}
          // onKeyDown={(event) => {
          //   if (TableCursor.isInTable(editor)) {
          //     switch (true) {
          //       case HOTKEYS.ARROW_DOWN(event) &&
          //         TableCursor.isOnEdge(editor, "bottom"):
          //         event.preventDefault();
          //         return TableCursor.downward(editor);
          //       case HOTKEYS.ARROW_UP(event) &&
          //         TableCursor.isOnEdge(editor, "top"):
          //         event.preventDefault();
          //         return TableCursor.upward(editor);
          //       case HOTKEYS.ARROW_RIGHT(event) &&
          //         TableCursor.isOnEdge(editor, "end"):
          //         event.preventDefault();
          //         return TableCursor.forward(editor);
          //       case HOTKEYS.ARROW_LEFT(event) &&
          //         TableCursor.isOnEdge(editor, "start"):
          //         event.preventDefault();
          //         return TableCursor.backward(editor);
          //       case HOTKEYS.TAB(event):
          //         if (TableCursor.isInLastCell(editor)) {
          //           TableEditor.insertRow(editor);
          //         }
          //         event.preventDefault();
          //         return TableCursor.forward(editor, { mode: "all" });
          //       case HOTKEYS.SHIFT_TAB(event):
          //         event.preventDefault();
          //         return TableCursor.backward(editor, { mode: "all" });
          //     }
          //   }

          //   // Formatting
          //   // switch (true) {
          //   //   case HOTKEYS.BOLD(event):
          //   //     event.preventDefault();
          //   //     return toggleMark(editor, "bold");
          //   //   case HOTKEYS.ITALIC(event):
          //   //     event.preventDefault();
          //   //     return toggleMark(editor, "italic");
          //   //   case HOTKEYS.UNDERLINE(event):
          //   //     event.preventDefault();
          //   //     return toggleMark(editor, "underline");
          //   // }
          // }}
        />
      </Slate>
    </>
  );
};

const withEmbeds = (editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) =>
    element.type === "video" ? true : isVoid(element);
  return editor;
};

// 5. Leaf declaration

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.error) {
    children = <ErrorElement>{children}</ErrorElement>;
  }

  if (leaf.quiz) {
    children = <QuizElement>{children}</QuizElement>;
  }

  if (leaf.text.includes("\n")) {
    return;
  }

  return <span {...attributes}>{children}</span>;
};

// 6. Code element declaration

// const CodeElement = (props) => {
//   return (
//     <blockquote {...props.attributes}>
//       <p>{props.children}</p>
//     </blockquote>
//   );
// };

// 7. Quote element declaration

const QuoteElement = (props) => {
  return <Quote {...props.attributes}>{props.children}</Quote>;
};

// 8. Header element declaration

const HeaderElement = (props) => {
  return (
    <h2 {...props.attributes} style={{ lineHeight: "1.4" }}>
      {props.children}
    </h2>
  );
};
const HeaderThreeElement = (props) => {
  return (
    <h3 {...props.attributes} style={{ lineHeight: "1.4" }}>
      {props.children}
    </h3>
  );
};

const LinkElement = (props) => {
  return <Link {...props.attributes}>{props.children}</Link>;
};

const NoteElement = ({
  editor,
  setModalData,
  setModalOpen,
  setNotePath,
  setType,
  ...props
}) => {
  return (
    <Note
      {...props.attributes}
      onMouseDown={(event) => {
        event.preventDefault(); // prevent Slate's default mouse down handling
        setModalData(
          props.element.note && props.element.note !== "undefined"
            ? props.element.note
            : props.element.elementId
        );
        setModalOpen(true);
        const path = ReactEditor.findPath(editor, props.element);
        setNotePath(path); // store the path
        setType("note");
      }}
    >
      {props.children}
    </Note>
  );
};

const ProblemElement = ({
  editor,
  setModalData,
  setModalOpen,
  setNotePath,
  setType,
  ...props
}) => {
  return (
    <Problem2
      {...props.attributes}
      onMouseDown={(event) => {
        event.preventDefault(); // prevent Slate's default mouse down handling
        setModalData(props.element.elementId);
        setModalOpen(true);
        const path = ReactEditor.findPath(editor, props.element);
        setNotePath(path); // store the path
        setType("problem");
      }}
    >
      {props.children}
    </Problem2>
  );
};

const ErrorElement = ({
  editor,
  setModalData,
  setModalOpen,
  setNotePath,
  setType,
  ...props
}) => {
  return (
    <Error
      {...props.attributes}
      onMouseDown={(event) => {
        event.preventDefault(); // prevent Slate's default mouse down handling
        setModalData(props.element.error_data || props.element.elementId);
        setModalOpen(true);
        const path = ReactEditor.findPath(editor, props.element);
        setNotePath(path); // store the path
        setType("error");
      }}
    >
      {props.children}
    </Error>
  );
};

const QuizElement = ({
  editor,
  setModalData,
  setModalQuestionAnswerData,
  setModalIfRightData,
  setModalIfWrongData,
  setModalOpen,
  setNotePath,
  setType,
  ...props
}) => {
  return (
    <Quiz
      {...props.attributes}
      onMouseDown={(event) => {
        event.preventDefault(); // prevent Slate's default mouse down handling
        setModalData(props.element.quiz_data || props.element.elementId);
        setModalOpen(true);
        const path = ReactEditor.findPath(editor, props.element);
        setNotePath(path); // store the path
        setType("quiz");
      }}
    >
      {props.children}
    </Quiz>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const TableElement = (props) => {
  return <Table {...props.attributes}>{props.children}</Table>;
};

const FlagElement = (props) => {
  return <Flag {...props.attributes}>{props.children}</Flag>;
};

const QuestionElement = (props) => {
  return <Question {...props.attributes}>{props.children}</Question>;
};

const RightElement = (props) => {
  return <Right {...props.attributes}>{props.children}</Right>;
};

const CenterElement = (props) => {
  return <Center {...props.attributes}>{props.children}</Center>;
};

const ArticleElement = (props) => {
  return <Article {...props.attributes}>{props.children}</Article>;
};

const ConcealElement = (props) => {
  return <Conceal {...props.attributes}>{props.children}</Conceal>;
};

const ListElement = (props) => {
  return <ul {...props.attributes}>{props.children}</ul>;
};

const OrderedListElement = (props) => {
  return (
    <ol type={props.element.listType || "1"} {...props.attributes}>
      {props.children}
    </ol>
  );
};

const ListItem = (props) => {
  return <li {...props.attributes}>{props.children}</li>;
};

const VideoElement = ({ attributes, children, element }) => {
  const editor = useSlate();
  const { src } = element;
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div
          style={{
            padding: "75% 0 0 0",
            position: "relative",
          }}
        >
          <iframe
            src={`${src}?title=0&byline=0&portrait=0`}
            frameBorder="0"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <p></p>
        {/* <UrlInput
          url={url}
          onChange={(val) => {
            const path = ReactEditor.findPath(editor, element);
            const newProperties: Partial<SlateElement> = {
              url: val,
            };
            Transforms.setNodes(editor, newProperties, { at: path });
          }}
        /> */}
      </div>
      {children}
    </div>
  );
};

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          src={element.src}
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
          `}
        />
      </div>
      {children}
    </div>
  );
};

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 40%;
  min-width: 650px;
  padding: 2%;
  textarea {
    width: 100%;
    height: 110px;
    font-family: Montserrat;
  }
  .scrollable_block {
    width: 100%;
    height: 600px;
      overflow-y: scroll;

  }
  .info_board {
    width: 90%;
  }
  .row {
    display: flex;
    flex-direction: row;
    margin:10px 0;
    .type {
       width: 70%;

    }
    div {
      width: 30%
    }
    input {
      width: 70%;
      font-family: Montserrat;
      outline: 0;
    }
  }
  /* button {
 background: #3b5bb3;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  width: 100%;
  border: 1px solid #3b5bb3;
  font-family: Montserrat;
  outline: 0;
  border-radius: 5px;
  padding: 10px;
  margin: 15px 0;
  transition: 0.3s ease-in;
  cursor: pointer;
  &:hover {
    border: 1px solid #283d78;
    background: #283d78;
  } */
/* } */

  
  .top_message {
    padding-bottom: 2%;
    border-bottom: 1px solid grey;
    font-size: 2rem;
    width: 100%;
    text-align: center;
  }
  .bottom_message {
    margin-top: 2%;
  }
  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 650px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 340px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

export default App;
