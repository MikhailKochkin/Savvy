import React from 'react';
import styled from 'styled-components';
import Plain from 'slate-plain-serializer';
import Html from 'slate-html-serializer'
import { Editor } from 'slate-react';
import Icon from 'react-icons-kit';
import isUrl from 'is-url'
import BoldMark from './BoldMark';
import HeaderMark from './HeaderMark';
import ItalicMark from './ItalicMark';
import LinkMark from './Link';
import CommentStyle from './CommentStyle';
import FormatToolBar from './FormatToolbar';
import {bold} from 'react-icons-kit/fa/bold'
import {italic} from 'react-icons-kit/fa/italic'
import {header} from 'react-icons-kit/fa/header'
import {link} from 'react-icons-kit/fa/link'
import {image} from 'react-icons-kit/fa/image'
import {commentO} from 'react-icons-kit/fa/commentO'
import {eyeSlash} from 'react-icons-kit/fa/eyeSlash'
import {list} from 'react-icons-kit/fa/list'
import {film} from 'react-icons-kit/fa/film'

const Div = styled.div`
  color: yellow;

`;
const LinkStyle = styled.a`
  font-size: 1.8rem;
  font-weight: bold;
`;

const HintStyle = styled.div`
  font-size: 1.8rem;
  color: brown;
`;

const CommentStyle2 = styled.span`
  color: green;
`;

const Img = styled.img`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: '0 0 0 2px blue;';
`;

const Iframe = styled.img`
  display: block;
  width: auto;
  height: 400px;
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
`

const AppStyles = {
  color: 'rgb(17, 17, 17)',
	maxWidth: '740px',
	backgroundColor: 'rgb(255, 255, 255)',
	boxShadow: 'rgba(118, 143, 255, 0.1) 0px 16px 24px 0px',
	padding: '40px',
	margin: '25px auto 45px',
  borderRadius: '4.5px',
  fontSize: '1.8rem'
}

// Define the default node type.
const DEFAULT_NODE = 'paragraph'

const BLOCK_TAGS = {
  p: 'paragraph',
  img: 'image',
  iframe: 'video',
  code: 'code',
  div: 'hint',
  ol: 'numbered-list',
  li: 'list-item'
}

const INLINE_TAGS = {
  a: 'link',
  span: 'comment',
  div: 'hintWrapper',
};

const MARK_TAGS = {
  i: 'italic',
  strong: 'bold',
  header: 'header',
  // code: 'code',
  blockquote: 'quote',
}

function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

// A function to determine whether a URL has an image extension.

function isImage(url) {
  return imageExtensions.includes(getExtension(url))
}

// Get the extension of the URL, using the URL API.

function getExtension(url) {
  return new URL(url).pathname.split('.').pop()
}

function insertImage(editor, src, target) {
  if (target) {
    editor.select(target)
  }

  editor.insertBlock({
    type: 'image',
    data: { src },
  })
}

function insertVideo(editor, src, target) {
  if (target) {
    editor.select(target)
  }

  editor.insertBlock({
    type: 'video',
    data: { src },
  })
}

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        // console.log(el)
        return {
          object: 'block',
          type: type,
          data: {
            className: el.src,
          },
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'block') {
        console.log(obj.type)
        switch (obj.type) {
          case 'code':
            // console.log("code:  " + obj.type)
            return (
              <pre>
                <code>{children}</code>
              </pre>
            )
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>
          case 'hint':
            console.log(obj.data._root.entries[0][1])
            return <div id="conceal" data-text={obj.data._root.entries[0][1]}>{children}</div>
          case 'numbered-list':
              return <ol>{children}</ol>
          case 'list-item':
            return <li>{children}</li>
          case 'image':
            return <img src={obj.data._root.entries[0][1]} alt="caption_goes_here"/>;
          case 'video':
            return <iframe src={obj.data._root.entries[0][1]} frameborder="0" tabindex="0" allow="autoplay" data-translatedyoutubelang="ru" allowFullScreen></iframe>;
        }
      }
    },
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        // console.log(el, type)
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>
          case 'italic':
            return <i>{children}</i>
          case 'header':
            return <h2>{children}</h2>
          case 'quote':
            return <blockquote>{children}</blockquote>
        }
      }
    },
  },
  {
    deserialize (el, next) {
        console.log(el)
        if (el.tagName !== 'A' && el.tagName !== 'SPAN' && el.tagName !== 'DIV' ) { return; }
        const type = INLINE_TAGS[el.tagName.toLowerCase()];
        if (type) {
        return {
            // inline to show that Inline nodes may contain nested inline nodes and text nodes—just like in the DOM.
            object: 'inline',
            type: type,
            nodes: next(el.childNodes),
            data: {
              href: Array.from(el.attributes).find(({name}) => name == 'href') !== undefined ? Array.from(el.attributes).find(({name}) => name == 'href').value : null,
              title: Array.from(el.attributes).find(({name}) => name == 'title') !== undefined ? Array.from(el.attributes).find(({name}) => name == 'title').value : null,
              // dataText: Array.from(el.attributes).find(({name}) => name == 'data-text') !== undefined ? Array.from(el.attributes).find(({name}) => name == 'data-text').value : null
            }
        };
      }
    },
    serialize: function (object, children) {
        if (object.object == 'inline') {
        switch (object.type) {
            case 'link':
              return <LinkStyle href={object.data._root.entries[0][1]} target="_blank">{children}</LinkStyle>;
            case 'comment':
              return <CommentStyle2 id='id' title={object.data._root.entries[0][1]}>{children}</CommentStyle2>;
            case 'hintWrapper':
              return <div id='conceal' data-text={object.data._root.entries[0][1]}>{children}</div>;
        }
      }
    }
  },
]

