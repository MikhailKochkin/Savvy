import CreateTextEditor from '../components/create/CreateTextEditor';

const CreateTextEditorPage  = props => (
  <div>
    <CreateTextEditor id={props.query.id} />
  </div>
);

export default CreateTextEditorPage;