import CreateNewTest from '../components/create/CreateNewTest';
import PleaseSignIn from '../components/auth/PleaseSignIn';

const CreateNewTestPage = (props) => (
    <PleaseSignIn>
        <CreateNewTest id={props.query.id} />
    </PleaseSignIn>
);

export default CreateNewTestPage;