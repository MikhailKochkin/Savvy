import UpdateLesson from '../components/course/UpdateLesson';

const Update = ( { query } ) => (
  <div>
      <UpdateLesson id={query.id} />
  </div>
);

export default Update;