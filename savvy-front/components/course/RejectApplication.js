import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { NavButton, SubmitButton } from '../styles/Button';
import { DELETE_APPLICATION_MUTATION } from './AcceptApplication'

class RejectApplication extends Component {
    onClick = async (e, deleteApplication) => {
        e.preventDefault();
        deleteApplication({
            variables: {
                id: this.props.applicationId
            }
        })
        // console.log("Отклонено!")
    }
    render() {
        return (
            <div>
                <Mutation 
                    mutation={DELETE_APPLICATION_MUTATION}>
                        {(deleteApplication) => (
                            <SubmitButton red
                                onClick={e => this.onClick(e, deleteApplication)}
                            >
                                Отклонить
                            </SubmitButton>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default RejectApplication;