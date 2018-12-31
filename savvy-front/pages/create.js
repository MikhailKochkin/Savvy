import CreateCourse from '../components/course/CreateCourse';
import CreateSandbox from '../components/sandbox/CreateSandbox';
import PleaseSignIn from '../components/PleaseSignIn';

const CreateCoursePage = props => (
  <div>
    <PleaseSignIn>
       <CreateCourse/>
       <CreateSandbox/>
    </PleaseSignIn>
  </div>
);

export default CreateCoursePage;