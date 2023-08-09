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
import FormatToolBar from "./FormatToolbar";
// import { bold } from "react-icons-kit/fa/bold";
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
} from "react-icons/bi";
import { FaQuoteLeft } from "react-icons/fa";
// import Modal from "./Modal";
import Modal from "styled-react-modal";

// import { underline } from "react-icons-kit/fa/underline";
// import { italic } from "react-icons-kit/fa/italic";
// import { header } from "react-icons-kit/fa/header";
// import { link } from "react-icons-kit/fa/link";
// import { image } from "react-icons-kit/fa/image";
// import { listUl } from "react-icons-kit/fa/listUl";
// import { listOl } from "react-icons-kit/fa/listOl";
// import { film } from "react-icons-kit/fa/film";
// import { table } from "react-icons-kit/fa/table";
// import { flag } from "react-icons-kit/fa/flag";
// import { question } from "react-icons-kit/fa/question";
// import { ic_insert_comment } from "react-icons-kit/md/ic_insert_comment";
// import { ic_find_replace } from "react-icons-kit/md/ic_find_replace";
// import { undo } from "react-icons-kit/fa/undo";
// import { exclamation } from "react-icons-kit/fa/exclamation";

const ELEMENT_TAGS = {
  A: (el) => ({ type: "link", url: el.getAttribute("href") }),
  BLOCKQUOTE: () => ({ type: "quote" }),
  H1: () => ({ type: "heading-one" }),
  H2: () => ({ type: "header" }),
  H3: () => ({ type: "heading-three" }),
  H4: () => ({ type: "heading-four" }),
  H5: () => ({ type: "heading-five" }),
  H6: () => ({ type: "heading-six" }),
  IMG: (el) => ({ type: "image", url: el.getAttribute("src") }),
  LI: () => ({ type: "list-item" }),
  OL: () => ({ type: "numbered-list" }),
  P: () => ({ type: "paragraph" }),
  PRE: () => ({ type: "code" }),
  UL: () => ({ type: "bulleted-list" }),
};

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
};

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
`;

const Span = styled.span`
  color: darkslateblue;
`;

const Quiz = styled.span`
  color: #f2cc8f;
`;

const Question = styled.div`
  background: #f5f5f5;
  padding: 15px 20px;
  border-radius: 20px;
