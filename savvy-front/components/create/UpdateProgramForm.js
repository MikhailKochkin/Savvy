import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import Link from "next/link";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const UPDATE_PROGRAM_MUTATION = gql`
  mutation UPDATE_PROGRAM_MUTATION(
    $id: String!
    $title: String
    $news: String
    $description: String
    $audience: String
    $result: String
    $syllabus: Syllabus
    $reviews: ReviewsList
    $months: Int
    $methods: String
    $nextStart: DateTime
    $price: Int
    $goals: [String]
    $header: [String]
    $subheader: [String]
    $image: String
    $video: String # $banner: String
  ) {
    updateProgram(
      id: $id
      news: $news
      title: $title
      description: $description
      audience: $audience
      result: $result
      syllabus: $syllabus
      reviews: $reviews
      months: $months
      methods: $methods
      nextStart: $nextStart
      price: $price
      goals: $goals
      header: $header
      subheader: $subheader
      image: $image
      video: $video #   banner: $banner
    ) {
      id
      title
      description
      image
      syllabus
      months
    }
  }
`;

const Form = styled.form`
  width: 50%;
  padding: 2% 2% 0 2%;
  margin: 0 auto;
  font-size: 1.6rem;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  margin: 2% 0;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Fieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  select {
    width: 30%;
    font-size: 1.6rem;
  }
  input {
    height: 60%;
    width: 100%;
    margin-bottom: 15px;
    border: 1px solid #e5e5e5;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0;
    font-family: Montserrat;
  }
  textarea {
    height: 100px;
    width: 100%;
    margin-bottom: 15px;
    border: 1px solid #e5e5e5;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0;
    font-family: Montserrat;
  }
  .upload {
    border: 1px dashed #e5e5e5;
    padding: 1% 2%;
    border-radius: 3.5px;
    cursor: pointer;
    &:hover {
      border: 1px dashed #112a62;
    }
  }
  .open_landing {
    cursor: pointer;
    font-weight: bold;
    color: #112a62;
  }
`;

