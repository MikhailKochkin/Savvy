import React from 'react';
import Plain from 'slate-plain-serializer';
import Html from 'slate-html-serializer'
import { Editor } from 'slate-react';
import { KeyUtils } from 'slate';
import { Value } from 'slate'
import Icon from 'react-icons-kit';
import BoldMark from './BoldMark';
import ItalicMark from './ItalicMark';
import FormatToolBar from './FormatToolbar';
// import SpoilerText from './SpoilerText';
import {bold} from 'react-icons-kit/icomoon/bold';
import {italic} from 'react-icons-kit/iconic/italic';
import {userSecret} from 'react-icons-kit/fa/userSecret';
import dynamic from 'next/dynamic';

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
  fontSize: '2rem'
}

const BLOCK_TAGS = {
  p: 'paragraph',
}

// Add a dictionary of mark tags.
const MARK_TAGS = {
  i: 'italic',
  strong: 'bold',
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
        }
      }
    },
  },
]

const html = new Html({
  rules,
});

const initialValue = `
  <p>Привет!</p><p>Ты собираешься написать предложение для этой песочницы. Это круто, спасибо, что помогаешь проекту развиваться</p><p>У нас есть только одно предложение. Можешь написать свое предложение по модели IRAC? Мы даже дадим для тебя примерный план</p><p><strong>1. Опиши проблему </strong></p><p><strong>2. Перечисли применимые нормы права </strong></p><p><strong>3. Проанализируй проблему и опиши ее решение </strong></p><p><strong>4. Дай выводы </strong></p>

`

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

  passText = () => {
    this.props.getEditorText(html.serialize(this.state.value));
  }

  render () {
    var parser = new DOMParser();
    function toDom(string) {
      return new DOMParser().parseFromString(string, "text/html")
    }
    const bring = '<h1>Mikhail Kochkin</h1>'
    const el = ( domstring ) => {
      const html = new DOMParser().parseFromString( domstring , 'text/html');
      return html.body.firstChild;
    };
    return (
      <>
        <FormatToolBar>
          {this.renderMarkButton('bold', bold)}
          {this.renderMarkButton('italic', italic)}
          {/* {this.renderNodeButton('spoiler', userSecret)} */}
        </FormatToolBar>
        <Editor
          style = {AppStyles}
          autoCorrect={true}
          placeholder='Enter some plain text...'
          ref={this.ref}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
          // renderNode={this.renderNode}
        />
        <br/>
        <h1>The text you will get: </h1>
        <p>{parser.parseFromString(html.serialize(this.state.value), "text/html").firstChild.innerHTML}</p>
        {/* {console.log(toDom(html.serialize(this.state.value)).innerHTML)} */}

    
       

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

  // onSubmit = ({}) => {
    
  // }

  renderMark = (props, editor, next) => {
    const { mark } = props
    switch (mark.type) {
      case 'bold':
        return <BoldMark {...props} />
      case 'italic':
        return <ItalicMark {...props} />
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