const html = new Html({
  rules,
});

const initialValue = `<p>6 июня по подозрению в покушении на сбыт и производство наркотиков был 
задержан специальный корреспондент отдела расследований издания «Медуза» Иван Голунов.</p>
<p>Мы приветствуем выбор судом более адекватной, чем заключение в СИЗО, меры пресечения Ивану Голунову.</p>
<p>Вместе с тем мы не считаем представленные следствием доказательства виновности Ивана Голунова убедительными,
 а обстоятельства его задержания вызывают большие сомнения в том, что при проведении следственных
  действий не было нарушено законодательство.</p>`

class App extends React.Component {

    // Deserialize the initial editor value.
    state = {
      value: this.props.previousText ? html.deserialize(this.props.previousText) : html.deserialize(initialValue)
    }

// Check if the current selection has a mark with `type` in it.

    hasMark = type => {
      const { value } = this.state
      return value.activeMarks.some(mark => mark.type === type)
    }

    hasBlock = type => {
      const { value } = this.state
      return value.blocks.some(node => node.type === type)
    }

    hasLinks = () => {
      const { value } = this.state
      return value.inlines.some(inline => inline.type === 'link')
    }

    hasComments = () => {
      const { value } = this.state
      return value.inlines.some(inline => inline.type === 'comment')
    }

    hasHints = () => {
      const { value } = this.state
      return value.inlines.some(inline => inline.type === 'hint')
    }

    wrapLink = (editor, href) => {
    editor.wrapInline({
      type: 'link',
      data: { href },
    })
    editor.moveToEnd()
  }
    wrapComment = (editor, comment) => {
      editor.wrapInline({
        type: 'comment',
        data: { comment },
      })
      editor.moveToEnd()
  }

  wrapHint = (editor, hint) => {
    editor.wrapInline({
      type: 'hintWrapper',
      data: { hint },
    })
    editor.moveToEnd()
}
  
  unwrapLink = (editor) => { editor.unwrapInline('link') }

  unwrapComment = (editor) => { editor.unwrapInline('comment') }

  unwrapHint = (editor) => { editor.unwrapInline('hint') }

  // Store a reference to the `editor`.
    ref = editor => {
      this.editor = editor
    }  
  
  render () {
   
    return (
      <>
        <FormatToolBar>
          {this.renderMarkButton('bold', bold)}
          {this.renderMarkButton('italic', italic)}
          {this.renderMarkButton('header', header)}
          {this.renderBlockButton('numbered-list', 'format_list_numbered')}
          {this.renderHintBlockButton('hint', 'format_list_numbered')}
          <ButtonStyle onMouseDown= {event => this.onClickLink(event)}>
            <Icon icon={link}/>
          </ButtonStyle>
          <ButtonStyle onMouseDown={event => this.onClickImage(event)}>
            <Icon icon={image}/>
          </ButtonStyle>
          <ButtonStyle onMouseDown={event => this.onClickFilm(event)}>
            <Icon icon={film}/>
          </ButtonStyle>
          <ButtonStyle onMouseDown={event => this.onClickComment(event)}>
            <Icon icon={commentO}/>
          </ButtonStyle>
        </FormatToolBar>
        <Editor
          style = {AppStyles}
          placeholder='Начните писать...'
          ref={this.ref}
          // schema={schema}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderBlock={this.renderBlock}
          renderInline={this.renderInline}
          renderMark={this.renderMark}
          onDropOrPaste={this.onDropOrPaste}
          // onPaste={this.onPaste}
        />
        <div dangerouslySetInnerHTML={{ __html: html.serialize(this.state.value) }}></div>    
      </>
    )
  }

