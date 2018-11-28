import CreateCase from '../components/CreateCase';
import PleaseSignIn from '../components/PleaseSignIn';

const Create = props => (
  <div>
    <PleaseSignIn>
       <CreateCase/>
    </PleaseSignIn>
  </div>
);

export default Create;