`;

const Table = styled.table`
  width: 100%;
  border: 1px solid #edefed;
  border-collapse: collapse;
  border-spacing: 0;
  tr {
    border: 1px solid #edefed;
  }
  thead {
    background: #f5f5f5;
    font-weight: bold;
  }
  th {
    border: 1px solid #edefed;
  }
  td {
    border: 1px solid #edefed;
    padding: 0% 2.5%;
    border-top: none;
    border-bottom: none;
    border-right: none;
    position: relative;
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
  /* border-bottom: 1px solid #3a5a40; */
  /* font-size: 2rem;
  width: 100%;
  margin: 3% 0;
  padding: 3% 8%;
  background-color: #f2fafb;
  border-radius: 5px; */
`;

const Error = styled.span`
  color: #e07a5f;
`;

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 40%;
  min-width: 400px;
  padding: 2%;
  textarea {
    width: 80%;
    height: 110px;
    font-family: Montserrat;
    margin: 15px 0;
  }
  button {
        width: 80%;

  }
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
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
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
        text = `<span className="editor_error" type="error" id="id" error_text="${node.error_text}" error_data="${node.error_text}">${text}</span>`;
      }
      if (styles.includes("note")) {
        text = `<span className="editor_note" type="note" text="${node.note}">${text}</span>`;
      }
      if (styles.includes("quiz")) {
        text = `<span className="editor_quiz" type="quiz" question="${node.question}" answer="${node.answer}" ifRight="${node.ifRight}" ifWrong="${node.ifWrong}">${text}</span>`;
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
    case "paragraph":
      return `<p>${children}</p>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
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
      return `<span className="editor_error" type="error" id="id" error_text="${node.error_text}" error_data="${node.error_text}">${children}</span>`;
    case "note":
      return `<span className="editor_note" type="note" text="${node.note}">${children}</span>`;
    case "quiz":
      return `<span className="editor_quiz" type="quiz" question="${node.question}" answer="${node.answer}" ifRight="${node.ifRight}" ifWrong="${node.ifWrong}">${children}</span>`;
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
    case "table-row":
      return `<tr>${children}</tr>`;
    case "table-cell":
      return `<th>${children}</th>`;
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
        question: el.getAttribute("question"),
        answer: el.getAttribute("answer"),
        ifRight: el.getAttribute("ifRight"),
        ifWrong: el.getAttribute("ifWrong"),
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
      { type: "note", note: el.getAttribute("text") },
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
  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
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
      return jsx("element", { type: "numbered-list" }, children);
    case "LI":
      return jsx("element", { type: "list-item" }, children);
    case "H2":
      return jsx(
        "element",
        { type: "header" },
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

  // editor.selection.anchor.path == [0, 0] &&
  //   editor.selection.anchor.offset == 0 &&
  //   editor.insertBreak();
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
  const isActive = isElementActive(editor, format);
  if (isActive) {
    Transforms.unwrapNodes(editor, {
      // match: (n) => Text.isText(n),
      split: true,
    });
    const newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
    Transforms.setNodes(editor, newProperties);
  } else {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
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

  makeList(editor, format) {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);
    // const isList = true

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
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },

  conceal(editor) {
    let text = prompt("Текст: ");
    const block = { type: "conceal", data: text, children: [] };
    Transforms.wrapNodes(editor, block);
  },

  // addQuiz(editor) {
  //   let q = prompt("Вопрос: ");
  //   let a = prompt("Ответ: ");
  //   let ifr = prompt("Если правильно: ");
  //   let ifw = prompt("Если неправильно: ");
  //   Transforms.setNodes(
  //     editor,
  //     {
  //       type: "quiz",
  //       quiz: true,
  //       question: q,
  //       answer: a,
  //       ifRight: ifr,
  //       ifWrong: ifw,
  //     },
  //     { match: (n) => Text.isText(n), split: true }
  //   );
  // },
};

const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor;

  // editor.isInline = (element) => {
  //   return element.type === "link" ? true : isInline(element);
  // };

  editor.isInline = (element) =>
    ["link", "note", "error", "quiz"].includes(element.type) ||
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
    // setModalOpen(true);
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
    note: data,
    children: isCollapsed ? [{ text: data }] : [],
  };
  if (isCollapsed) {
    Transforms.insertNodes(editor, com);
  } else {
    Transforms.wrapNodes(editor, com, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

const insertError = (editor, data, setModalData) => {
  if (editor.selection) {
    wrapError(editor, data);
    setModalData(data);
  }
};

const updateError = (editor, modalData, setModalOpen, notePath) => {
  console.log("notePath", notePath);

  Transforms.setNodes(
    editor,
    { error_data: modalData, error_text: modalData },
    { at: notePath }
  );
  setModalOpen(false);
};
const wrapError = (editor, data) => {
  const { selection } = editor;
  // A range is considered "collapsed" when the anchor point and focus point of the range are the same.
  const isCollapsed = selection && Range.isCollapsed(selection);
  const com = {
    type: "error",
    error: true,
    error_text: data,
    error_data: data,
    children: isCollapsed ? [{ text: data }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, com);
  } else {
    Transforms.wrapNodes(editor, com, { split: true });
    // Collapse the selection to a single point. In ourr case the end point.
    Transforms.collapse(editor, { edge: "end" });
  }
};

const insertQuiz = (editor, q, a, ifr, ifw, setModalData, setModalOpen) => {
  if (editor.selection) {
    wrapQuiz(editor, q, a, ifr, ifw);
  }
};

const updateQuiz = (editor, q, a, ifr, ifw, notePath) => {
  console.log("q, a, ifr, ifw", q, a, ifr, ifw);
  console.log("notePath", notePath);
  Transforms.setNodes(
    editor,
    { question: q, answer: a, ifRight: ifr, ifWrong: ifw },
    { at: notePath }
  );
  console.log(JSON.stringify("editor.children", editor.children, null, 2));
};

const wrapQuiz = (editor, q, a, ifr, ifw) => {
  const { selection } = editor;
  // A range is considered "collapsed" when the anchor point and focus point of the range are the same.
  const isCollapsed = selection && Range.isCollapsed(selection);

  const com = {
    type: "quiz",
    quiz: true,
    question: q,
    answer: a,
    ifRight: ifr,
    ifWrong: ifw,
    children: isCollapsed ? [{ text: a }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, com);
  } else {
    Transforms.wrapNodes(editor, com, { split: true });
    // Collapse the selection to a single point. In ourr case the end point.
    Transforms.collapse(editor, { edge: "end" });
  }
};

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

const App = (props) => {
  let html;
  props.value ? (html = props.value) : (html = `<p></p>`);
  const document = new DOMParser().parseFromString(html, "text/html");
  const initial = deserialize(document.body);
  const [value, setValue] = useState(initial);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const [type, setType] = useState(null);
  const [notePath, setNotePath] = useState(null);
  const [modalQuestionAnswerData, setModalQuestionAnswerData] = useState("");
  const [modalIfWrongData, setModalIfWrongData] = useState("");
  const [modalIfRightData, setModalIfRightData] = useState("");

  const editor = useMemo(
    () => withLinks(withEmbeds(withHistory(withReact(createEditor())))),
    []
  );
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmitModal = (type) => {
    console.log(1, type);
    if (type == "note") {
      updateComment(editor, modalData, setModalOpen, notePath);
    } else if (type == "createNote") {
      insertComment(editor, modalData, setModalOpen, notePath);
    } else if (type == "createError") {
      insertError(editor, modalData, setModalOpen, notePath);
    } else if (type == "error") {
      updateError(editor, modalData, setModalOpen, notePath);
    } else if (type == "createQuestion") {
      insertQuiz(
        editor,
        modalData,
        modalQuestionAnswerData,
        modalIfRightData,
        modalIfWrongData,
        notePath
      );
    } else if (type == "updateQuestion") {
      console.log("2 note path", notePath);
      updateQuiz(
        editor,
        modalData,
        modalQuestionAnswerData,
        modalIfRightData,
        modalIfWrongData,
        notePath
      );
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
            setModalQuestionAnswerData={setModalQuestionAnswerData}
            setModalIfRightData={setModalIfRightData}
            setModalIfWrongData={setModalIfWrongData}
            setNotePath={setNotePath}
            setType={setType}
            {...props}
          />
        );
      case "table":
        return (
          <TableElement>
            <tbody {...props.attributes}>{props.children}</tbody>
          </TableElement>
        );
      case "table-row":
        return <tr {...props.attributes}>{props.children}</tr>;
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
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // 4.2 Leaf renderer

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <>
      {/* <button onClick={handleOpenModal}>Open Modal</button> */}
      {/* <div>{type}</div> */}
      <StyledModal
        isOpen={modalOpen}
        onBackgroundClick={handleCloseModal}
        onEscapeKeydown={handleCloseModal}
      >
        <div>
          Element type: {type}.{" "}
          {type === "note" && "Write a comment to the highlighted text"}
          {type === "error" && "Write a correct version of the incorrect text"}
        </div>
        <textarea
          type="text"
          placeholder={type == "createQuestion" ? "Your question" : ""}
          value={modalData}
          onChange={(e) => setModalData(e.target.value)}
        />
        {(type == "createQuestion" || type == "updateQuestion") && (
          <>
            <textarea
              type="text"
              placeholder="sample answer"
              value={modalQuestionAnswerData}
              onChange={(e) => setModalQuestionAnswerData(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="comment if wrong answer is given"
              value={modalIfWrongData}
              onChange={(e) => setModalIfWrongData(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="comment if correct answer is given"
              value={modalIfRightData}
              onChange={(e) => setModalIfRightData(e.target.value)}
            />
          </>
        )}
        <div>Type: {type}</div>
        <button
          onClick={(e) => {
            handleSubmitModal(type);
            // if (modalData.trim() !== "") {
            //   insertComment(editor, modalData, setModalData, setModalOpen);
            // }
          }}
        >
          Update
        </button>
      </StyledModal>

      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value);
          let arr = [];
          value.map((v) => arr.push(serialize(v)));
          props.getEditorText(arr.join(""));
          // console.log("arr.join()", arr.join(""));
        }}
      >
        <FormatToolBar>
          <IconContext.Provider value={{ size: "18px" }}>
            <ButtonStyle
              onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, "bold");
              }}
            >
              <BiBold value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, "italic");
              }}
            >
              <BiItalic value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, "underline");
              }}
            >
              <BiUnderline value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              onMouseDown={(event) => {
                event.preventDefault();
                toggleElement(editor, "header");
              }}
            >
              <BiHeading value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
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
              onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.makeList(editor, "bulleted-list");
              }}
            >
              <BiListUl value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.makeList(editor, "numbered-list");
              }}
            >
              <BiListOl value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              onMouseDown={(event) => {
                event.preventDefault();
                toggleElement(editor, "center");
              }}
            >
              <BiAlignMiddle value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              onMouseDown={(event) => {
                event.preventDefault();
                toggleElement(editor, "right");
              }}
            >
              <BiAlignRight value={{ className: "react-icons" }} />
            </ButtonStyle>
            <Label for="inputTag">
              {/* Select Image */}
              <BiImageAdd value={{ className: "react-icons" }} />
              {/* </ButtonStyle>{" "} */}
              <input
                id="inputTag"
                type="file"
                class="custom-file-input"
                onChange={(e) => uploadFile(e, editor)}
                // onMouseDown={(event) => {
                //   event.preventDefault();
                //   CustomEditor.addImageElement(editor);
                // }}
              />
            </Label>
            <ButtonStyle
              onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.addVideoElement(editor);
              }}
            >
              <BiVideoPlus value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
              onMouseDown={(event) => {
                event.preventDefault();
                toggleElement(editor, "quote");
              }}
            >
              <FaQuoteLeft value={{ className: "react-icons" }} />
            </ButtonStyle>
            <ButtonStyle
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
                  onMouseDown={(event) => {
                    event.preventDefault();
                    // const data = window.prompt("Напишите комментарий:");
                    // if (!data) return;
                    // insertComment(editor, data, setModalData, setModalOpen);
                    setType("createNote");

                    setModalOpen(true);
                  }}
                >
                  <BiCommentAdd value={{ className: "react-icons" }} />
                </ButtonStyle>
                <ButtonStyle
                  onMouseDown={(event) => {
                    event.preventDefault();
                    // const data = window.prompt("Правильный вариант:");
                    // if (!data) return;
                    setType("createError");
                    setModalOpen(true);
                  }}
                >
                  <BiCommentError value={{ className: "react-icons" }} />
                </ButtonStyle>
                <ButtonStyle
                  onMouseDown={(event) => {
                    event.preventDefault();
                    // CustomEditor.addQuiz(editor);
                    // let q = window.prompt("Вопрос: ");
                    // let a = window.prompt("Ответ: ");
                    // let ifr = window.prompt("Если правильно: ");
                    // let ifw = window.prompt("Если неправильно: ");
                    // insertQuiz(editor, q, a, ifr, ifw);
                    setType("createQuestion");
                    setModalOpen(true);
                  }}
                >
                  <BiCommentCheck value={{ className: "react-icons" }} />
                </ButtonStyle>
              </>
            )}
          </IconContext.Provider>
        </FormatToolBar>
        <Editable
          style={AppStyles}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Write something..."
          onKeyDown={(event) => {
            // if (event.key === "`" && event.ctrlKey) {
            //   event.preventDefault();
            //   const [match] = Editor.nodes(editor, {
            //     match: (n) => n.type === "code",
            //   });
            //   Transforms.setNodes(
            //     editor,
            //     { type: match ? "paragraph" : "code" },
            //     { match: (n) => Editor.isBlock(editor, n) }
            //   );
            // }
          }}
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
  return <h2 {...props.attributes}>{props.children}</h2>;
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
        setModalData(props.element.note);
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
        setModalData(props.element.error_data);
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
        console.log("props.element", props.element);
        setModalData(props.element.question);
        setModalQuestionAnswerData(props.element.answer);
        setModalIfRightData(props.element.ifRight);
        setModalIfWrongData(props.element.ifWrong);
        setModalOpen(true);
        const path = ReactEditor.findPath(editor, props.element);
        console.log("the path", path);
        setNotePath(path); // store the path
        setType("updateQuestion");
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
  return <ol {...props.attributes}>{props.children}</ol>;
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

export default App;