  // Render a Slate block.
  renderBlock = (props, editor, next) => {
    // console.log("Render Block!!!")
    const { attributes, node, isFocused, children } = props
    // console.log(props)
    switch (node.type) {
      case 'paragraph':
        return <p {...attributes}>{children}</p>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      case 'hint': {
        return <Div data-text={"1111"}>{children}</Div>
      }
      case 'code':
        return <CodeNode {...props} />
      case 'image': {
        const src = node.data.get('src')
        return (
          <Img
            {...attributes}
            src={src}
          />
        )
      }
      case 'video': {
        const src = node.data.get('src')
        return (
          <Iframe
            {...attributes}
            src={src}
            frameborder="0" tabindex="0" allow="autoplay" data-translatedyoutubelang="ru" allowFullScreen
          ></Iframe>
        )
      }
      default: {
        return next()
      }
    }
  }

  renderMark = (props, editor, next) => {
    const { mark, children, attributes } = props
    // console.log("mark:" + mark)
    switch (mark.type) {
      case 'bold':
        return <BoldMark {...attributes}>{children}</BoldMark>
      case 'italic':
        return <ItalicMark {...attributes}>{children}</ItalicMark>
      case 'header':
        return <HeaderMark {...attributes}>{children}</HeaderMark>
      case 'quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'area':
        return <div data-text={"1111"}>{children}</div>
      default:
        return next()
    }
  }

  renderInline = (props, editor, next) => {
    const { attributes, children, node } = props
    console.log("renderInline")
    switch (node.type) {
      case 'link': 
        return <LinkMark href={node.data.get('href')}>{children}</LinkMark>
      case 'comment': 
        return <CommentStyle title={node.data.get('title')}>{children}</CommentStyle>
      case 'hint': 
        return <HintStyle data-text={node.data.get('data-text')}>{children}</HintStyle>
      default: 
        return next()
    }
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    this.editor.toggleMark(type)
  }

  // Render a mark-toggling toolbar button.
  renderMarkButton = (type, icon) => {
    return (
      <ButtonStyle
        onClick={event => this.onClickMark(event, type)}
      >
        <Icon icon={icon}/>
      </ButtonStyle>
    )
  }

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type)

    if (['numbered-list'].includes(type)) {
      const { value: { document, blocks } } = this.state

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key)
        isActive = this.hasBlock('list-item') && parent && parent.type === type
      }
    }
    return (
      <ButtonStyle
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        <Icon icon={list}/>
      </ButtonStyle>
    )
  }

  renderHintBlockButton = (type, icon) => {
    // let isActive = this.hasBlock(type)

    // if (['numbered-list'].includes(type)) {
    //   const { value: { document, blocks } } = this.state

    //   console.log(this.state.value)

    //   if (blocks.size > 0) {
    //     const parent = document.getParent(blocks.first().key)
    //     console.log(parent)
    //     isActive = this.hasBlock('list-item') && parent && parent.type === type
    //     console.log(isActive)
    //   }
    // }

    return (
      <ButtonStyle
        onMouseDown={event => this.onClickHintBlock(event, type)}
      >
        <Icon icon={eyeSlash}/>
      </ButtonStyle>
    )
  }

  // On clicking the image button, prompt for an image and insert it.
onClickImage = event => {
  event.preventDefault()
  const src = window.prompt('Enter the URL of the image:')
  if (!src) return
  this.editor.command(insertImage, src)
}

onClickFilm = event => {
  event.preventDefault()
  const src = window.prompt('Enter the URL of the video:')
  if (!src) return
  this.editor.command(insertVideo, src)
}

