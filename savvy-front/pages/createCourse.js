import CreateCourse from '../components/CreateCourse';
import CreateSandbox from '../components/CreateSandbox';
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