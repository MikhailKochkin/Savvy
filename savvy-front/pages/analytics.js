import Analytics from "../components/teach/Analytics";

const AnalyticsPage = props => (
  <div>
    <Analytics id={props.query.id} name={props.query.name} />
  </div>
);

export default AnalyticsPage;
