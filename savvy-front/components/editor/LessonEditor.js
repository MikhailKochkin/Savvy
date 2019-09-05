import React from "react";
import styled from "styled-components";
import Plain from "slate-plain-serializer";
import Html from "slate-html-serializer";
import { Editor } from "slate-react";
import Icon from "react-icons-kit";
import BoldMark from "./BoldMark";
import HeaderMark from "./HeaderMark";
import ItalicMark from "./ItalicMark";
import LinkMark from "./Link";
import CommentStyle from "./CommentStyle";
import FormatToolBar from "./FormatToolbar";
import { bold } from "react-icons-kit/fa/bold";
import { italic } from "react-icons-kit/fa/italic";
import { header } from "react-icons-kit/fa/header";
import { link } from "react-icons-kit/fa/link";
import { image } from "react-icons-kit/fa/image";
import { commentO } from "react-icons-kit/fa/commentO";
import { eyeSlash } from "react-icons-kit/fa/eyeSlash";
import { list } from "react-icons-kit/fa/list";
import { film } from "react-icons-kit/fa/film";

const LinkStyle = styled.a`
  text-decoration: underline;
  color: #800000;
`;

const Img = styled.img`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: "0 0 0 2px blue;";
`;

const Iframe = styled.iframe`
  width: 80%;
  height: 20em;
  @media (max-width: 800px) {
    width: 100%;
    height: 15em;
  }
  box-shadow: "0 0 0 2px blue;";
`;

const ButtonStyle = styled.button`
  padding: 7px;
  margin: 3px;
  border-radius: 5px;
  outline: none;
  &:hover {
    background: #112862;
    color: white;
  }
`;

const AppStyles = {
  color: "rgb(17, 17, 17)",
  maxWidth: "840px",
  backgroundColor: "rgb(255, 255, 255)",
  border: "1px solid #EDEFED",
  boxShadow: "rgba(118, 143, 255, 0.1) 0px 16px 24px 0px",
  padding: "40px",
  margin: "25px auto 25px",
  borderRadius: "4.5px",
  fontSize: "1.6rem"
};

// Define the default node type.
const DEFAULT_NODE = "paragraph";

const BLOCK_TAGS = {
  p: "paragraph",
  img: "image",
  iframe: "video",
  code: "code",
  ol: "numbered-list",
  li: "list-item"
};

const INLINE_TAGS = {
  a: "link"
};

const MARK_TAGS = {
  i: "italic",
  strong: "bold",
  header: "header"
};

// A function to determine whether a URL has an image extension.

function isImage(url) {
  return imageExtensions.includes(getExtension(url));
}

// Get the extension of the URL, using the URL API.

function getExtension(url) {
  return new URL(url).pathname.split(".").pop();
}

function insertImage(editor, src, target) {
  if (target) {
    editor.select(target);
  }

  editor.insertBlock({
    type: "image",
    data: { src }
  });
}

function insertVideo(editor, src, target) {
  if (target) {
    editor.select(target);
  }

  editor.insertBlock({
    type: "video",
    data: { src }
  });
}

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: "block",
          type: type,
          data: {
            src: el.src
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
          case "numbered-list":
            return <ol>{children}</ol>;
          case "list-item":
            return <li>{children}</li>;
          case "image":
            return (
              <img src={obj.data._root.entries[0][1]} alt="caption_goes_here" />
            );
          case "video":
            return (
              <iframe
                src={obj.data._root.entries[0][1]}
                frameBorder="0"
                tabIndex="0"
                allow="autoplay"
                data-translatedyoutubelang="ru"
                allowFullScreen
              />
            );
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
          case "header":
            return <h2>{children}</h2>;
        }
      }
    }
  },
  {
    deserialize(el, next) {
      if (el.tagName !== "A" && el.tagName !== "SPAN" && el.tagName !== "DIV") {
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
          case "link":
            return (
              <LinkStyle href={object.data._root.entries[0][1]} target="_blank">
                {children}
              </LinkStyle>
            );
        }
      }
    }
  }
];

const html = new Html({
  rules
});

const initialValue = `<p></p>`;

class App extends React.Component {
  // Deserialize the initial editor value.
  state = {
    value: this.props.previousText
      ? html.deserialize(this.props.previousText)
      : html.deserialize(initialValue)
  };

  // Check if the current selection has a mark with `type` in it.

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  hasLinks = () => {
    const { value } = this.state;
    return value.inlines.some(inline => inline.type === "link");
  };

  wrapLink = (editor, href) => {
    editor.wrapInline({
      type: "link",
      data: { href }
    });
    editor.moveToEnd();
  };

  unwrapLink = editor => {
    editor.unwrapInline("link");
  };

  // Store a reference to the `editor`.
  ref = editor => {
    this.editor = editor;
  };

