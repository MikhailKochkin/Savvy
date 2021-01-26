import Analytics from "../components/teach/Analytics";

const AnalyticsPage = props => (
  <>
    <Analytics id={props.query.id} name={props.query.name} />
  </>
);

export default AnalyticsPage;
