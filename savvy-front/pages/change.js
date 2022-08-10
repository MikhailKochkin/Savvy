import UpdateCoursePage from "../components/course/UpdateCoursePage";

// const update = ({ query }) => <UpdateCoursePage id={query.id} />;

// export default update;

const change = (props) => <UpdateCoursePage id={props.query.id} />;

export default change;
