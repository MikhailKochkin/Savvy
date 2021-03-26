export const thisIsAnUnusedExport =
  "this export only exists to disable fast refresh for this file";

import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Slate, Editable, ReactEditor, withReact, useSlate } from "slate-react";
import { Editor, Transforms, Text, createEditor, Node } from "slate";
import { css } from "emotion";
import { withHistory } from "slate-history";
import escapeHtml from "escape-html";
import { jsx } from "slate-hyperscript";
import Icon from "react-icons-kit";
import { bold } from "react-icons-kit/fa/bold";
import { italic } from "react-icons-kit/fa/italic";
import { pencil } from "react-icons-kit/fa/pencil";
import { strikethrough } from "react-icons-kit/fa/strikethrough";
import { underline } from "react-icons-kit/fa/underline";
import { image } from "react-icons-kit/fa/image";
import { commentO } from "react-icons-kit/fa/commentO";
import { ic_announcement } from "react-icons-kit/md/ic_announcement";
import { Button, IconBlock, Menu, Portal } from "./components";
import { Range } from "slate";
import { blue } from "@material-ui/core/colors";

const AppStyles = {
  color: "rgb(17, 17, 17)",
  padding: "0 5px",
  maxWidth: "840px",
  width: "100%",
  fontSize: "1.5rem",
};

// 1. Serializer – slate to html

const serialize = (node) => {
  if (Text.isText(node)) {
    let styles = Object.keys(node);
    styles.shift();
    // console.log(styles);
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
        text = `<span className="editor_error" type="error" id="id" text="${node.correct}" data="${node.correct}">${text}</span>`;
      }
      if (styles.includes("note")) {
        text = `<span className="editor_note" type="note" text="${node.note}">${text}</span>`;
      }
      if (styles.includes("quiz")) {
        text = `<span className="quiz" question="${node.question}" answer="${node.answer}">${text}</span>`;
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
    case "header":
      return `<h2>${children}<h2/>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "image":
      return `<img src=${escapeHtml(node.src)} alt="caption_goes_here"/>`;
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

// 2. deserialize – html to text

const deserialize = (el) => {
  // console.log(el, el.nodeType);
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  }

  const children = Array.from(el.childNodes).map(deserialize);
  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return "\n";
    case "IFRAME":
      return jsx("element", { type: "video", src: el.src }, [{ text: "" }]);
    case "IMAGE":
      return jsx("element", { type: "image", src: el.src }, [{ text: "" }]);
    case "BLOCKQUOTE":
      return jsx("element", { type: "quote" }, children);
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
        children
      );
    default:
      return el.textContent;
  }
};

const HoveringMenu = (props) => {
  let text;
  if (props.value) {
    let document = new DOMParser().parseFromString(props.value, "text/html");
    text = deserialize(document.body);
    // } else if (props.placeholder) {
    //   let document = new DOMParser().parseFromString(
    //     props.placeholder,
    //     "text/html"
    //   );
    //   text = deserialize(document.body);
  } else {
    let document = new DOMParser().parseFromString(`<p></p>`, "text/html");
    text = deserialize(document.body);
  }
  const [value, setValue] = useState(text);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

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
        // console.log("value", value);
        setValue(value);
        props.getEditorText(arr.join(""), props.name);
        // console.log(arr.join(""));
      }}
    >
      <HoveringToolbar />
      <Editable
        style={AppStyles}
        renderLeaf={renderLeaf}
        placeholder={
          props.placeholder ? props.placeholder : "Enter some text..."
        }
        // onDOMBeforeInput={(event) => {
        //   event.preventDefault();
        //   console.log(event.inputType);
        //   switch (event.inputType) {
        //     case "bold":
        //       return toggleFormat(editor, "bold");
        //     case "italic":
        //       return toggleFormat(editor, "italic");
        //     // case "underline":
        //     //   return toggleFormat(editor, "underline");
        //     case "delete":
        //       return toggleFormat(editor, "delete");
        //     case "insert":
        //       return toggleFormat(editor, "insert");
        //   }
        // }}
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

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.delete) {
    children = <del>{children}</del>;
  }

  if (leaf.insert) {
    children = <ins>{children}</ins>;
  }

  return <span {...attributes}>{children}</span>;
};

const HoveringToolbar = () => {
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
        <FormatButton format="bold" icon={bold} />
        <FormatButton format="italic" icon={italic} />
        {/* <FormatButton format="underline" icon={underline} /> */}
        <FormatButton format="delete" icon={strikethrough} />
        <FormatButton format="insert" icon={underline} />
      </Menu>
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
        <Icon icon={icon} />
      </IconBlock>
    </Button>
  );
};

const initialValue = [
  {
    children: [
      {
        text:
          "Since the editor is based on a recursive tree model, similar to an HTML document, you can create complex nested structures, like tables:",
      },
    ],
  },
  {
    children: [
      {
        text:
          "This table is just a basic example of rendering a table, and it doesn't have fancy functionality. But you could augment it to add support for navigating with arrow keys, displaying table headers, adding column and rows, or even formulas if you wanted to get really crazy!",
      },
    ],
  },
];

export default HoveringMenu;
