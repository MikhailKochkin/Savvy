import SingleCase from '../components/SingleCase';

const Case = props => (
  <div>
    <SingleCase id={props.query.id} />
  </div>
);

export default Case;