  render() {
    return (
      <>
        <FormatToolBar>
          {this.renderMarkButton("bold", bold)}
          {this.renderMarkButton("italic", italic)}
          {this.renderMarkButton("header", header)}
          {this.renderBlockButton("numbered-list", "format_list_numbered")}
          <ButtonStyle onMouseDown={event => this.onClickLink(event)}>
            <Icon icon={link} />
          </ButtonStyle>
          <ButtonStyle onMouseDown={event => this.onClickImage(event)}>
            <Icon icon={image} />
          </ButtonStyle>
          <ButtonStyle onMouseDown={event => this.onClickFilm(event)}>
            <Icon icon={film} />
          </ButtonStyle>
        </FormatToolBar>
        <Editor
          style={AppStyles}
          placeholder="Начните писать..."
          ref={this.ref}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderBlock={this.renderBlock}
          renderInline={this.renderInline}
          renderMark={this.renderMark}
        />
        {/* <div dangerouslySetInnerHTML={{ __html: html.serialize(this.state.value) }}></div>     */}
      </>
    );
  }

  // Render a Slate block.
  renderBlock = (props, editor, next) => {
    const { attributes, node, isFocused, children } = props;
    switch (node.type) {
      case "paragraph":
        return <p {...attributes}>{children}</p>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;
      case "image": {
        const src = node.data.get("src");
        return <Img {...attributes} src={src} />;
      }
      case "video": {
        const src = node.data.get("src");
        return (
          <Iframe
            {...attributes}
            src={src}
            frameborder="0"
            tabindex="0"
            allow="autoplay"
            data-translatedyoutubelang="ru"
            allowFullScreen
          />
        );
      }
      default: {
        return next();
      }
    }
  };

  renderMark = (props, editor, next) => {
    const { mark, children, attributes } = props;
    switch (mark.type) {
      case "bold":
        return <BoldMark {...attributes}>{children}</BoldMark>;
      case "italic":
        return <ItalicMark {...attributes}>{children}</ItalicMark>;
      case "header":
        return <HeaderMark {...attributes}>{children}</HeaderMark>;
      default:
        return next();
    }
  };

  renderInline = (props, editor, next) => {
    const { attributes, children, node } = props;
    switch (node.type) {
      case "link":
        return <LinkMark href={node.data.get("href")}>{children}</LinkMark>;
      default:
        return next();
    }
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  // Render a mark-toggling toolbar button.
  renderMarkButton = (type, icon) => {
    return (
      <ButtonStyle onClick={event => this.onClickMark(event, type)}>
        <Icon icon={icon} />
      </ButtonStyle>
    );
  };

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (["numbered-list"].includes(type)) {
      const {
        value: { document, blocks }
      } = this.state;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock("list-item") && parent && parent.type === type;
      }
    }
    return (
      <ButtonStyle onMouseDown={event => this.onClickBlock(event, type)}>
        <Icon icon={list} />
      </ButtonStyle>
    );
  };

  // On clicking the image button, prompt for an image and insert it.
  onClickImage = event => {
    event.preventDefault();
    const src = window.prompt("Enter the URL of the image:");
    if (!src) return;
    this.editor.command(insertImage, src);
  };

  onClickFilm = event => {
    event.preventDefault();
    const src = window.prompt("Enter the URL of the video:");
    if (!src) return;
    this.editor.command(insertVideo, src);
  };

  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== "numbered-list") {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock("list-item");
      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item");
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor.setBlocks(DEFAULT_NODE).unwrapBlock("bulleted-list");
      } else if (isList) {
        editor
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks("list-item").wrapBlock(type);
      }
    }
  };

  // When clicking a link, if the selection has a link in it, remove the link.
  // Otherwise, add a new link with an href and text.

  onClickLink = event => {
    event.preventDefault();
    const { editor } = this;
    const { value } = editor;
    const hasLinks = this.hasLinks();
    if (hasLinks) {
      this.editor.command(this.unwrapLink);
    } else if (value.selection.isExpanded) {
      const href = window.prompt("Enter the URL of the link:");
      if (href == null) {
        return;
      } else {
        this.editor.command(this.wrapLink, href);
      }
    } else {
      const href = window.prompt("Enter the URL of the link:");
      if (href == null) {
        return;
      } else {
        const text = window.prompt("Enter the text for the link:");
        if (text == null) {
          return;
        }

        editor
          .insertText(text)
          .moveFocusBackward(text.length)
          .command(this.wrapLink, href);
      }
    }
  };

  onKeyDown = (event, editor, next) => {
    if (event.key != "b" || !event.ctrlKey) return next();

    event.preventDefault();

    // Determine whether any of the currently selected blocks are code blocks.
    // const isCode = this.editor.value.blocks.some(block => block.type == 'code')
    editor.setBlocks("code");

    // let mark
    // if (isBoldHotkey(event)) {
    //   mark = 'bold'
    // } else if (isItalicHotkey(event)) {
    //   mark = 'italic'
    // } else if (isUnderlinedHotkey(event)) {
    //   mark = 'header'
    // } else if (isCodeHotkey(event)) {
    //   mark = 'code'
    // } else if (isCodeHotkey(event)) {
    //   mark = 'quote'
    // } else {
    //   return next()
    // }
    // console.log("mark: " + mark)
    // event.preventDefault()
    // if(mark !== undefined){this.editor.toggleMark(mark)}
  };
  onChange = ({ value }) => {
    this.setState({ value });
    this.props.getEditorText(html.serialize(this.state.value));
  };
}

export default App;
