import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import smoothscroll from "smoothscroll-polyfill";

const COURSE_MATERIALS_QUERY = gql`
  query COURSE_MATERIALS_QUERY($id: String) {
    coursePage(where: { id: $id }) {
      id
      lessons {
        id
        name
        type
        notes {
          id
          text
        }
        chats {
          id
          messages
        }
      }
    }
  }
`;

const Styles = styled.div`
  width: 100%;
  display: flex;
  background: #fff;
  border-radius: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 6px -7px rgb(0 0 0 / 5%), 0 4px 30px -9px rgb(0 0 0 / 10%);
  h3 {
    width: 100%;
    font-size: 2.2rem;
    margin: 10px 0;
  }
  .searchForm {
    width: 100%;
    line-height: 1.6;
    input {
      height: 50%;
      width: 100%;
      margin: 15px 0;
      border: 1px solid #e5e5e5;
      border-radius: 3.5px;
      padding: 12px;
      font-size: 1.4rem;
      outline: 0;
      font-family: Montserrat;
    }
  }
  .searchResult {
    width: 100%;
    button {
      display: inline-block;
      outline: 0;
      cursor: pointer;
      padding: 2px 12px;
      font-size: 12px;
      font-weight: 500;
      vertical-align: middle;
      border: 1px solid;
      border-radius: 6px;
      color: #24292e;
      font-family: Montserrat;
      background-color: #fafbfc;
      border-color: #1b1f2326;
      box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px 0px,
        rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset;
      transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
      transition-property: color, background-color, border-color;
      :hover {
        background-color: #f3f4f6;
        border-color: #1b1f2326;
        transition-duration: 0.1s;
      }
    }
  }
`;

const LessonSearch = (props) => {
  const [searchItem, setSearchItem] = useState("");
  const [foundLessons, setFoundLessons] = useState([]);

  const { loading, error, data } = useQuery(COURSE_MATERIALS_QUERY, {
    variables: { id: props.id },
  });

  const { t } = useTranslation("course");

  const slide = (id) => {
    var my_element = document.getElementById("simulator_" + id);
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  useEffect(() => {
    // Update found lessons when the search item changes
    if (data?.coursePage?.lessons && searchItem.trim() !== "") {
      const searchStrings = searchItem.split(/\s+/);

      const lessons = data.coursePage.lessons
        .filter((les) => les.type.toLowerCase() === "story") // Adjusted the comparison to strict equality (===)
        .filter(
          (lesson) =>
            lesson?.notes?.some((note) =>
              searchStrings.every((str) =>
                note.text.toLowerCase().includes(str.toLowerCase())
              )
            ) ||
            (lesson.chats &&
              lesson.chats.some((chat) =>
                chat.messages.messagesList.some((message) =>
                  searchStrings.every((str) =>
                    message.text.toLowerCase().includes(str.toLowerCase())
                  )
                )
              ))
        )
        .map((lesson) => ({ id: lesson.id, name: lesson.name }));

      setFoundLessons(lessons);
    } else {
      // Clear found lessons if searchItem is empty
      setFoundLessons([]);
    }
  }, [searchItem, data]);

  return data ? (
    <Styles>
      <h3>{t("search")}</h3>
      <div className="searchForm">
        <div>{t("type_the_keyword")}</div>
        {data && <input onChange={(e) => setSearchItem(e.target.value)} />}
      </div>
      {foundLessons.length > 0 && (
        <div className="searchResult">
          <p>{t("found_these")}</p>
          <ul>
            {foundLessons.map((lesson) => (
              <li key={lesson.id}>
                {`${lesson.name}`} – 
                <button onClick={(e) => slide(lesson.id)}>{t("find")}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Styles>
  ) : null;
};

export default LessonSearch;
