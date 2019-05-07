import CreatePointATest from '../components/create/CreatePointATest.js';
import PleaseSignIn from '../components/auth/PleaseSignIn';
import AreYouATeacher from '../components/auth/AreYouATeacher';

const TestPointAPage = (props) => (
    <PleaseSignIn>
        <AreYouATeacher
            subject={props.query.id}
        >
            <CreatePointATest id={props.query.id} />
        </AreYouATeacher>
    </PleaseSignIn>
);

export default TestPointAPage;