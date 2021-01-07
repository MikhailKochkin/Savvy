import Stats from "../components/stats/Stats";

const StatsPage = (props) => (
  <Stats id={props.query.id} name={props.query.name} />
);

export default StatsPage;
