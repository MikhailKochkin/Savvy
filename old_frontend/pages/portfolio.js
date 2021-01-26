import Portfolio from "../components/portfolio/Portfolio";

const PortfolioPage = props => (
  <div>
    <Portfolio id={props.query.id} />
  </div>
);

export default PortfolioPage;
