import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslation } from "next-i18next";
// import "react-datepicker/dist/react-datepicker.css";

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
    $nextStart: DateTime
    $price: Int
    $discountPrice: Int
    $goals: [String]
    $header: [String]
    $subheader: [String]
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
      discountPrice: $discountPrice
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
  const [price, setPrice] = useState(props.coursePage.price);
  const [discountPrice, setDiscountPrice] = useState(
    props.coursePage.discountPrice
  );

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

  const [updateCoursePage, { data, loading }] = useMutation(
    UPDATE_COURSEPAGE_MUTATION
  );

  const { t } = useTranslation("coursePage");

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
      <Title>{t("course_info")}</Title>
      <Fieldset>
        <Explainer> {t("course_name")}</Explainer>
        <input
          className="second"
          type="text"
          id="title"
          name="title"
          defaultValue={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <Explainer>{t("course_description")}</Explainer>
        <input
          className="second"
          type="text"
          id="description"
          name="description"
          required
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Explainer>{t("course_price")}</Explainer>
        <input
          className="second"
          type="number"
          id="description"
          name="description"
          required
          defaultValue={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />
        <Explainer>{t("course_discount_price")}</Explainer>
        <input
          className="second"
          type="number"
          id="description"
          name="description"
          required
          defaultValue={discountPrice}
          onChange={(e) => setDiscountPrice(parseInt(e.target.value))}
        />
        <Explainer>{t("course_next_cohort")}</Explainer>
        <input
          id="start"
          name="trip-start"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Explainer>{t("course_image")}</Explainer>
        <input
          // style={{ display: "none" }}
          className="second"
          type="file"
          id="file"
          name="file"
          onChange={uploadFile}
        />
        {upload && t("uploading")}
        <Img src={image ? image : coursePage.image} alt="Upload Preview" />
      </Fieldset>
      <Title>{t("course_landing_info")}</Title>
      <Fieldset>
        <Explainer>{t("course_header")}</Explainer>

        {header.map((g, i) => (
          <input
            index={i}
            name="goal"
            onChange={(e) =>
              myCallbackHeader(e.target.value, e.target.name, parseInt(i))
            }
            defaultValue={g}
          />
        ))}
        {/* <button
          onClick={(e) => {
            setHeader([...header, ""]);
            e.preventDefault();
          }}
        >
          +1
        </button> */}
        <Explainer>{t("course_subheader")}</Explainer>
        {subheader.map((g, i) => (
          <input
            index={i}
            name="goal"
            onChange={(e) =>
              myCallbackSubheader(e.target.value, e.target.name, parseInt(i))
            }
            defaultValue={g}
          />
        ))}
        {/* <button
          onClick={(e) => {
            setSubheader([...subheader, ""]);
            e.preventDefault();
          }}
        >
          +1
        </button> */}
        <Explainer>{t("course_goals")}</Explainer>

        {goals.map((g, i) => (
          <Frame>
            {i + 1}.
            <DynamicLoadedEditor
              index={i}
              name="goal"
              getEditorText={myCallbackGoal}
              value={g}
            />
          </Frame>
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
        <Explainer>{t("course_video")}</Explainer>
        <input
          className="second"
          type="text"
          id="video"
          name="video"
          required
          defaultValue={video}
          onChange={(e) => setVideo(e.target.value)}
        />
        <Explainer>{t("course_news")}</Explainer>
        <textarea
          type="text"
          id="news"
          name="news"
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
        <Explainer>{t("course_format")}</Explainer>
        <Frame>
          <DynamicLoadedEditor
            index={1}
            name="methods"
            getEditorText={myCallback}
            value={methods}
          />
        </Frame>
        <Explainer>{t("course_audience")}</Explainer>
        <Frame>
          <DynamicLoadedEditor
            index={1}
            name="audience"
            getEditorText={myCallback}
            value={audience}
          />
        </Frame>
        <Explainer>{t("course_result")}</Explainer>
        <Frame>
          <DynamicLoadedEditor
            index={1}
            name="result"
            getEditorText={myCallback}
            value={result}
          />
        </Frame>
        {/* <Link
          href={{
            pathname: "/coursePage",
            query: { id: coursePage.id },
          }}
        >
          <div className="open_landing">Открыть лендинг курса</div>
        </Link> */}
      </Fieldset>
      <Buttons>
        <Button
          onClick={(e) => {
            e.preventDefault();
            return updateCoursePage({
              variables: {
                id: props.coursePage.id,
                title,
                news,
                description: description,
                audience,
                goals,
                price,
                discountPrice,
                header,
                nextStart: startDate,
                subheader,
                result,
                tariffs,
                methods,
                image,
                video,
              },
            });
          }}
        >
          {loading ? t("changing") : t("change")}
        </Button>
        <Link
          href={{
            pathname: "/course",
            query: { id: coursePage.id },
          }}
        >
          <div>{t("back")}</div>
        </Link>
      </Buttons>
    </Form>
  );
};

export default UpdateForm;
