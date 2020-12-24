import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import Link from "next/link";

const UPDATE_COURSEPAGE_MUTATION = gql`
  mutation UPDATE_COURSEPAGE_MUTATION(
    $id: String!
    $title: String
    $news: String
    $description: String
    $audience: String
    $result: String
    $tariffs: String
    $methods: String
    $image: String
    $video: String # $banner: String
  ) {
    updateCoursePage(
      id: $id
      news: $news
      title: $title
      description: $description
      audience: $audience
      result: $result
      tariffs: $tariffs
      methods: $methods
      image: $image
      video: $video #   banner: $banner
    ) {
      id
      title
      description
      image
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

const Img = styled.img`
  height: 200px;
  object-fit: cover;
  margin: 3% 0;
`;

const Frame = styled.div`
  height: 60%;
  width: 100%;
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

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const UpdateForm = (props) => {
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
  const [news, setNews] = useState(props.coursePage.news);

  const [updateCoursePage, { data, loading }] = useMutation(
    UPDATE_COURSEPAGE_MUTATION
  );

  const uploadFile = async (e) => {
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
    // this.setState({
    //   image: file.secure_url,
    //   upload: true,
    // });
  };

  const myCallback = (dataFromChild, name) => {
    let st = name;
    console.log(st);
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
      <Title>Внесите изменения в информацию о курсе</Title>
      <Fieldset
      //   disabled={loading} aria-busy={loading}
      >
        <input
          className="second"
          type="text"
          id="title"
          name="title"
          placeholder="Новое название курса"
          defaultValue={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="second"
          type="text"
          id="description"
          name="description"
          placeholder="Новое описание"
          required
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="second"
          type="text"
          id="video"
          name="video"
          placeholder="Видео курса"
          required
          defaultValue={video}
          onChange={(e) => setVideo(e.target.value)}
        />
        <textarea
          type="text"
          id="news"
          name="news"
          placeholder="Новости курса"
          defaultValue={news}
          onChange={(e) => setNews(e.target.value)}
        />

        <Frame>
          <DynamicLoadedEditor
            index={1}
            name="result"
            getEditorText={myCallback}
            value={result}
            placeholder="Результаты студентов по итогам курса..."
          />
        </Frame>
        <Frame>
          <DynamicLoadedEditor
            index={1}
            name="methods"
            getEditorText={myCallback}
            value={methods}
            placeholder="Методики преподавания..."
          />
        </Frame>
        <Frame>
          <DynamicLoadedEditor
            index={1}
            name="audience"
            getEditorText={myCallback}
            value={audience}
            placeholder="Для кого этот курс..."
          />
        </Frame>
        <Frame>
          <DynamicLoadedEditor
            index={1}
            name="tariffs"
            getEditorText={myCallback}
            value={tariffs}
            placeholder="Как работают тарифы на курсе..."
          />
        </Frame>
        <label for="file">
          <div className="upload">
            {upload === false ? "Загрузите новый логотип курса" : null}
            {upload === "pending" ? "Идет загрузка..." : null}
            {upload === true ? "Загрузка прошла успешно!" : null}
          </div>
        </label>
        <input
          style={{ display: "none" }}
          className="second"
          type="file"
          id="file"
          name="file"
          placeholder="Загрузите новый логотип курса..."
          onChange={(e) => uploadFile()}
        />
        <Img src={image ? image : coursePage.image} alt="Upload Preview" />
        <Buttons>
          <Button
            onClick={(e) => {
              return updateCoursePage({
                variables: {
                  id: props.coursePage.id,
                  title,
                  news,
                  description: description,
                  audience,
                  result,
                  tariffs,
                  methods,
                  image,
                  video,
                },
              });
            }}
          >
            {loading ? "Меняем..." : "Изменить"}
          </Button>
          <Link
            href={{
              pathname: "/coursePage",
              query: { id: coursePage.id },
            }}
          >
            <div>Вернуться на страницу урока</div>
          </Link>
        </Buttons>
      </Fieldset>
    </Form>
  );
};

export default UpdateForm;
