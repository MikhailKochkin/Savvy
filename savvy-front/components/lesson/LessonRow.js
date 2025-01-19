import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import parse from "html-react-parser";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import dynamic from "next/dynamic";
import CompletionRate from "./lesson_management/CompletionRate";

const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION(
    $id: String!
    $number: Int
    $name: String
    $description: String
    $tags: [String]
  ) {
    updateLesson(
      id: $id
      number: $number
      name: $name
      description: $description
      tags: $tags
    ) {
      id
    }
  }
`;

const Box = styled.div`
  border-bottom: 2px solid #e8eff6;
  display: flex;
  flex-direction: row;
  flex: 1; /* This makes the Box component stretch in height */
  background: #e8eff6;
  transition: 0.3s;
  .cell {
    padding: 5px 10px;
    font-size: 1.4rem;
    background: #fff;
    transition: 0.3s;
  }
  &:hover {
    transition: 0.3s;

    .cell {
      background: #fafafa;
    }
  }
  .div1 {
    width: 5%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 1.4;
    margin-right: 2px;
  }
  .div2 {
    width: 21%;
    margin-right: 2px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 1.4;
  }
  .div3 {
    width: 34%;
    p {
      margin: 0;
      margin-bottom: 5px;
      line-height: 1.5;
    }
    margin-right: 2px;
  }
  .div4 {
    width: 15%;
    margin-right: 2px;
  }
  .div5 {
    width: 16%;
    margin-right: 2px;
  }
  .div6 {
    width: 9%;
  }
  @media (max-width: 850px) {
    display: flex;
    .div1 {
      min-width: 50px;
    }
    .div2 {
      min-width: 250px;
    }
    .div3 {
      min-width: 400px;
    }
    .div4 {
      min-width: 100px;
    }
    .div5 {
      min-width: 200px;
    }
    .div6 {
      min-width: 80px;
    }
  }
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  form {
    input {
      width: 50px;
      background: none;
      border: none;
      outline: 0;
      font-family: Montserrat;
      font-size: 1rem;
    }
  }
`;

const Tag = styled.div`
  margin-bottom: 2%;
  background-color: #f8eed7;
  margin: 2px;
  min-height: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &.tag {
    background-color: #f8eed7;
    padding: 2px 5px;
    font-size: 1.2rem;
  }
`;

const Frame = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 100%;
  padding: 0 1%;
  .com {
    border-top: 1px solid #c4c4c4;
  }
`;

const Input = styled.input`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 40px;
  padding: 5px;
  font-family: Montserrat;
  font-weight: 500;
  .com {
    border-top: 1px solid #c4c4c4;
  }
`;

const Textarea = styled.input`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 100%;
  padding: 5px;
  font-weight: 500;
  font-family: Montserrat;
  .com {
    border-top: 1px solid #c4c4c4;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  a {
    background: none;
  }
  @media (max-width: 800px) {
    justify-content: flex-start;
  }
`;

const A = styled.a`
  width: 100%;
`;

