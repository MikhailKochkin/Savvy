export const thisIsAnUnusedExport =
  "this export only exists to disable fast refresh for this file";

import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  Slate,
  Editable,
  withReact,
  useSlate,
  ReactEditor,
  useFocused,
  useSelected,
} from "slate-react";
import isEqual from "lodash/isEqual";
import {
  Editor,
  Transforms,
  Text,
  createEditor,
  Node,
  Element as SlateElement,
} from "slate";
import { IconContext } from "react-icons";

import {
  BiBold,
  BiUnderline,
  BiItalic,
  BiLinkAlt,
  BiVideoPlus,
  BiImageAdd,
  BiStrikethrough,
  BiHeading,
  BiCommentAdd,
} from "react-icons/bi";
import { css } from "emotion";
import styled from "styled-components";
import isUrl from "is-url";
import { withHistory } from "slate-history";
import escapeHtml from "escape-html";
import { jsx } from "slate-hyperscript";
import { Button, IconBlock, Menu, Portal } from "./components";
import { Range } from "slate";

const AppStyles = {
  color: "rgb(17, 17, 17)",
  padding: "0 5px",
  width: "100%",
  fontSize: "1.5rem",
};

const Link = styled.a`
  border-bottom: 2px solid #26ba8d;
  padding: 0;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    /* background: #26ba8d;
    color: #fff;
    padding: 2px 0; */
  }
`;

const Comment = styled.span`
  color: #81b29a;
`;

const Label = styled.label`
  font-size: 18px;
  vertical-align: text-bottom;
  color: #aaaaaa;
  cursor: pointer;
  input {
    display: none;
  }
`;

const ELEMENT_TAGS = {
  A: (el) => ({ type: "link", url: el.getAttribute("href") }),
  BLOCKQUOTE: () => ({ type: "quote" }),
  H1: () => ({ type: "heading-one" }),
  H2: () => ({ type: "heading-two" }),
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

const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ delete: true }),
  INS: () => ({ insert: true }),
  I: () => ({ italic: true }),
  EM: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  B: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

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
      if (styles.includes("delete")) {
        text = `<del>${text}</del>`;
      }
      if (styles.includes("header")) {
        text = `<h2>${text}</h2>`;
      }
      if (styles.includes("comment")) {
        text = `<span className="comment" type="comment" comment="${node.comment}">${text}</span>`;
      }
      if (styles.includes("insert")) {
        text = `<ins>${text}</ins>`;
      }
      if (styles.includes("underline")) {
        text = `<ins>${text}</ins>`;
      }
      if (styles.includes("error")) {
        text = `<span className="editor_error" type="error" id="id" text="${node.correct}" data="${node.correct}">${text}</span>`;
      }
      if (styles.includes("note")) {
        text = `<span className="editor_note" type="note" text="${node.note}">${text}</span>`;
      }
      if (styles.includes("quiz")) {
        text = `<span type="quiz" className="quiz" question="${node.question}" answer="${node.answer}" ifRight="${node.ifRight}" ifWrong="${node.ifWrong}">${text}</span>`;
      }
      return text;
    } else {
      return escapeHtml(node.text);
    }
  }
  const children = node.children.map((n) => serialize(n)).join("");
  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "flag":
      return `<div className="flag">${children}</div>`;
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
    case "image":
      return `<img src=${escapeHtml(node.src)} alt="caption_goes_here"/>`;
    case "error":
      return `<span className="editor_error" type="error" id="id" text="${node.correct}" data="${node.correct}">${children}</span>`;
    case "comment":
      return `<span className="comment" type="comment" comment="${node.comment}">${children}</span>`;
    case "video":
      return `<div className="video"><iframe src="${escapeHtml(
        node.src
      )}" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true">${children}</iframe></div><p></p>`;
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

// 2. deserialize – html to text

const deserialize = (el) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  }

  const children = Array.from(el.childNodes).map(deserialize);

  if (TEXT_TAGS[el.nodeName]) {
    const attrs = TEXT_TAGS[el.nodeName](el);
    return children.map((child) => jsx("text", attrs, child));
  }

  //  legacy fix. Use it if the initial text in the test was plain text, not html
  if (el.nodeName == "BODY" && !el.innerHTML.includes("<p>")) {
    return [
      {
        type: "paragraph",
        children: [
          {
            text: el.textContent,
          },
        ],
      },
    ];
  }

  if (el.getAttribute("type") == "comment") {
    return jsx(
      "element",
      {
        type: "comment",
        comment: el.getAttribute("comment"),
      },
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
        children.length > 0 ? children : [{ text: "" }]
      );
    case "A":
      return jsx(
        "element",
        { type: "link", url: el.getAttribute("href") },
        children.length > 0 ? children : [{ text: "" }]
      );
    default:
      return el.textContent;
  }
};

const HoveringMenu = (props) => {
  let html;
  props.value ? (html = props.value) : (html = `<p></p>`);
  const document = new DOMParser().parseFromString(html, "text/html");
  const initial = deserialize(document.body);
  const [value, setValue] = useState(initial);
  const editor = useMemo(
    () => withLinks(withHistory(withReact(createEditor()))),
    []
  );

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
      case "quote":
        return <QuoteElement {...props} />;
      case "header":
        return <HeaderElement {...props} />;
      case "video":
        return <VideoElement {...props} />;
      case "image":
        return <ImageElement {...props} />;
      case "comment":
        return <CommentElement {...props} />;
      case "link":
        return (
          <LinkElement {...props.attributes} href={props.element.url}>
            {props.children}
          </LinkElement>
        );
      case "quiz":
        return <QuizElement {...props} />;
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
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // 4.2 Leaf renderer

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        let arr = [];
        value.map((v) => arr.push(serialize(v)));
        setValue(value);
        props.getEditorText(arr.join(""), props.name, props.index);
      }}
    >
      <HoveringToolbar type={props.type} />
      <Editable
        style={AppStyles}
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        placeholder={props.placeholder}
      />
    </Slate>
  );
};

