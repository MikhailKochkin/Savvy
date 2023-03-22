import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styled from "styled-components";

import Post from "../components/blog/Post";
import Navigator from "../components/navigator/Navigator";

import { useUser } from "../components/User";
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "blog", "landing"])),
  },
});

const Styles = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 70px;
`;
const Container = styled.div`
  width: 50%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 70px 0;
`;

const PostPage = (props) => {
  const me = useUser();

  return (
    <Styles>
      <Container>
        <Post id={props.query.id} me={me} />
        <Navigator level={"more_next_steps"} />
      </Container>
    </Styles>
  );
};

export default PostPage;
