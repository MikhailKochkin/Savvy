import Article from "../components/article/Article";

const ArticlePage = props => (
  <div>
    <Article id={props.query.id} />
  </div>
);

export default ArticlePage;