const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

const addImageElement = (editor) => {
  let link = prompt("Ссылка: ");
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

const addVideoElement = (editor) => {
  let link = prompt("Video link: ");

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
};

const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) =>
    ["link", "comment"].includes(element.type) || isInline(element);

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

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const insertComment = (editor, comment) => {
  if (editor.selection) {
    wrapComment(editor, comment);
  }
};

const wrapComment = (editor, comment) => {
  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  // Create the inline comment node
  const com = {
    type: "comment",
    comment: comment,
    children: isCollapsed ? [{ text: "" }] : [],
  };

  if (isCollapsed) {
    // If the selection is collapsed, insert the comment node
    Transforms.insertNodes(editor, com);
  } else {
    // If there's a range, wrap the selected text with the comment node
    Transforms.wrapNodes(editor, com, { split: true });
    Transforms.collapse(editor, { edge: "end" });
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

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: "all",
  });
  return !!match;
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.delete) {
    children = <del>{children}</del>;
  }

  if (leaf.header) {
    children = <h2>{children}</h2>;
  }

  if (leaf.insert) {
    children = <ins>{children}</ins>;
  }

  return <span {...attributes}>{children}</span>;
};

const HoveringToolbar = (props) => {
  const ref = useRef();
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return (
    <Portal>
      <IconContext.Provider value={{ size: "18px" }}>
        <Menu
          ref={ref}
          className={css`
            padding: 8px 7px 6px;
            position: absolute;
            z-index: 1;
            top: -10000px;
            left: -10000px;
            margin-top: -6px;
            opacity: 0;
            background-color: #222;
            border-radius: 4px;
            transition: opacity 0.75s;
          `}
        >
          <FormatButton format="bold" icon={"bold"} />
          <FormatButton format="italic" icon={"italic"} />
          <FormatButton format="delete" icon={"strikethrough"} />
          <FormatButton format="insert" icon={"underline"} />
          <FormatButton format="header" icon={"header"} />
          <ImageButton format="image" icon={"image"} />
          <VideoButton format="video" icon={"video"} />
          <LinkButton format="image" icon={"link"} />
          {props.type == "DocBuilder" && (
            <AddButton format="add" icon={"add"} />
          )}
        </Menu>
      </IconContext.Provider>
    </Portal>
  );
};

const FormatButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      active={isFormatActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
    >
      <IconBlock>
        {icon == "bold" && <BiBold value={{ className: "react-icons" }} />}
        {icon == "italic" && <BiItalic value={{ className: "react-icons" }} />}
        {icon == "header" && <BiHeading value={{ className: "react-icons" }} />}

        {icon == "strikethrough" && (
          <BiStrikethrough value={{ className: "react-icons" }} />
        )}
        {icon == "underline" && (
          <BiUnderline value={{ className: "react-icons" }} />
        )}
        {icon == "add" && <BiCommentAdd value={{ className: "react-icons" }} />}
      </IconBlock>
    </Button>
  );
};

const AddButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      onMouseDown={(event) => {
        event.preventDefault();
        const comment = window.prompt("Enter text ");
        if (!comment) return;
        insertComment(editor, comment);
      }}
    >
      <IconBlock>
        <BiCommentAdd value={{ className: "react-icons" }} />
      </IconBlock>
    </Button>
  );
};

const LinkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the link:");
        if (!url) return;
        insertLink(editor, url);
      }}
    >
      <IconBlock>
        <BiLinkAlt value={{ className: "react-icons" }} />
      </IconBlock>
    </Button>
  );
};

const FormatButton2 = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      // active={isFormatActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        addImageElement(editor);
      }}
    >
      <IconBlock>
        <BiImageAdd value={{ className: "react-icons" }} />
      </IconBlock>
    </Button>
  );
};

const VideoButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      // active={isFormatActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        addVideoElement(editor);
      }}
    >
      <IconBlock>
        <BiVideoPlus value={{ className: "react-icons" }} />
      </IconBlock>
    </Button>
  );
};

const ImageButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Label>
      <BiImageAdd value={{ className: "react-icons" }} />
      <input
        id="inputTag"
        type="file"
        class="custom-file-input"
        onChange={(e) => uploadFile(e, editor)}
      />
    </Label>
  );
};

// 8. Header element declaration

const HeaderElement = (props) => {
  return <h2 {...props.attributes}>{props.children}</h2>;
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

const LinkElement = (props) => {
  return <Link {...props.attributes}>{props.children}</Link>;
};

const CommentElement = (props) => {
  return <Comment {...props.attributes}>{props.children}</Comment>;
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

const UrlInput = ({ url, onChange }) => {
  const [value, setValue] = React.useState(url);
  return (
    <input
      value={value}
      onClick={(e) => e.stopPropagation()}
      style={{
        marginTop: "5px",
        boxSizing: "border-box",
      }}
      onChange={(e) => {
        const newUrl = e.target.value;
        setValue(newUrl);
        onChange(newUrl);
      }}
    />
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
            /* max-height: 20em; */
            box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
          `}
        />
      </div>
      {children}
    </div>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "This example shows how you can make a hovering menu appear above your content, which you can use to make text ",
      },
    ],
  },
];

export default HoveringMenu;
