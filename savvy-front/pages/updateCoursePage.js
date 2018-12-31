import UpdateCoursePage from '../components/course/UpdateCoursePage';

const Update = ( { query } ) => (
  <div>
      <UpdateCoursePage id={query.id} />
  </div>
);

export default Update;