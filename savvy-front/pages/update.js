import UpdateCase from '../components/UpdateCase';

const Update = ({ query}) => (
  <div>
      <UpdateCase id={query.id} />
  </div>
);

export default Update;