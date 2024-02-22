import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import smoothscroll from "smoothscroll-polyfill";

import { SINGLE_LESSON_QUERY } from "./SingleLesson";
import UpdateLesson from "./UpdateLesson";
import LessonBlock from "./LessonBlock";
import Analyzer from "./Analyzer";
import GenerateLesson from "./GenerateLesson";

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

const Generate = styled.div`
  width: 50%;
  margin: 50px 0;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #adb5bd;
  form {
    width: 100%;
    textarea {
      width: 100%;
      min-height: 300px;
    }
  }
`;
const templates = {
  standard: {
    ru: [
      {
        id: undefined,
        type: "Chat",
        num: 1,
        prompt: `Tell the student about yourself and your work experience, and  set the goal of this lesson based on the lesson description. Write all messages in Russian.`,
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
        prompt: `Explain to the student why this lesson is important and worth going through. Explain how the new knowledge can help the student in real work. Write all messages in Russian.`,
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
      <p>Теперь давайте дадим первый блок полезной информации. Будем использовать формат лонгрида. Это значит, что мы сможем в рамках одного материала использовать самые разные форматы, включая: </p>
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
        prompt: `A studen asks complicated questions on the use of the topic of this lesson in real life. Lesson author provides short and concise answers to these questions. Messages maximum length is 8. Write all messages in Russian. The first message must be student question. Make it sound colloquial, friendly and similar to real-life communication. `,
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
    ],
    en: [
      {
        id: undefined,
        type: "Chat",
        num: 1,
        prompt: `Tell the student a little about yourself, your work experience, and the goal of this lesson: what the student needs to learn. The max number of messages is 5.`,
        comment: `<p>Hi, this is the simplest plan to design your own online lesson. It is based on the principles of Bloom's Taxonomy and our company's experience.</p>
      <p>Let's start the lesson with a dialogue with a student. We're all used to dialogues in messengers. It's a great way to introduce yourself.</p>
      <p>We suggest that you tell the student a little about yourself, your experience (if relevant to the topic of the lesson), and the goal of this lesson: what the student needs to learn.</p>
      <p>Take a look at this model:<ul>
      <li>
      Hi, I am a lawyer at ... and I specialize in ...
      </li>
      <li>
        Cool, what are you going to teach me?
      </li>
      <li>
        Today we will speak about ... 
      </li>
      </ul>
      </p>
      `,
      },

      {
        id: undefined,
        type: "Chat",
        num: 2,
        comment: `<p>In the second block, it is important to talk about why the student needs to take this class in the first place. How the new knowledge or skills will help him or her at an exam or at a job.</p><p>We suggest that you use a dialogue format once again:</p>
      <ul>
      <li>
        Why study this topic? What is important about it?
      </li>
      <li>
        This is an important topic to master because ...
      </li>
      </ul>`,
      },
      {
        id: undefined,
        type: "Note",
        num: 3,
        comment: `
      <p>Now let's give the student the first block of useful information. We will use a longread format. This means that we will be able to use a variety of formats within one story, including: </p>
      <p>
      <ul>
      <li>
        Texts
      </li>
      <li>
        Tables
      </li>
      <li>
        Video
      </li>
      <li>
        Decks
      </li>
      </ul></p>
      <p>If you feel that a longread is getting too big, divide it into several smaller longreads. (The option to add new blocks afterwards will appear after you've created this longread).</p> 
      `,
      },
      {
        id: undefined,
        type: "Chat",
        num: 4,
        prompt: `A student of this lesson asks additional complicated questions on the topic of this lesson. Lesson author provides short and concise answers to these questions. Messages maximum length is 8.`,
        comment: `
      <p>In the next unit, you have an interesting thought experiment to conduct.</p>
      <p>What questions do you think will pop into your students' minds after reading the previous longread? Maybe they have asked you some questions before?</p>
      <p>Let's try to formulate these questions now (on behalf of the student) and answer them. It would be a great way to end the theory part of the lesson.</p>

      `,
      },
      {
        id: undefined,
        type: "NewTest",
        num: 5,
        comment: `
      <p>Now let's work on memorising the material. Create a test question to test how much information the student has memorized about key principles, concepts, and practical tips and algorithms.</p>
      <p>If there are more than 4 questions, we suggest creating a chain of questions. This will stimulate the studen to complete all test questions.</p>
      `,
      },
      {
        id: undefined,
        type: "Quiz",
        num: 6,
        comment: `
      <p>Remembering is one thing. It's another to understand the material you've learned. One way to understand something new is to explain the new material in your own words.</p>
      <p>Let's ask the student to explain the principles and concepts they've learned in their own words.</p>
      `,
      },
      {
        id: undefined,
        type: "Construction",
        num: 7,
        comment: `
      <p>With the help of the constructors, help the student to structure the new knowledge. Invite them to outline the document, collate concepts and definitions or fill in the gaps in the table.</p>
      `,
      },
      {
        id: undefined,
        type: "TextEditor",
        num: 8,
        comment: `
      <p>The next unit is to develop the student's analysis and evaluation skills. To do this, we suggest analyzing a real document: a contract or a legislative act. Find the most important points, risks, and mistakes in it.</p>
      `,
      },
      {
        id: undefined,
        type: "Problem",
        num: 9,
        comment: `
      <p>The next level of learning the material is applying the new knowledge in practice. For this, let's create a problem, or a case study.</p>
      `,
      },
      {
        id: undefined,
        type: "Forum",
        num: 10,
        comment: `
      <p>This concludes our lesson. The final element is needed to summarise the lesson and collect feedback from the students.</p>
      `,
      },
    ],
  },
  memorize: {
    ru: [
      {
        id: undefined,
        type: "Chat",
        num: 1,
        comment: `
              <p>Представьтесь и объясните, каковы цели этого урока. Используйте текст или снимите короткое вертикальное видео на телефон.</p>
      `,
      },
      {
        id: undefined,
        type: "Note",
        num: 2,
        comment: `
              <p>Объясните тему этого урока. Напишите лонгрид, сделайте презентацию или снимите видео. Все зависит от вас. Но не перегружайте своих учеников. Если лонгрид окажется слишком длинным, разбейте его на отдельные блоки.</p>
      `,
      },
      {
        id: undefined,
        type: "Chat",
        num: 3,
        comment: `
              <p>Обобщите всю важную информацию и составьте краткий список того, что должен запомнить ваш студент. Вы также можете поделиться ссылками на дополнительные ресурсы.</p>
      `,
      },
      {
        id: undefined,
        type: "TextEditor",
        num: 4,
        comment: `
              <p>Цель этого урока - запомнить что-то: слова, правила или принципы. Но прежде чем начать заучивать эти правила, может быть, вы могли бы предоставить несколько примеров их использования в реальной жизни: выдержки из договоров, судебной практики или меморандумов, фреймворков. И попросите студента найти и выделить эти правила в реальных юридических текстах. </p>
      `,
      },
      {
        id: undefined,
        type: "NewTest",
        num: 5,
        comment: `
              <p>Пришло время начать запоминать. Предоставьте вашему ученику несколько тестов. Их легко выполнить, и они могут стать хорошей разминкой. Вы можете объединить их в группу тестов, чтобы добавить геймификацию в урок.</p>
      `,
      },
      {
        id: undefined,
        type: "Quiz",
        num: 6,
        comment: `
              <p>Теперь мы будем повышать сложность. Задавайте своим ученикам открытые вопросы, чтобы они научились извлекать новые знания из своей памяти.</p>
      `,
      },
      {
        id: undefined,
        type: "TextEditor",
        num: 8,
        comment: `
              <p>Теперь давайте применим новые знания наших учеников на практике. Пусть учащиеся заполнят пробелы или исправят ошибки в тексте, используя свои новые знания.</p>
      `,
      },
      {
        id: undefined,
        type: "Forum",
        num: 9,
        comment: `
      <p>На этом наш урок заканчивается. Финальный элемент нужен для того, чтобы подвести итоги урока, собрать оценки и фидбэк студентов.</p>
      `,
      },
    ],
    en: [
      {
        id: undefined,
        type: "Chat",
        num: 1,
        comment: `
              <p>Introduce yourself and explain what are the goals of this lesson. Use text or shoot a short vertical video on your phone.</p>
      `,
      },
      {
        id: undefined,
        type: "Note",
        num: 2,
        comment: `
              <p>Explain the topic of this lesson. Write a longread, make a presentation or shoot video. It's up to you. But don't overwhelm your students. If the longread turns out to be too long, break it into separate blocks.</p>
      `,
      },
      {
        id: undefined,
        type: "Note",
        num: 3,
        comment: `
              <p>Explain the topic of this lesson. Write a longread, make a presentation or shoot video. It's up to you. But don't overwhelm your students. If the longread turns out to be too long, break it into separate blocks.</p>
      `,
      },
      {
        id: undefined,
        type: "Chat",
        num: 4,
        comment: `
              <p>Sum up all the important information and make a short list of the things your student must remember. You can also share links to additional resources.</p>
      `,
      },
      {
        id: undefined,
        type: "TextEditor",
        num: 5,
        comment: `
              <p>The goal of this lesson is to memorize something: words, rules or principles. But before starting to memorize these rules, maybe you could provide some real life use cases of them: extracts from contracts, cases or memos, frameworks. And ask the student to find these rules in real legal texts. </p>
      `,
      },
      {
        id: undefined,
        type: "NewTest",
        num: 6,
        comment: `
              <p>It's time to start memorizing. Provide your student with a couple of quizzes. They are easy to complete and can be a good warm up. You can unite them in a quiz group to add gamification to the lesson.</p>
      `,
      },
      {
        id: undefined,
        type: "Quiz",
        num: 7,
        comment: `
              <p>Now we are going to increase the level of difficulty. Ask your students open questions for them to learn to extract new knowledge from their memory.</p>
      `,
      },
      {
        id: undefined,
        type: "TextEditor",
        num: 8,
        comment: `
              <p>Now let's put our students' new knowledge into practice. Let students fill in the gaps or correct mistakes in a text using their new knowledge.</p>
      `,
      },
      {
        id: undefined,
        type: "Forum",
        num: 9,
        comment: `
      <p>This concludes our lesson. The final element is needed to summarise the lesson and collect feedback from the students.</p>
      `,
      },
    ],
  },
};

const LessonBuilder = (props) => {
  const { lesson } = props;
  const router = useRouter();
  const [elements, setElements] = useState(
    props.lesson.structure && props.lesson.structure.lessonItems.length > 0
      ? props.lesson.structure.lessonItems
      : [
          {
            id: undefined,
            type: "Chat",
            num: 1,
          },
        ]
  );
  const [lessonData, setLessonData] = useState({
    name: lesson.name,
    description: lesson.description,
  });
  const [result, setResult] = useState();
  const [passTemplate, setPassTemplate] = useState(false);
  const [place, setPlace] = useState("end");

  //   async function onSubmit(event) {
  //     event.preventDefault();
  //     try {
  //       const response = await fetch("/api/generate", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           prompt: `Form a lesson using different types of blocks: Chat (unlimited phrases, good for Q&A), Note (large texts, infographics, slides, videos, suitable for detailed explanations), Shot (for step-by-step concepts), NewTest (tests memory with limited answers), Quiz (checks understanding with free-text answers), TextEditor (for text analysis). Follow BLOOM's taxonomy with a total of 10 blocks. Each block adheres to this JSON structure:

  // { "structure": { "lessonItems": [ {"id": null, "type": "", "comment": "Describe the block in 3 sentences", "num": 1}, {"id": "null", "type": "", "comment": "Describe the block in 3 sentences","num": 2}]}}

  // Create a JSON lesson titled "Программное обеспечение в праве интеллектуальной собственности" and described as ${input}. The lesson must have 10 blocks.

  // Each comment should include the 1. block's type, 2. main idea of the block and 3. and recommendations to the author on how to create this block (in Russian).

  // Flow: Begin with Chat to outline topics, goals, authors. Use Note and Shot for detailed explanations, and conclude with Chat to answer queries. Include NewTest and Quiz for memory and comprehension checks. Use TextEditor for text analysis, and conclude the lesson with a summary Chat.`,
  //         }),
  //       });

  //       const data = await response.json();
  //       if (response.status !== 200) {
  //         throw (
  //           data.error ||
  //           new Error(`Request failed with status ${response.status}`)
  //         );
  //       }

  //       setResult(data.result);

  //       const lesson_structure = JSON.parse(data.result.content);
  //       console.log("lesson", lesson_structure);

  //       setElements([...lesson_structure.structure.lessonItems]);
  //       console.log("lesson", [...lesson_structure.structure.lessonItems]);
  //       // setAnimalInput("");
  //     } catch (error) {
  //       // Consider implementing your own error handling logic here
  //       console.error(error);
  //       alert(error.message);
  //     }
  //   }

  const updateLessonData = ({ name, description }) => {
    setLessonData({
      name: name,
      description: description,
    });
  };

  useEffect(() => {
    smoothscroll.polyfill();
  });

  const slide = () => {
    var my_element = document.getElementById("builder_part");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const getTemplate = (val) => {
    let new_template = templates[val][router.locale];
    setElements((e) => [...new_template]);
    setPassTemplate(true);
    setTimeout(() => setPassTemplate(false), 2000);
    slide();
  };

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
    const e = d.map(({ prompt, ...keepAttrs }) => keepAttrs);
    updateLesson({
      variables: {
        id: props.lesson.id,
        structure: {
          lessonItems: e,
        },
      },
    });
  };

  const addPlace = (id) => {
    setPlace(id);
    addBlock(id);
  };

  const passData = (blocks) => {
    setElements([...blocks]);
  };

  return (
    <Styles>
      <Container>
        <UpdateLesson
          lessonID={lesson.id}
          coursePageId={lesson.coursePage.id}
          description={lesson.description}
          lesson={lesson}
          getTemplate={getTemplate}
          onUpdateLessonData={updateLessonData}
        />
        {/* <Analyzer elements={elements} lesson={lesson} /> */}
        {/* <GenerateLesson passData={passData} /> */}
        <BuilderPart id="builder_part">
          {[...elements].map((el, i) => {
            return (
              <>
                <LessonBlock
                  key={el.id}
                  id={el.id}
                  comment={el.comment ? el.comment : null}
                  saved={el.id ? true : false}
                  index={i}
                  me={props.me}
                  el={el}
                  lessonData={lessonData}
                  prompt={el.prompt ? el.prompt : "missing"}
                  updateTemplate={passTemplate}
                  el_type={el.type}
                  el_id={el.id}
                  lesson={lesson}
                  remove={remove}
                  addToLesson={addToLesson}
                  addPlace={addPlace}
                  initial_data={
                    el.status && el.status == "generated"
                      ? {
                          content: el.content,
                          format: el.format,
                          idea: el.idea,
                          description: el.description,
                        }
                      : null
                  }
                />
              </>
            );
          })}
        </BuilderPart>
      </Container>
    </Styles>
  );
};

export default LessonBuilder;