const Button = styled.button`
  font-size: 1.4rem;
  background: #deecdc;
  border: 1px solid #deecdc;
  color: #23372a;
  padding: 2px 9px;
  font-weight: 500;
  box-sizing: border-box;
  border-radius: 15px;
  cursor: pointer;
  font-family: Montserrat;
  outline: 0;
  transition: all 0.6s;
  /* &:hover {
    border: 1px solid #666666;
    background: #666666;
    color: #fff;
  } */
  /* @media (max-width: 800px) {
    font-size: 1.4rem;
  } */
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const LessonRow = (props) => {
  const {
    lesson,
    author,
    lessonResult,
    coursePage,
    lessonLength,
    coursePageId,
    me,
    i_am_author,
  } = props;
  const [tags, setTags] = useState(lesson.tags ? lesson.tags : []);
  const [tag, setTag] = useState("");

  const [isNumberUpdated, setIsNumberUpdated] = useState(false);
  const [number, setNumber] = useState(lesson.number);

  const [isDescriptionUpdated, setIsDescriptionUpdated] = useState(false);
  const [description, setDescription] = useState(lesson.description);

  const [isNameUpdated, setIsNameUpdated] = useState(false);
  const [name, setName] = useState(lesson.name);

  const [updateLesson, { update_data }] = useMutation(UPDATE_LESSON_MUTATION);

  const { t } = useTranslation("course");

  const handleDoubleClick = (type) => {
    if (me && me.permissions.includes("ADMIN")) {
      if (type == "description") {
        setIsDescriptionUpdated(!isDescriptionUpdated);
      } else if (type == "name") {
        setIsNameUpdated(!isNameUpdated);
      } else if (type == "number") {
        setIsNumberUpdated(!isNumberUpdated);
      }
    }
  };

  const myCallback = (data) => {
    setDescription(data);
    return updateLesson({
      variables: {
        id: lesson.id,
        description: description,
      },
    });
  };

  const handleTagDoubleClick = (val) => {
    if (me && me.permissions.includes("ADMIN")) {
      let newTags = [...tags];
      setTags(newTags.filter((nt) => nt !== val));
      return updateLesson({
        variables: {
          id: lesson.id,
          tags: newTags.filter((nt) => nt !== val),
        },
      });
    }
  };

  let pathname =
    lesson?.type?.toLowerCase() === "regular"
      ? "/dev"
      : lesson?.type?.toLowerCase() === "challenge"
      ? "/challenge"
      : "/lesson";

  if (!pathname) {
    pathname = "/lesson";
  }
  return (
    <Box>
      <div
        className="cell div1"
        onDoubleClick={(e) => handleDoubleClick("number")}
      >
        {isNumberUpdated ? (
          <Input
            type="number"
            value={number}
            onChange={async (e) => {
              setNumber(parseInt(e.target.value));
              return updateLesson({
                variables: {
                  id: lesson.id,
                  number: parseInt(e.target.value),
                },
              });
            }}
          />
        ) : (
          number
        )}
      </div>
      <div
        className="cell div2"
        onDoubleClick={(e) => handleDoubleClick("name")}
      >
        {isNameUpdated ? (
          <Textarea
            value={name}
            onChange={async (e) => {
              setName(e.target.value);
              return updateLesson({
                variables: {
                  id: lesson.id,
                  name: e.target.value,
                },
              });
            }}
          />
        ) : (
          name
        )}
      </div>
      <div
        className="cell div3"
        onDoubleClick={(e) => handleDoubleClick("description")}
      >
        {isDescriptionUpdated ? (
          <Frame>
            <DynamicLoadedEditor
              index={0}
              name="description"
              getEditorText={myCallback}
              value={description}
            />
          </Frame>
        ) : description ? (
          parse(description)
        ) : null}
      </div>
      <div className="cell div4">
        <Buttons>
          {/* Case 3. Admin or course opens the lesson */}

          {me &&
            (me.id === author ||
              me.permissions.includes("ADMIN") ||
              i_am_author) && (
              <Link
                href={{
                  pathname: pathname,
                  query: {
                    id: lesson.id,
                  },
                }}
              >
                <Button>{t("open")} </Button>
              </Link>
            )}

          {/* Case 4. Web site user opens the lesson */}
          {/* First check if the lesson is not under development and i am not the developer */}

          {lesson.type.toLowerCase() !== "regular" &&
          me &&
          me.id !== author &&
          !me.permissions.includes("ADMIN") &&
          !i_am_author ? (
            lesson.open ? (
              <Link
                href={{
                  pathname: pathname,
                  query: {
                    id: lesson.id,
                  },
                }}
              >
                <Button>{t("open")}</Button>
              </Link>
            ) : me.new_subjects.filter((s) => s.id == coursePageId).length >
              0 ? (
              <Link
                href={{
                  pathname: pathname,
                  query: {
                    id: lesson.id,
                  },
                }}
              >
                <Button>{t("open")}</Button>
              </Link>
            ) : null
          ) : null}

          {/* Case 5. Open lesson */}

          {!me && lesson.open && lesson.type.toLowerCase() !== "regular" && (
            <Link
              href={{
                pathname: pathname,
                query: {
                  id: lesson.id,
                },
              }}
            >
              <Button>{t("open")}</Button>
            </Link>
          )}
        </Buttons>
      </div>
      <Tags className="cell div5">
        {tags.map((t) => (
          <Tag className="tag" onDoubleClick={(e) => handleTagDoubleClick(t)}>
            {t}
          </Tag>
        ))}
        {me && me.permissions.includes("ADMIN") ? (
          <form
            method="POST"
            onSubmit={async (e) => {
              e.preventDefault();
              let new_arr = [...tags, tag];
              setTags(new_arr);
              setTag("");
              return updateLesson({
                variables: {
                  id: lesson.id,
                  tags: new_arr,
                },
              });
            }}
          >
            <input
              type="text"
              name=""
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="..."
            />
          </form>
        ) : null}
      </Tags>
      <div className="cell div6">
        {props.me && props.lesson && (
          <CompletionRate me={props.me} lesson={props.lesson} />
        )}
      </div>
    </Box>
  );
};

export default LessonRow;
