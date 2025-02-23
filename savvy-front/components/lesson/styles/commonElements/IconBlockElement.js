import { IconBlock } from "./QuestionStyles";

const IconBlockElement = ({ instructorId, author, characters, me }) => {
  if (me) {
    return (
      <IconBlock className="icon-block">
        <div className="icon2">
          {me.image ? (
            <img className="icon" src={me.image} alt="Icon" />
          ) : me.surname ? (
            `${me.name[0]}${me.surname[0]}`
          ) : (
            `${me.name[0]}${me.name[1]}`
          )}
        </div>
        <div className="name">{me.name}</div>
      </IconBlock>
    );
  }

  let character = characters?.find((ch) => ch.id == instructorId);
  let image;
  let name;

  if (character) {
    image = character.image;
    name = character.name;
  } else if (author && author.image) {
    image = author.image;
    name = author.name;
  } else {
    image = "../../static/hipster.svg";
    name = "BeSavvy";
  }

  return (
    <IconBlock className="icon-block">
      <img className="icon" src={image} alt="Icon" />
      <div className="name">{name}</div>
    </IconBlock>
  );
};

export default IconBlockElement;
