import React from 'react';
import Plain from 'slate-plain-serializer';
import Html from 'slate-html-serializer'
import { Editor } from 'slate-react';
import { KeyUtils } from 'slate';
import { Value } from 'slate'
import Icon from 'react-icons-kit';
import BoldMark from './BoldMark';
import HeaderMark from './HeaderMark';
import ItalicMark from './ItalicMark';
import FormatToolBar from './FormatToolbar';
import {bold} from 'react-icons-kit/fa/bold'
import {italic} from 'react-icons-kit/fa/italic'
import {header} from 'react-icons-kit/fa/header'


const ButtonStyle = {
  padding: '7px',
  margin: '3px',
  borderRadius: '5px'
}

const FormatToolbarStyles = {
  display: 'flex',
  borderBottom:'solid 1.7px',
  padding: '10px 0',
  margin: '0 0 10px 0',
}

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

const BLOCK_TAGS = {
  p: 'paragraph',
}

// Add a dictionary of mark tags.
const MARK_TAGS = {
  i: 'italic',
  strong: 'bold',
  header: 'header',
}

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'block',
          type: type,
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'block') {
        switch (obj.type) {
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>
        }
      }
    },
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (type) {
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
        }
      }
    },
  },
]

const html = new Html({
  rules,
});

const initialValue = `<p>Привет!</p><p>Ты собираешься добавить какой-то материал на Savvy. Это круто, спасибо, что помогаешь проекту развиваться</p><p>У нас есть только одно предложение. Если это возможно, можешь написать свой текст по модели IRAC? Мы даже дадим для тебя примерный план, как это сделать.</p><p><strong>1. Опиши проблему </strong></p><p><strong>2. Перечисли применимые нормы права </strong></p><p><strong>3. Проанализируй проблему и опиши ее решение </strong></p><p><strong>4. Дай выводы </strong></p>`

class App extends React.Component {
  constructor (props) {
    super(props)

    // In order to allow ssr we need to reset the key
    // generating function to its initial state.
    // KeyUtils.resetGenerator()

    // Deserialize the initial editor value.
    this.state = {
      value: html.deserialize(initialValue)
    }

    this.ref = editor => {
      this.editor = editor
    }  
  }

  render () {
   
    return (
      <>
        <FormatToolBar>
          {this.renderMarkButton('bold', bold)}
          {this.renderMarkButton('italic', italic)}
          {this.renderMarkButton('header', header)}
        </FormatToolBar>
        <Editor
          style = {AppStyles}
          autoCorrect={true}
          placeholder='Начните писать...'
          ref={this.ref}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
          // renderNode={this.renderNode}
        />
        {/* <h1>The text you will get: </h1>
        <p>{parser.parseFromString(html.serialize(this.state.value), "text/html").firstChild.innerHTML}</p> */}
      </>
    )
  }

  renderMarkButton = (type, icon) => {
    return (
      <button
        style={ButtonStyle}
        onClick={event => this.onClickMark(event, type)}
      >
        <Icon icon={icon}/>
      </button>
    )
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    this.editor.toggleMark(type)
  }

  renderNodeButton = (type, icon) => {
    return (
      <button
        style={ButtonStyle}
        onClick={event => this.onClickNode(event)}
      >
        <Icon icon={icon}/>
      </button>
    )
  }

  // onClickNode = (event) => {
  //   event.preventDefault()
  //   const isSpoiler = this.editor.value.blocks.some(block => block.type == 'spoiler')
  //   this.editor.setBlocks(isSpoiler ? 'paragraph' : 'spoiler');
  // }

  onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next()

    // const isSpoiler = editor.value.blocks.some(block => block.type == 'spoiler')

    switch (event.key) {
      case 'b': {
        event.preventDefault()
        editor
          .toggleMark('bold');
        break
      }
      case 'i': {
        event.preventDefault()
        editor
          .toggleMark('italic');
          break
      }
      case 'h': {
        event.preventDefault()
        editor
          .toggleMark('header');
          break
      }
      // case 's': {
      //   event.preventDefault()
      //   editor
      //     .setBlocks(isSpoiler ? 'paragraph' : 'spoiler');
      //   break
      // }    
      default: {
        return next()
    }
  }
}

  onChange = ({ value }) => {
    const content = JSON.stringify(value.toJSON())
    // console.log(content)
    this.setState({value})
    this.props.getEditorText(html.serialize(this.state.value));
  }

  renderMark = (props, editor, next) => {
    const { mark } = props
    switch (mark.type) {
      case 'bold':
        return <BoldMark {...props} />
      case 'italic':
        return <ItalicMark {...props} />
      case 'header':
        return <HeaderMark {...props} />
      default:
        return next()
    }
  }

  // renderMark = (props, editor, next) => {
  //   const { mark, attributes } = props
  //   switch (mark.type) {
  //     case 'bold':
  //       return <strong {...attributes}>{props.children}</strong>
  //     case 'italic':
  //       return <em {...attributes}>{props.children}</em>
  //     case 'underline':
  //       return <u {...attributes}>{props.children}</u>
  //     default:
  //       return next()
  //   }
  // }

//   renderNode = (props, editor, next) => {
//     switch (props.node.type) {
//       case 'spoiler':
//         return <SpoilerText {...props} />
//       default:
//         return next()
//     }
//   }
}

export default App