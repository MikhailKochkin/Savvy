import CreateLesson from '../components/create/CreateLesson';

const CreateTextPage  = props => (
  <div>
    <CreateLesson id={props.query.id} />
  </div>
);

export default CreateTextPage;