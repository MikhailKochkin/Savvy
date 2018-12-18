import CreateQuiz from '../components/CreateQuiz';
import PleaseSignIn from '../components/PleaseSignIn';

const CreateQuizPage = (props) => (
    <PleaseSignIn>
        <CreateQuiz id={props.query.id} />
    </PleaseSignIn>
);

export default CreateQuizPage;