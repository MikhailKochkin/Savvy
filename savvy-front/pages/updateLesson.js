import UpdateLesson from '../components/lesson/UpdateLesson';

const Update = ( { query } ) => (
  <div>
      <UpdateLesson id={query.id} />
  </div>
);

export default Update;