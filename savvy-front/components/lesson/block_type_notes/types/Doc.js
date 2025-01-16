import styled from "styled-components";
import parse from "html-react-parser";

const Body = styled.div`
  img {
    display: block;
    max-width: 600px;
    box-shadow: "0 0 0 2px blue;";
    object-fit: contain;
    @media (max-width: 800px) {
      width: 100%;
    }
  }
`;

const DocContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f9fa;
  width: 100%;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const DocPage = styled.div`
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  background: #fff;
  border: 1px solid rgb(228, 227, 227);
  padding: 20px;
  width: 90%;
  margin: 40px 0;
`;

const Doc = (props) => {
  const { text, id } = props;

  return (
    <DocContainer id={"note_doc-" + id}>
      <DocPage>
        <Body>{text ? parse(text) : null}</Body>
      </DocPage>
    </DocContainer>
  );
};

export default Doc;
