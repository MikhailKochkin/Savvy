import React, { Component } from 'react';
import DeleteSingleConstructor from '../delete/DeleteSingleConstructor';
import ConstructorElem from './ConstructorElem';

class SingleConstructor extends Component {
    myCallback = (dataFromChild) => {
        this.setState({ 
          text: dataFromChild
        });
      }
    render() {
        return (
            <>
                <h2>{this.props.data.name}</h2>
                <ConstructorElem
                    data={this.props.data.dbPart1}
                />
                <ConstructorElem
                    data={this.props.data.dbPart2}
                />
                <ConstructorElem
                    data={this.props.data.dbPart3}
                />
                <ConstructorElem
                    data={this.props.data.dbPart4}
                />
                {this.props.data.dbPart5.right1 !== "" &&
                <ConstructorElem
                    data={this.props.data.dbPart5}
                />
                }
                {this.props.data.dbPart6.right1 !== "" &&
                <ConstructorElem
                    data={this.props.data.dbPart6}
                />
                }
                {this.props.data.dbPart7.right1 !== "" &&
                <ConstructorElem
                    data={this.props.data.dbPart7}
                />
                }
                {this.props.data.dbPart8.right1 !== "" &&
                <ConstructorElem
                    data={this.props.data.dbPart8}
                />
                }
                { this.props.me && this.props.me.id === this.props.data.user.id ?
                      <DeleteSingleConstructor
                        id={this.props.data.id}
                        lessonID={this.props.lessonId}
                      /> 
                      :
                      null
                  }
            </>
        );
    }
}

export default SingleConstructor;