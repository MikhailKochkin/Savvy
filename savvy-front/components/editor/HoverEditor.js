import { Editor } from "slate-react";
import styled from "styled-components";
import Html from "slate-html-serializer";
import React from "react";
import ReactDOM from "react-dom";
import { css } from "emotion";
import { Button, IconBlock, Menu } from "./components";
import Icon from "react-icons-kit";
import { bold } from "react-icons-kit/fa/bold";
import { italic } from "react-icons-kit/fa/italic";
import { pencil } from "react-icons-kit/fa/pencil";
import { strikethrough } from "react-icons-kit/fa/strikethrough";
import { underline } from "react-icons-kit/fa/underline";
import { image } from "react-icons-kit/fa/image";
import { commentO } from "react-icons-kit/fa/commentO";
import CommentStyle from "./CommentStyle";

const Img = styled.img`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: "0 0 0 2px blue;";
`;

const CommentStyle2 = styled.span`
  color: green;
`;

const AppStyles = {
  color: "rgb(17, 17, 17)",
  padding: "0 5px",
  maxWidth: "840px",
  width: "100%",
  fontSize: "1.5rem",
};

const DEFAULT_NODE = "paragraph";

const BLOCK_TAGS = {
  p: "paragraph",
  img: "image",
  iframe: "video",
  ol: "numbered-list",
  li: "list-item",
};

const INLINE_TAGS = {
  a: "link",
  input: "input",
  span: "comment",
};

const MARK_TAGS = {
  i: "italic",
  strong: "bold",
  header: "header",
  u: "u",
};

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: "block",
          type: type,
          data: {
            className: el.src,
          },
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object == "block") {
        switch (obj.type) {
          case "paragraph":
            return <p className={obj.data.get("className")}>{children}</p>;
          case "image":
            return (
              <img
                data="data-three"
                src={obj.data._root.entries[0][1]}
                alt="caption_goes_here"
              />
            );
        }
      }
    },
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: "mark",
          type: type,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object == "mark") {
        switch (obj.type) {
          case "bold":
            return <strong>{children}</strong>;
          case "italic":
            return <i>{children}</i>;
          case "del":
            return <del>{children}</del>;
          case "u":
            return <u>{children}</u>;
        }
      }
    },
  },
  {
    deserialize(el, next) {
      if (el.tagName !== "SPAN") {
        return;
      }
      const type = INLINE_TAGS[el.tagName.toLowerCase()];

      if (type) {
        return {
          // inline to show that Inline nodes may contain nested inline nodes and text nodes—just like in the DOM.
          object: "inline",
          type: type,
          nodes: next(el.childNodes),
          data: {
            data:
              Array.from(el.attributes).find(({ name }) => name == "data") !==
              undefined
                ? Array.from(el.attributes).find(({ name }) => name == "data")
                    .value
                : null,
            href:
              Array.from(el.attributes).find(({ name }) => name == "href") !==
              undefined
                ? Array.from(el.attributes).find(({ name }) => name == "href")
                    .value
                : null,
          },
        };
      }
    },
    serialize: function (object, children) {
      if (object.object == "inline") {
        switch (object.type) {
          case "input":
            return <input name={object.data._root.entries[0][1]} id="text" />;
          case "comment":
            return (
              <CommentStyle2 id="id" data={object.data._root.entries[0][1]}>
                {children}
              </CommentStyle2>
            );
        }
      }
    },
  },
];

const html = new Html({
  rules,
});

const MarkButton = ({ editor, type, icon }) => {
  const { value } = editor;
  const isActive = value.activeMarks.some((mark) => mark.type === type);
  return (
    <Button
      reversed
      active={isActive}
      onMouseDown={(event) => {
        event.preventDefault();
        editor.toggleMark(type);
      }}
    >
      <IconBlock>
        <Icon icon={icon} />
      </IconBlock>
    </Button>
  );
};

const wrapInput = (editor, src) => {
  editor.wrapInline({
    type: "input",
    data: { src },
  });
  editor.moveToEnd();
};

const insertImage = (editor, src, target) => {
  if (target) {
    editor.select(target);
  }

  editor.insertBlock({
    type: "image",
    data: { src },
  });
};

const onClickImage = (event, editor) => {
  event.preventDefault();
  const src = window.prompt("Enter the URL of the image:");
  if (!src) return;
  editor.command(insertImage, src);
};

const onClickLink = (event, editor) => {
  event.preventDefault();
  const src = window.prompt("Enter the URL of the image:");
  if (!src) return;
  editor.command(wrapInput(editor, src));
};

// const hasComments = () => {
//   const { value } = this.state;
//   return value.inlines.some((inline) => inline.type === "comment");
// };

