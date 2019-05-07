import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../User';
import Signin from './Signin';

const PleaseSignIn = props => (
    <Query query={CURRENT_USER_QUERY}>
    {({data}, loading) => {
        if(loading) return <p>Loading...</p>;
        if(!data.me) {
            return (
                <div>
                    <p>Пожалуйста, зарегестрируйтесь или войдите в свой аккаунт перед тем, как работать с этой страницей.</p>
                    <Signin />
                </div>
            );
        }
      return props.children;
    }}
    </Query>
)

export default PleaseSignIn;