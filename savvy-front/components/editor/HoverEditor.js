import { Editor } from "slate-react";
import Html from "slate-html-serializer";
import React from "react";
import ReactDOM from "react-dom";
import { css } from "emotion";
import { Button, IconBlock, Menu } from "./components";
import Icon from "react-icons-kit";
import { bold } from "react-icons-kit/fa/bold";
import { italic } from "react-icons-kit/fa/italic";
import { pencil } from "react-icons-kit/fa/pencil";

const AppStyles = {
  color: "rgb(17, 17, 17)",
  padding: "0 5px",
  maxWidth: "840px",
  width: "100%",
  fontSize: "1.5rem"
};

const DEFAULT_NODE = "paragraph";

const BLOCK_TAGS = {
  p: "paragraph",
  img: "image",
  iframe: "video",
  ol: "numbered-list",
  li: "list-item"
};

const INLINE_TAGS = {
  a: "link",
  input: "input"
};

const MARK_TAGS = {
  i: "italic",
  strong: "bold",
  header: "header"
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
            className: el.src
          },
          nodes: next(el.childNodes)
        };
      }
    },
    serialize(obj, children) {
      if (obj.object == "block") {
        switch (obj.type) {
          case "paragraph":
            return <p className={obj.data.get("className")}>{children}</p>;
        }
      }
    }
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: "mark",
          type: type,
          nodes: next(el.childNodes)
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
        }
      }
    }
  },
  {
    deserialize(el, next) {
      if (el.tagName !== "INPUT") {
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
            href:
              Array.from(el.attributes).find(({ name }) => name == "href") !==
              undefined
                ? Array.from(el.attributes).find(({ name }) => name == "href")
                    .value
                : null
          }
        };
      }
    },
    serialize: function(object, children) {
      if (object.object == "inline") {
        switch (object.type) {
          case "input":
            return <input name={object.data._root.entries[0][1]} id="text" />;
        }
      }
    }
  }
];

const html = new Html({
  rules
});

const MarkButton = ({ editor, type, icon }) => {
  const { value } = editor;
  const isActive = value.activeMarks.some(mark => mark.type === type);
  return (
    <Button
      reversed
      active={isActive}
      onMouseDown={event => {
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
    data: { src }
  });
  editor.moveToEnd();
};

const onClickLink = (event, editor) => {
  event.preventDefault();
  const src = window.prompt("Enter the URL of the image:");
  if (!src) return;
  editor.command(wrapInput(editor, src));
};

const InputButton = ({ editor, type, icon }) => {
  const { value } = editor;
  const isActive = value.activeMarks.some(mark => mark.type === type);
  return (
    <Button
      reversed
      active={isActive}
      onMouseDown={event => {
        event.preventDefault();
        onClickLink(event, editor);
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
      <InputButton editor={editor} type="pencil" icon={pencil} />
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
      : html.deserialize(``)
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

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`;
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
      case "underlined":
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
      default:
        return next();
    }
  };
}

/**
 * Export.
 */

export default HoveringMenu;
