import Applications from '../components/course/Applications';

const ApplicationsPage = (props) => (
  <div>
    <Applications id={props.query.id} />
  </div>
);


export default ApplicationsPage;