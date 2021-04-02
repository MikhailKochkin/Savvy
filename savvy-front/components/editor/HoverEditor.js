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
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
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
      if (styles.includes("insert")) {
        text = `<ins>${text}</ins>`;
      }
      if (styles.includes("delete")) {
        text = `<del>${text}</del>`;
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
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  }

  const children = Array.from(el.childNodes).map(deserialize);
  // if (ELEMENT_TAGS[el.nodeName]) {
  //   const attrs = ELEMENT_TAGS[el.nodeName](el);
  //   return jsx("element", attrs, children);
  // }
  if (TEXT_TAGS[el.nodeName]) {
    const attrs = TEXT_TAGS[el.nodeName](el);
    return children.map((child) => jsx("text", attrs, child));
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
    case "INS":
      return jsx(
        // "element",
        // { type: "link", url: el.getAttribute("href") },
        // children
        { text: children, insert: true }
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
  } else {
    let document = new DOMParser().parseFromString(`<p></p>`, "text/html");
    text = deserialize(document.body);
  }
  const [value, setValue] = useState(text);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  // 4.1 Element renderer

  const renderElement = useCallback((props) => {
    // console.log(props.element, props.element.type);
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
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
        // console.log("value", value);
        setValue(value);
        props.getEditorText(arr.join(""), props.name, props.index);
        // console.log(arr.join(""));
      }}
    >
      <HoveringToolbar />
      <Editable
        style={AppStyles}
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        placeholder={"Enter some text..."}
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

  // if (leaf.underline) {
  //   children = <u>{children}</u>;
  // }

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
        <FormatButton format="delete" icon={strikethrough} />
        <FormatButton format="insert" icon={underline} />
        <FormatButton2 format="image" icon={image} />
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
        <Icon icon={icon} />
      </IconBlock>
    </Button>
  );
};

// 8. Header element declaration

const HeaderElement = (props) => {
  return <h2 {...props.attributes}>{props.children}</h2>;
};

const LinkElement = (props) => {
  return <Link {...props.attributes}>{props.children}</Link>;
};

const QuizElement = (props) => {
  return <Quiz {...props.attributes}>{props.children}</Quiz>;
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
            max-height: 20em;
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