// On drop, insert the image wherever it is dropped.
  onDropOrPaste = (event, editor, next) => {
    console.log()
    const target = editor.findEventRange(event)
    if (!target && event.type === 'drop') return next()

    const transfer = getEventTransfer(event)
    const { type, text, files } = transfer

    if (type === 'files') {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')
        if (mime !== 'image') continue

        reader.addEventListener('load', () => {
          editor.command(insertImage, reader.result, target)
        })

        reader.readAsDataURL(file)
      }
      return
    }

    if (type === 'text') {
      if (!isUrl(text)) return next()
      if (!isImage(text)) return next()
      editor.command(insertImage, text, target)
      return
    }

    next()
  }

  onClickHintBlock = (event, type) => {
    event.preventDefault()

    const { editor } = this
    const { value } = editor
    const { document } = value
    const data = window.prompt('Как назвать этот текст?')
 
    // Handle everything but list buttons.
    if (type !== 'hint') {
      console.log("0")
      const isActive = this.hasBlock(type)
      console.log(isActive)
      const isHint = this.hasBlock('paragraph')
      console.log(isHint)
    
      if (isHint) {
        console.log("1")
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          // .unwrapBlock('bulleted-list')
      } else {
        console.log("2")
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      console.log("3")
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('paragraph')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        console.log("4")
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('hint')
          // .unwrapBlock('numbered-list')
      } 
      else if (isList) {
        console.log("5")
        editor
          // .unwrapBlock(
          //   type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          // )
       
          .wrapBlock({
            type: 'hint',
            data: { data } ,
          })
  
          // .wrapBlock('hint', 'hintdata')

      } else {
        console.log("6")
        editor.setBlocks('paragraph').wrapHint("type")
      }
    }
  }

  onClickBlock = (event, type) => {
    event.preventDefault()

    const { editor } = this
    const { value } = editor
    const { document } = value

    // Handle everything but list buttons.
    if (type !== 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')
      console.log(isList)
      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
  }

  // When clicking a link, if the selection has a link in it, remove the link.
  // Otherwise, add a new link with an href and text.

  onClickLink = event => {
    event.preventDefault()
    // console.log("Click the link!")
    const { editor } = this
    const { value } = editor
    const hasLinks = this.hasLinks()
    // console.log(value.selection)
    if (hasLinks) {
      // console.log("hasLinks")
      this.editor.command(this.unwrapLink)
    } 
    else if (value.selection.isExpanded) {
      // console.log("selection.isExpanded")
      const href = window.prompt('Enter the URL of the link:')
      if (href == null) {
        return
      } else {
        this.editor.command(this.wrapLink, href)
        // console.log("Ссылка создана!")
      }
    } 
    else {
      console.log("else")
      const href = window.prompt('Enter the URL of the link:')
      console.log(href)
      if (href == null) {
        return
      } else {
        const text = window.prompt('Enter the text for the link:')
        console.log(text)

        if (text == null) {
          return
        }

        editor
        .insertText(text)
        .moveFocusBackward(text.length)
        .command(this.wrapLink, href)
      }
    }
  }

  onClickComment = event => {
    event.preventDefault()
    const { editor } = this
    const { value } = editor
    const hasComments = this.hasComments()
    if (hasComments) {
      // console.log("hasLinks")
      this.editor.command(this.unwrapComment)
    } else if (value.selection.isExpanded) {
      const comment = window.prompt('Напишите комментарий:')
      if (comment == null) {
        return;
      } else {
        this.editor.command(this.wrapComment, comment)
        console.log("Комментарий создан!")
      }
    } 
  }

  onClickHint = event => {
    event.preventDefault()
    const { editor } = this
    const { value } = editor
    const hasHints = this.hasHints()
    if (hasHints) {
      // console.log("hasLinks")
      this.editor.command(this.unwrapHint)
    } else if (value.selection.isExpanded) {
      const hint = window.prompt('Напишите подсказку:')
      if ( hint == null) {
        return;
      } else {
        this.editor.command(this.wrapHint, hint)
        console.log("Подсказка создана!")
      }
    } 
  }


  // On paste, if the text is a link, wrap the selection in a link.

  onPaste = (event, editor, next) => {
    if (editor.value.selection.isCollapsed) return next()

    const transfer = getEventTransfer(event)
    const { type, text } = transfer
    if (type !== 'text' && type !== 'html') return next()
    if (!isUrl(text)) return next()

    if (this.hasLinks()) {
      editor.command(unwrapLink)
    }

    editor.command(wrapLink, text)
  }

  onKeyDown = (event, editor, next) => {
    console.log(event.key)
    if (event.key != 'b' || !event.ctrlKey) return next()

   
    event.preventDefault()

    // Determine whether any of the currently selected blocks are code blocks.
    // const isCode = this.editor.value.blocks.some(block => block.type == 'code')
    // console.log(isCode)
    editor.setBlocks('code')

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

}

  onChange = ({ value }) => {
    this.setState({value})
    console.log(html.serialize(this.state.value));
    this.props.getEditorText(html.serialize(this.state.value));
  }
}

export default App
