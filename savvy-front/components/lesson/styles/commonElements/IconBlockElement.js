import { IconBlock } from "./QuestionStyles";

const IconBlockElement = ({ image, instructorName, author }) => {
  return (
    <IconBlock className="icon-block">
      {image ? (
        <img className="icon" src={image} alt="Icon" />
      ) : author && author.image != null ? (
        <img className="icon" src={author.image} alt="Author Icon" />
      ) : (
        <img
          className="icon"
          src="../../static/hipster.svg"
          alt="Default Icon"
        />
      )}
      <div className="name">
        {instructorName
          ? instructorName
          : author && author.name
          ? author.name
          : "BeSavvy"}
      </div>
    </IconBlock>
  );
};

export default IconBlockElement;
