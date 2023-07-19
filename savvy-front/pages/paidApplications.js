import PaidApplications from "../components/PaidApplications";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";

const FOR_MONEY_COURSE_PAGES_QUERY = gql`
  query FOR_MONEY_COURSE_PAGES_QUERY($boolean: Boolean = true) {
    coursePages(
      where: {
        courseType: { in: [PRIVATE, FORMONEY] }
        published: { equals: $boolean }
      }
    ) {
      id
      title
    }
  }
`;

const PaidApplicationsPage = () => (
  <>
    <Query
      query={FOR_MONEY_COURSE_PAGES_QUERY}
      returnPartialData={true}
      fetchPolicy="cache-first"
      variables={{
        type: "FORMONEY" || "PRIVATE",
      }}
    >
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        return data.coursePages.map((coursePage) => (
          <PaidApplications id={coursePage.id} title={coursePage.title} />
        ));
      }}
    </Query>
  </>
);

export default PaidApplicationsPage;
