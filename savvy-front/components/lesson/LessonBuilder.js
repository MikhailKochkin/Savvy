import { useState } from "react";
import styled from "styled-components";
import LessonBlock from "./LessonBlock";
import { useMutation, gql } from "@apollo/client";
import { SINGLE_LESSON_QUERY } from "./SingleLesson";
import UpdateLesson from "./UpdateLesson";

const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION($id: String!, $structure: LessonStructure) {
    updateLesson(id: $id, structure: $structure) {
      id
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BuilderPart = styled.div`
  width: 100%;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Block = styled.div`
  width: 80%;
  border: 1px dashed grey;
  margin: 20px 0;
  margin-left: 20px;
`;

const Menu = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  border-left: 1px solid lightgrey;
  button {
    margin: 20px 0;
  }
`;

const Sticky = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
  margin-left: 20px;
`;

const LessonBuilder = (props) => {
  let template = [
    {
      id: undefined,
      type: "Chat",
      num: 1,
      comment: `<p>Привет, это самый простой план составления онлайн урока. В его основе лежат принципы таксономии Блума и наш собственный опыт.</p>
      <p>Давай начнем урок с диалога со студентом. Мы все привыкли к диалогам в месссенджерах. Так что такой формат отлично подойдет для начала урока.</p>
      <p>Предлагаем вам рассказать немного о себе, о вашем опыте (если это релевантно для темы урока), и о <b>цели этого урока</b>: чему студент должен научиться.

      <p>Предлагаю такую модель:<ul>
      <li>
      Привет, я ... . Я занимаюсь тем-то и тем-то.
      </li>
      <li>
        Круто, а чему мы будем учиться?
      </li>
      <li>
        В рамках сегодняшнего урока мы ...
      </li>
      </ul>
      </p>
      `,
    },
    {
      id: undefined,
      type: "Chat",
      num: 2,
      comment: `<p>Во втором блоке важно поговорить про то, зачем вообще студенту этот урок проходить. Как новые знания или навыки помогут ему или ей на экзамене или в работе.</p><p> Предлагаем также использовать формат диалога:</p>
      <ul>
      <li>
        А зачем изучать эту тему? Что в ней важного?
      </li>
      <li>
        Эту тему важно освоить, потому что ...
      </li>
      </ul>`,
    },
    {
      id: undefined,
      type: "Note",
      num: 3,
      comment: `
      <p>Теперь давайте даддим первый блок полезной информации. Будем использовать формат лонгрида. Это значит, что мы сможем в рамках одного материала использовать самые разные форматы, включая: </p>
      <p>
      <ul>
      <li>
        Тексты
      </li>
      <li>
        Таблицы
      </li>
      <li>
        Видео
      </li>
      <li>
        Таблицы
      </li>
      <li>
        Презентации и так далее
      </li>
      </ul></p>
      <p>Что касается содержания, то предлагаем вам воспользоваться следующей схемой:</p>
      <p>
      <ul>
      <li>
        Кратко расскажите о самых главных понятиях, принципах, концепциях. О том, что студент должен обязательно запомнить. Их луше всего расписать текстом.
      </li>
      <li>
        Далее раскройте эти понятия и принципы более подробно. Если хотите, можете это сделать в видео-формате.
      </li>
      <li>
        На основе вышеизложенного материала дайте практические советы / алгоритмы: как решать задачи, как отличать одно понятие от другого и так далее.
      </li>
      <li>
        Поделитесь своим личным опытом. С какими сложностями вы сталкивались при изучении этой темы или при работе с ней?
      </li>
      </ul></p>
      <p>Если вы чувствуете, что лонгрид получается слишком большим, разделите его на несколько лонгридов поменьше. (возможность добавления новых блоков вслед за этим появится после того, как вы создадите этот лонгрид.)</p> 
      `,
    },
    {
      id: undefined,
      type: "Chat",
      num: 4,
      comment: `
      <p>В следующем блоке предлагаем вам провести интересный мысленный эксперимент.</p>
      <p>Как вы думаете, какие вопросы возникнут в голове ваших студентов после ознакомления с предыдущим лонгридом?. Может быть, какие-то вопросы вам уже задавали?</p>
      <p>Давайте попробуем уже сейчас сформулировать эти вопросы (от лица студента) и ответить на них. Это будет отличным способом окончить теоретическую часть урока. </p>

      `,
    },
    {
      id: undefined,
      type: "NewTest",
      num: 5,
      comment: `
      <p>Теперь давайте поработаем над запоминанием материала. Создайте тестовый вопрос, который проверит, насколько студент запомнил информацию о главных принципах, концепциях, а также пракктические советы и алгоритмы.</p>
      <p>Если вопросов больше 4, то предлагаем объединить их в цепочку. Это добавит стимул студенту пройти все тестовые вопросы.</p>
      `,
    },
    {
      id: undefined,
      type: "Quiz",
      num: 6,
      comment: `
      <p>Запомнить – это одно дело. Другое – понять выученный материал. Один из способов понять что-то новое – это объяснить новый материал своими словами.</p>
      <p>Давайте попросим студента объяснить изученные принципы и концепции своими словами.</p>
      `,
    },
    {
      id: undefined,
      type: "Construction",
      num: 7,
      comment: `
      <p>С помощью конструкторов помогите студенту структурировать новые знания. Предложите ему составить план документа, сопоставить понятия и определения или заполнить пробелы в таблице.</p>
      `,
    },
    {
      id: undefined,
      type: "TextEditor",
      num: 8,
      comment: `
      <p>Следующий блок нужен для того, чтобы выработать у студента навыки анализа и оценки. Предлагаем для этого проанализировать реальный документ: договор или законодательный акт. Найти в нем самые важные моменты, риски, ошибки.</p>
      `,
    },
    {
      id: undefined,
      type: "Problem",
      num: 9,
      comment: `
      <p>Следующий уровень изучения материала – это применение новых знаний на практике. Для этого давайте создадим задачу, или кейс-стади.</p>
      `,
    },
    {
      id: undefined,
      type: "Forum",
      num: 10,
      comment: `
      <p>На этом наш урок заканчивается. Финальный элемент нужен для того, чтобы подвести итоги урока, собрать оценки и фидбэк студентов.</p>
      `,
    },
  ];

  const [elements, setElements] = useState(
    props.lesson.structure && props.lesson.structure.lessonItems.length > 0
      ? props.lesson.structure.lessonItems
      : template
  );
  const [place, setPlace] = useState("end");
  const { lesson } = props;

  const [updateLesson, { data, loading }] = useMutation(
    UPDATE_LESSON_MUTATION,
    {
      refetchQueries: [
        { query: SINGLE_LESSON_QUERY, variables: { id: lesson.id } }, // DocumentNode object parsed with gql
        "SINGLE_LESSON_QUERY", // Query name
      ],
    }
  );

  const addBlock = (id, type) => {
    let new_elements = [...elements];
    const index = new_elements.findIndex((object) => {
      return object.id === id;
    });
    new_elements.splice(index + 1, 0, { id: undefined, type: undefined });
    setElements([...new_elements]);
  };

  const remove = (id) => {
    let new_list = elements;
    let new_list2 = new_list.filter((el) => el.id != id && el.id != undefined);
    setElements([...new_list2]);

    let a = new_list2.filter((el) => el.id != undefined);
    const b = a.map(({ num, ...keepAttrs }) => keepAttrs);
    const c = b.map(({ data, ...keepAttrs }) => keepAttrs);
    const d = c.map(({ comment, ...keepAttrs }) => keepAttrs);
    updateLesson({
      variables: {
        id: props.lesson.id,
        structure: {
          lessonItems: d,
        },
      },
    });
  };

  const addToLesson = (id, num, type, data) => {
    let new_list = [...elements];
    let temp_obj = { ...new_list[num] };
    temp_obj.id = id;
    temp_obj.type = type;
    temp_obj.data = data;
    new_list[num] = temp_obj;
    setElements([...new_list]);
    let a = new_list.filter((el) => el.id != undefined);
    const b = a.map(({ num, ...keepAttrs }) => keepAttrs);
    const c = b.map(({ data, ...keepAttrs }) => keepAttrs);
    const d = c.map(({ comment, ...keepAttrs }) => keepAttrs);
    updateLesson({
      variables: {
        id: props.lesson.id,
        structure: {
          lessonItems: d,
        },
      },
    });
  };

  const addPlace = (id) => {
    setPlace(id);
    addBlock(id);
  };
  return (
    <Styles>
      <Container>
        <UpdateLesson
          lessonID={lesson.id}
          description={lesson.description}
          lesson={lesson}
          // change={lesson.change}
        />
        <BuilderPart>
          {elements.map((el, i) => {
            return (
              <LessonBlock
                key={el.id}
                id={el.id}
                comment={el.comment ? el.comment : null}
                saved={el.id ? true : false}
                index={i}
                me={props.me}
                el={el}
                el_type={el.type}
                el_id={el.id}
                lesson={lesson}
                remove={remove}
                addToLesson={addToLesson}
                addPlace={addPlace}
              />
            );
          })}
        </BuilderPart>
      </Container>
    </Styles>
  );
};

export default LessonBuilder;
