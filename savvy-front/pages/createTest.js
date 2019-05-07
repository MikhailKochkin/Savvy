import CreateTest from '../components/create/CreateTest';
import PleaseSignIn from '../components/auth/PleaseSignIn';

const CreateQuizPage = (props) => (
    <PleaseSignIn>
        <CreateTest id={props.query.id} />
    </PleaseSignIn>
);

export default CreateQuizPage;