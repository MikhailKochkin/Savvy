import { useMemo } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import PropTypes from "prop-types";

const Container = styled.div`
  width: ${(props) => props.width || "100%"};
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .animated {
    /* text-transform: uppercase; */
    background-image: linear-gradient(
      -225deg,
      #231557 0%,
      #44107a 29%,
      #ff1361 67%
    );
    background-size: auto auto;
    background-clip: border-box;
    background-size: 200% auto;
    color: #fff;
    background-clip: text;
    /* text-fill-color: transparent; */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    font-size: 5rem;
    font-weight: 800;
    animation: 2s anim-lineUp ease-out;
    animation: textclip 2s linear infinite;
    p {
      line-height: 1.3;
    }
  }
  @keyframes textclip {
    to {
      background-position: 200% center;
    }
  }
  @keyframes anim-lineUp {
    0% {
      opacity: 0;
      transform: translateY(80%);
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
      transform: translateY(0%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  a {
    width: 30%;
  }
  .note_longread {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .author {
    flex-basis: 10%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    .icon {
      margin: 5px;
      border-radius: 50%;
      height: 55px;
      width: 55px;
      object-fit: cover;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .name {
      font-size: 1.2rem;
      text-align: center;
      color: #8f93a3;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 90%;
    font-size: 1.6rem;
  }
`;

const NoteStyles = styled.div`
  max-width: 100%;
  background: #fff;
  margin: 10px 0 0 0;
  .video-container {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  video {
    max-width: 100%;
    height: auto;
  }
  .video-fit {
    width: 400px;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 800px) {
    width: 95%;
    .video-container {
      width: 350px;
    }
    .video-fit {
      width: 350px;
      height: 100%;
    }
    font-size: 1.6rem;
    width: 100%;
    order: 3;
    h2 {
      font-size: 2.2rem;
      line-height: 1.4;
    }
  }
  .header {
    background: #e0e0e0;
  }
  h2 {
    font-size: 2.8rem;
    font-weight: 600;
    line-height: 1.2;
  }
  img {
    display: block;
    max-width: 600px;
    box-shadow: "0 0 0 2px blue;";
    object-fit: contain;
    @media (max-width: 800px) {
      width: 100%;
    }
  }
  p {
    margin: 20px 0;
  }
  iframe {
    min-width: 600px;
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
      min-width: 300px;
      min-height: 200px;
      width: 100%;
      height: auto;
    }
  }
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0%;
    transition: 0.3s;
    cursor: pointer;
  }
  .flag {
    color: #008489;
    font-size: 1.8rem;
    width: 100%;
    margin: 3% 0;
    padding: 3% 8%;
    background-color: #f2fafb;
    border-radius: 5px;
  }
  .article {
    font-size: 1.6rem;
    width: 100%;
    margin: 1% 1%;
    padding: 1% 4%;
    border-left: 3px solid #0094c6;
    p {
      margin: 10px 0;
    }
  }
  blockquote {
    font-size: 1.6rem;
    width: 100%;
    margin: 0;
    padding: 1% 4%;
    border-left: 3px solid #0094c6;
    p {
      margin: 10px 0;
    }
  }
  pre {
    background: #282c34;
    color: white;
    padding: 2% 4%;
    line-height: 1;
    font-size: 1.4rem;
    border-radius: 10px;
    overflow-x: scroll;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1.4rem;
    tbody {
      width: 100%;
    }
    tr {
      border: 1px solid #edefed;
    }
    tr:nth-child(even) {
      background: #f8f8f8;
    }
    thead {
      background: #36304a;
      color: #fff;
    }
    th {
      border: 1px solid #edefed;
      padding: 15px 0;
    }
    td {
      border: 1px solid #edefed;
      border-top: none;
      border-bottom: none;
      border-right: none;
      padding: 0% 2.5%;
      position: relative;
      padding: 15px 15px;
      vertical-align: top;
    }
  }
  @media (max-width: 800px) {
    .table-wrapper {
      border: 1px solid #d6d6d6;
      width: 100%;
      overflow-x: scroll;
    }
    table {
      width: 380px;
    }
  }
`;

const Longread = (props) => {
  // Function to wrap tables with class table-wrapper
  const wrapTables = (html) => {
    const wrappedHtml = html.replace(
      /<table/g,
      '<div className="table-wrapper"><table'
    );
    return wrappedHtml.replace(/<\/table>/g, "</table></div>");
  };

  const { story, text, id } = props;
  let width;
  if (props.problem) {
    width = "660px";
  } else if (props.story) {
    width = "660px";
  } else {
    width = "90%";
  }

  const processedText = useMemo(
    () => (text ? parse(wrapTables(text)) : null),
    [text]
  );

  return (
    <Container id={id} width={width}>
      <div className="note_longread">
        <NoteStyles story={story}>{processedText}</NoteStyles>
      </div>
    </Container>
  );
};

Longread.propTypes = {
  // Indicates if the note is being displayed in a story context
  story: PropTypes.bool,
  // The text content to be displayed in the note (required)
  text: PropTypes.string.isRequired,
  // A unique identifier for the note (required)
  id: PropTypes.string.isRequired,
  // A function to fetch data (optional)
  getData: PropTypes.func,
  // Indicates if this is the final note in a sequence (optional)
  isFinal: PropTypes.bool,
  // Indicates if the note is being displayed in a problem context (optional)
  problem: PropTypes.bool,
  // An object containing information about the note's secret status (optional)
  note: PropTypes.shape({
    isSecret: PropTypes.bool, // Indicates if the note is initially hidden
  }),
  // The user's current experience level (optional)
  experience: PropTypes.number,
  // The total experience required to unlock the note (optional)
  total: PropTypes.number,
};

export default Longread;