const Circle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
  @media (max-width: 800px) {
    width: 65%;
  }
  cursor: pointer;
  border: 1px solid grey;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-bottom: 15px;
  margin-right: 15px;
  button {
    border: none;
    cursor: pointer;

    background: none;
    font-family: Montserrat;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 2%;
  div {
    font-weight: bold;
    color: #112a62;
    margin-left: 15px;
    padding: 10px;
    cursor: pointer;
  }
`;

const Button = styled.button`
  padding: 1% 2%;
  font-size: 1.6rem;
  width: 20%;
  font-weight: 600;
  color: #fffdf7;
  background: ${(props) => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${(props) => props.theme.darkGreen};
  }
  @media (max-width: 800px) {
    width: 40%;
  }
`;

const Title = styled.div`
  padding: 0 2%;
  font-size: 2.2rem;
  font-weight: 600;
`;

const Explainer = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 5px;
`;

const Img = styled.img`
  height: 200px;
  object-fit: cover;
  margin: 3% 0;
`;

const Frame = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 3.5px;
  padding-left: 1%;
  font-size: 1.6rem;
  outline: 0;
  p {
    margin: 0.8%;
    margin-left: 0.6%;
  }
`;

const Circles = styled.div`
  display: flex;
  flex-direction: row;
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const UpdateProgramForm = (props) => {
  const [upload, setUpload] = useState(false);
  const [bannerUpload, setBannerUpload] = useState(false);
  const [image, setImage] = useState(props.coursePage.image);
  const [title, setTitle] = useState(props.coursePage.title);
  const [description, setDescription] = useState(props.coursePage.description);
  const [banner, setBanner] = useState(props.coursePage.banner);
  const [audience, setAudience] = useState(props.coursePage.audience);
  const [result, setResult] = useState(props.coursePage.result);
  const [tariffs, setTariffs] = useState(props.coursePage.tariffs);
  const [methods, setMethods] = useState(props.coursePage.methods);
  const [video, setVideo] = useState(props.coursePage.video);
  const [price, setPrice] = useState(props.coursePage.price);
  const [news, setNews] = useState(props.coursePage.news);
  const [goals, setGoals] = useState(
    props.coursePage.goals.length > 0 ? props.coursePage.goals : [""]
  );
  const [header, setHeader] = useState(
    props.coursePage.header.length > 0 ? props.coursePage.header : [""]
  );
  const [subheader, setSubheader] = useState(
    props.coursePage.subheader.length > 0 ? props.coursePage.subheader : [""]
  );
  const [startDate, setStartDate] = useState(props.coursePage.nextStart);
  const [topicHeader, setTopicHeader] = useState("");
  const [topics, setTopics] = useState([]);
  const [modules, setModules] = useState(
    props.coursePage.syllabus ? props.coursePage.syllabus.modules : []
  );
  const [months, setMonths] = useState(props.coursePage.months);
  const [editingModuleIndex, setEditingModuleIndex] = useState(null);
  const [reviews, setReviews] = useState(
    props.coursePage.reviews ? props.coursePage.reviews.reviews : []
  );

  useEffect(() => {
    if (editingModuleIndex !== null) {
      const module = modules[editingModuleIndex];
      console.log("Editing Module Index:", editingModuleIndex);
      console.log("Selected Module:", module);
      setTopicHeader(module.header);
      setTopics(module.topic);
    }
  }, [editingModuleIndex, modules]);

  const [updateProgram, { data, loading }] = useMutation(
    UPDATE_PROGRAM_MUTATION
  );

  const uploadFile = async (e) => {
    setUpload(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "savvy-app");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/mkpictureonlinebase/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setUpload(false);
  };

  const myCallbackGoal = (res, name, i) => {
    let new_goals = [...goals];
    new_goals[i] = res;
    setGoals([...new_goals]);
  };

  const myCallbackHeader = (res, name, i) => {
    let new_g = [...header];
    new_g[i] = res;
    setHeader([...new_g]);
  };

  const myCallbackSubheader = (res, name, i) => {
    let new_g = [...subheader];
    new_g[i] = res;
    setSubheader([...new_g]);
  };

  const handleModuleUpdate = (index, updatedHeader, updatedTopics) => {
    const updatedModules = [...modules];
    updatedModules[index] = {
      header: updatedHeader,
      topic: updatedTopics,
    };
    setModules(updatedModules);
    setEditingModuleIndex(null); // Reset the editingModuleIndex
  };

  const handleModuleRemove = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
  };

  const addReview = () => {
    setReviews([...reviews, { name: "", text: "", source: "" }]);
  };

  const updateReview = (index, name, text, source, image) => {
    const updatedReviews = [...reviews];
    updatedReviews[index] = { name, text, source, image };
    setReviews(updatedReviews);
  };

  const removeReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  const myCallback = (dataFromChild, name) => {
    let st = name;
    if (st === "audience") {
      setAudience(dataFromChild);
    } else if (st === "methods") {
      setMethods(dataFromChild);
    } else if (st === "result") {
      setResult(dataFromChild);
    } else if (st === "tariffs") {
      setTariffs(dataFromChild);
    }
  };
  const { coursePage, me } = props;
  return (
    <Form>
      <Title>Базовая информация о курсе</Title>
      <Fieldset>
        <Explainer>Название курса (для карточки курса)</Explainer>
        <input
          className="second"
          type="text"
          id="title"
          name="title"
          defaultValue={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <Explainer>Краткое описание курса (для карточки курса)</Explainer>
        <input
          className="second"
          type="text"
          id="description"
          name="description"
          required
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Explainer>Цена курса</Explainer>
        <input
          className="second"
          type="number"
          id="description"
          name="description"
          placeholder="Цена"
          required
          defaultValue={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />
        <Explainer>Header</Explainer>
        <input
          type="text"
          id="header"
          name="header"
          placeholder="Header"
          required
          value={topicHeader}
          onChange={(e) => setTopicHeader(e.target.value)}
        />
        <Explainer>Topics</Explainer>
        <textarea
          value={topics.join("\n")}
          onChange={(e) => setTopics(e.target.value.split("\n"))}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            if (editingModuleIndex !== null) {
              handleModuleUpdate(editingModuleIndex, topicHeader, topics);
            } else {
              setModules([...modules, { header: topicHeader, topic: topics }]);
            }
            setTopicHeader("");
            setTopics([]);
          }}
        >
          {editingModuleIndex !== null ? "Update Module" : "Add Module"}
        </Button>
        <Explainer>Added Modules</Explainer>
        <ul>
          {modules.map((module, index) => (
            <li key={index}>
              {module.header}
              <ul>
                {module.topic.map((topic, i) => (
                  <li key={i}>{topic}</li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setTopicHeader(module.header);
                  setTopics(module.topic);
                  setEditingModuleIndex(index);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleModuleRemove(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <Explainer>Months</Explainer>
        <input
          className="second"
          type="number"
          id="months"
          name="months"
          placeholder="Months"
          required
          defaultValue={months}
          onChange={(e) => setMonths(parseInt(e.target.value))}
        />
        <Explainer>Дата старта курса / следующего вебинара автора</Explainer>

        <input
          id="start"
          name="trip-start"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Explainer>Изображение курса для главной страницы сайта</Explainer>
        <input
          // style={{ display: "none" }}
          className="second"
          type="file"
          id="file"
          name="file"
          placeholder="Загрузите новый логотип курса..."
          onChange={uploadFile}
        />
        {upload && "Загружаем.."}
        <Img src={image ? image : coursePage.image} alt="Upload Preview" />
      </Fieldset>
      <Title>Информация для лендинга курса</Title>
      <Fieldset>
        <Explainer>Заголовок лендинга</Explainer>

        {header.map((g, i) => (
          <input
            index={i}
            name="goal"
            onChange={(e) =>
              myCallbackHeader(e.target.value, e.target.name, parseInt(i))
            }
            defaultValue={g}
            placeholder="Заголовок..."
          />
        ))}
        <Explainer>Подзаголовок лендинга</Explainer>
        {subheader.map((g, i) => (
          <>
            <Frame>
              <DynamicLoadedEditor
                index={i}
                name="goal"
                getEditorText={myCallbackSubheader}
                value={g}
              />
            </Frame>
          </>
        ))}
        {/* <button
          onClick={(e) => {
            setSubheader([...subheader, ""]);
            e.preventDefault();
          }}
        >
          +1
        </button> */}
        <Explainer>Было / стало</Explainer>

        {goals.map((g, i) => (
          // <Frame>
          //   <DynamicLoadedEditor
          //     index={i}
          //     name="goal"
          //     getEditorText={myCallbackGoal}
          //     value={g}
          //     placeholder="Результат ..."
          //   />
          // </Frame>
          <textarea
            value={g}
            onChange={(e) => myCallbackGoal(e.target.value, "goal", i)}
          />
        ))}
        <Circles>
          <Circle>
            <button
              className="number_button"
              onClick={(e) => {
                e.preventDefault();
                let new_goals = goals;
                new_goals.pop();
                setGoals([...new_goals]);
              }}
            >
              -1
            </button>
          </Circle>
          <Circle>
            <button
              className="number_button"
              onClick={(e) => {
                setGoals([...goals, ""]);
                e.preventDefault();
              }}
            >
              +1
            </button>
          </Circle>
        </Circles>
        <Explainer>
          Ссылка на видео о курсе (необязательно для лендинга)
        </Explainer>
        <input
          className="second"
          type="text"
          id="video"
          name="video"
          placeholder="Видео о курсе"
          required
          defaultValue={video}
          onChange={(e) => setVideo(e.target.value)}
        />
        <Explainer>
          Новости курса: когда стартует новый поток, какие планы у автора, какие
          изменения были только что внесены.
        </Explainer>
        <textarea
          type="text"
          id="news"
          name="news"
          placeholder="Новости курса"
          defaultValue={news}
          onChange={(e) => setNews(e.target.value)}
        />
        {/* <Explainer>Результаты студентов по итогам курса</Explainer>
        <Frame>
          <DynamicLoadedEditor
            index={1}
            name="result"
            getEditorText={myCallback}
            value={result}
            placeholder="Результаты студентов по итогам курса..."
          />
        </Frame> */}
        <Explainer>
          В каком формате будет проходить обучение? Симуляторы, живые встречи,
          онлайн-встречи, практические задания и так далее.
        </Explainer>
        {/* <Frame>
          <DynamicLoadedEditor
            index={1}
            name="methods"
            getEditorText={myCallback}
            value={methods}
            placeholder="Методики преподавания..."
          />
        </Frame> */}
        <textarea
          value={methods}
          onChange={(e) => setMethods(e.target.value)}
        />
        <Explainer>Для кого этот курс?</Explainer>

        <textarea
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        />
        <Explainer>Каких результатов достигнут студенты?</Explainer>
        <textarea value={result} onChange={(e) => setResult(e.target.value)} />
        <Explainer>Reviews</Explainer>
        {reviews.map((review, index) => (
          <div key={index}>
            <input
              value={review.name}
              onChange={(e) =>
                updateReview(
                  index,
                  e.target.value,
                  review.text,
                  review.source,
                  review.image
                )
              }
              placeholder="Reviewer Name"
            />
            <input
              value={review.text}
              onChange={(e) =>
                updateReview(
                  index,
                  review.name,
                  e.target.value,
                  review.source,
                  review.image
                )
              }
              placeholder="Review Text"
            />
            <input
              value={review.source}
              onChange={(e) =>
                updateReview(
                  index,
                  review.name,
                  review.text,
                  e.target.value,
                  review.image
                )
              }
              placeholder="Review Source"
            />
            <input
              value={review.image}
              onChange={(e) => {
                updateReview(
                  index,
                  review.name,
                  review.text,
                  review.source,
                  e.target.value
                );
              }}
              placeholder="Image URL"
            />
            <button onClick={() => removeReview(index)}>Remove</button>
          </div>
        ))}
        <Button onClick={addReview}>+ Add Review</Button>

        {/* <Frame>
          <DynamicLoadedEditor
            index={1}
            name="audience"
            getEditorText={myCallback}
            value={audience}
            placeholder="Для кого этот курс..."
          />
        </Frame> */}
        {/* <Frame>
          <DynamicLoadedEditor
            index={1}
            name="tariffs"
            getEditorText={myCallback}
            value={tariffs}
            placeholder="Как работают тарифы на курсе..."
          />
        </Frame> */}
        <Link
          href={{
            pathname: "/coursePage",
            query: { id: coursePage.id },
          }}
        >
          <div className="open_landing">Открыть лендинг курса</div>
        </Link>
      </Fieldset>
      <Buttons>
        <Button
          onClick={(e) => {
            e.preventDefault();
            return updateProgram({
              variables: {
                id: props.coursePage.id,
                title,
                news,
                description: description,
                audience,
                goals,
                price,
                header,
                syllabus: { modules: modules },
                months,
                nextStart: startDate,
                subheader,
                result,
                tariffs,
                methods,
                image,
                video,
                reviews: { reviews },
              },
            });
          }}
        >
          {loading ? "Меняем..." : "Изменить"}
        </Button>
        <Link
          href={{
            pathname: "/course",
            query: { id: coursePage.id },
          }}
        >
          <div>Вернуться на страницу урока</div>
        </Link>
      </Buttons>
    </Form>
  );
};

export default UpdateProgramForm;