const wrapComment = (editor, comment) => {
  editor.wrapInline({
    type: "comment",
    data: { comment },
  });
  editor.moveToEnd();
};

const onClickComment = (event, editor) => {
  event.preventDefault();
  // const hasComments = hasComments();
  // if (hasComments) {
  //   editor.command(unwrapComment);
  // } else if (value.selection.isExpanded) {
  const comment = window.prompt("Напишите правильный вариант:");
  if (comment == null) {
    return;
  } else {
    editor.command(wrapComment(editor, comment));
  }
};
// };

const InputButton = ({ editor, type, icon }) => {
  const { value } = editor;
  const isActive = value.activeMarks.some((mark) => mark.type === type);
  return (
    <Button
      reversed
      active={isActive}
      onMouseDown={(event) => {
        event.preventDefault();
        onClickComment(event, editor);
      }}
    >
      <IconBlock>
        <Icon icon={commentO} />
      </IconBlock>
    </Button>
  );
};

const ImageButton = ({ editor, type, icon }) => {
  const { value } = editor;
  const isActive = value.activeMarks.some((mark) => mark.type === type);
  return (
    <Button
      reversed
      active={isActive}
      onMouseDown={(event) => {
        event.preventDefault();
        onClickImage(event, editor);
      }}
    >
      <IconBlock>
        <Icon icon={icon} />
      </IconBlock>
    </Button>
  );
};

const HoverMenu = React.forwardRef(({ editor }, ref) => {
  const root = window.document.getElementById("root");
  return ReactDOM.createPortal(
    <Menu
      ref={ref}
      className={css`
        padding: 8px 12px 6px;
        position: absolute;
        z-index: 1;
        top: -10000px;
        left: -10000px;
        margin: -6px;
        opacity: 0;
        background-color: #222;
        border-radius: 4px;
        transition: opacity 0.75s;
      `}
    >
      <MarkButton editor={editor} type="bold" icon={bold} />
      <MarkButton editor={editor} type="italic" icon={italic} />
      <MarkButton editor={editor} type="del" icon={strikethrough} />
      <MarkButton editor={editor} type="u" icon={underline} />
      <InputButton editor={editor} type="pencil" icon={pencil} />
      <ImageButton editor={editor} type="image" icon={image} />
    </Menu>,
    root
  );
});

/**
 * The hovering menu example.
 *
 * @type {Component}
 */

class HoveringMenu extends React.Component {
  /**
   * Deserialize the raw initial value.
   *
   * @type {Object}
   */

  state = {
    value: this.props.value
      ? html.deserialize(this.props.value)
      : html.deserialize(``),
  };

  menuRef = React.createRef();

  /**
   * On update, update the menu.
   */

  componentDidMount = () => {
    this.updateMenu();
  };

  componentDidUpdate = () => {
    this.updateMenu();
  };

  onChange = ({ value }) => {
    this.setState({ value });
    this.props.getEditorText(html.serialize(this.state.value), this.props.name);
  };

  /**
   * Update the menu's absolute position.
   */

  updateMenu = () => {
    const menu = this.menuRef.current;
    if (!menu) return;

    const { value } = this.state;
    const { fragment, selection } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === "") {
      menu.removeAttribute("style");
      return;
    }

    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = 1;
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

    menu.style.left = `${
      rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2
    }px`;
  };

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    return (
      <div>
        <Editor
          style={AppStyles}
          value={this.state.value}
          onChange={this.onChange}
          renderEditor={this.renderEditor}
          renderMark={this.renderMark}
          renderBlock={this.renderBlock}
          renderInline={this.renderInline}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }

  /**
   * Render the editor.
   *
   * @param {Object} props
   * @param {Function} next
   * @return {Element}
   */

  renderEditor = (props, editor, next) => {
    const children = next();
    return (
      <>
        {children}
        <HoverMenu ref={this.menuRef} editor={editor} />
      </>
    );
  };

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "code":
        return <code {...attributes}>{children}</code>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "del":
        return <del {...attributes}>{children}</del>;
      case "u":
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  // Render a Slate block.
  renderBlock = (props, editor, next) => {
    const { attributes, node, isFocused, children } = props;
    switch (node.type) {
      case "paragraph":
        return <p {...attributes}>{children}</p>;
      case "image": {
        // console.log(node.data._root.entries[0][1]);
        const src = node.data._root.entries[0][1];
        return <Img {...attributes} src={src} />;
      }
      default: {
        return next();
      }
    }
  };

  renderInline = (props, editor, next) => {
    const { attributes, children, node } = props;
    switch (node.type) {
      case "input":
        return <input id="text" />;
      case "comment":
        return (
          <CommentStyle data={node.data.get("data")}>{children}</CommentStyle>
        );
      default:
        return next();
    }
  };
}

/**
 * Export.
 */

export default HoveringMenu;
